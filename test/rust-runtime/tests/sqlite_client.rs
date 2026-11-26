use an5_client::client::An5Client;
use an5_client::filters::{BoolFilter, DateTimeFilter, IntFilter, NumberFilter, SortOrder, StringFilter};
use an5_client::models::{
    OrderAggregateArgs, OrderAggregateHavingInput, OrderCountAggregateFilter, OrderGroupByArgs,
    OrderNumericAggregateFilter, OrderOrderByInput, UserCreateInput, UserFindFirstArgs,
    UserFindManyArgs, UserFindUniqueArgs, UserUpdateArgs, UserUpdateInput, UserUpsertArgs,
    UserWhereInput,
};
use an5_adapters::{CountArgs, DeleteManyArgs, FindManyArgs};
use serde_json::json;

#[tokio::test]
async fn generated_client_sqlite_crud() {
    sqlx::any::install_drivers(&[sqlx::sqlite::any::DRIVER]).unwrap();
    let path = std::env::temp_dir().join(format!("an5-generated-rust-{}.sqlite",std::process::id()));
    let _ = std::fs::remove_file(&path);
    let client = An5Client::connect(&format!("sqlite:file:{}?mode=rwc",path.display())).await.unwrap();
    client.adapter().execute_raw("CREATE TABLE users (id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, name TEXT, created_at TEXT)",&[]).await.unwrap();
    let user = client.user().create(&UserCreateInput { email: "runtime@example.com".into(),name:Some("Runtime".into()),created_at:None }).await.unwrap();
    assert!(user.id.is_some());
    let found = client.user().find_many(&UserFindManyArgs::default()).await.unwrap();
    assert_eq!(found.len(),1);
    assert_eq!(found[0].email,user.email);
    let by_in = client.user().find_many(&UserFindManyArgs {
        where_: Some(UserWhereInput {
            email: Some(StringFilter {
                in_list: vec!["runtime@example.com".into()],
                ..Default::default()
            }),
            ..Default::default()
        }),
        ..Default::default()
    }).await.unwrap();
    assert_eq!(by_in.len(), 1);
    let by_ci = client.user().find_many(&UserFindManyArgs {
        where_: Some(UserWhereInput {
            name: Some(StringFilter {
                contains: Some("RUNTI".into()),
                mode: Some("insensitive".into()),
                ..Default::default()
            }),
            ..Default::default()
        }),
        ..Default::default()
    }).await.unwrap();
    assert_eq!(by_ci.len(), 1);
    assert!(client.user().find_many(&UserFindManyArgs {
        where_: Some(UserWhereInput {
            name: Some(StringFilter {
                equals: Some("Runtime".into()),
                mode: Some("bogus".into()),
                ..Default::default()
            }),
            ..Default::default()
        }),
        ..Default::default()
    }).await.is_err());

    client.adapter().execute_raw(
        "CREATE TABLE orders (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, total INTEGER NOT NULL, created_at TEXT)",
        &[],
    ).await.unwrap();
    client.adapter().execute_raw(
        "INSERT INTO orders (id, user_id, total, created_at) VALUES ('o1', 'u1', 60, '2026-01-01'), ('o2', 'u1', 90, NULL), ('o3', 'u2', 40, '2026-01-02'), ('o4', 'u3', 200, '2026-01-03')",
        &[],
    ).await.unwrap();
    let grouped = client.order().group_by(&OrderGroupByArgs {
        by: vec!["user_id".into()],
        having: Some(OrderAggregateHavingInput {
            or: Some(vec![
                OrderAggregateHavingInput {
                    count: Some(OrderCountAggregateFilter {
                        all: Some(IntFilter { gte: Some(2), ..Default::default() }),
                        ..Default::default()
                    }),
                    sum: Some(OrderNumericAggregateFilter {
                        total: Some(NumberFilter { gte: Some(150.0), ..Default::default() }),
                        ..Default::default()
                    }),
                    ..Default::default()
                },
                OrderAggregateHavingInput {
                    user_id: Some(StringFilter { equals: Some("u3".into()), ..Default::default() }),
                    ..Default::default()
                },
            ]),
            ..Default::default()
        }),
        order_by: Some(OrderOrderByInput { user_id: Some(SortOrder::Asc), ..Default::default() }),
        count: Some(json!({ "_all": true, "created_at": true })),
        sum: Some(vec!["total".into()]),
        ..Default::default()
    }).await.unwrap();
    assert_eq!(grouped.len(), 2);
    assert_eq!(grouped[0]["user_id"].as_str(), Some("u1"));
    assert_eq!(grouped[0]["_count"].as_i64(), Some(2));
    assert_eq!(grouped[0]["_count_created_at"].as_i64(), Some(1));
    assert_eq!(grouped[0]["sum_total"].as_i64(), Some(150));
    assert_eq!(grouped[1]["user_id"].as_str(), Some("u3"));

    let paged = client.order().group_by(&OrderGroupByArgs {
        by: vec!["user_id".into()],
        order_by: Some(OrderOrderByInput { user_id: Some(SortOrder::Asc), ..Default::default() }),
        skip: 1,
        ..Default::default()
    }).await.unwrap();
    assert_eq!(paged.len(), 2);
    assert_eq!(paged[0]["user_id"].as_str(), Some("u2"));

    assert!(client.order().group_by(&OrderGroupByArgs {
        by: vec!["user_id".into()],
        having: Some(OrderAggregateHavingInput {
            total: Some(IntFilter { gt: Some(10), ..Default::default() }),
            ..Default::default()
        }),
        ..Default::default()
    }).await.is_err());

    let agg = client.order().aggregate(&OrderAggregateArgs {
        sum: Some(vec!["total".into()]),
        avg: Some(vec!["total".into()]),
        min: Some(vec!["total".into()]),
        max: Some(vec!["total".into()]),
        ..Default::default()
    }).await.unwrap();
    assert_eq!(agg["_count"].as_i64(), Some(4));
    assert_eq!(agg["_sum_total"].as_i64(), Some(390));
    assert_eq!(agg["_min_total"].as_i64(), Some(40));
    assert_eq!(agg["_max_total"].as_i64(), Some(200));

    let inserted_many = client.user().create_many(&[
        UserCreateInput { email: "batch1@example.com".into(), name: Some("Batch1".into()), created_at: None },
        UserCreateInput { email: "batch2@example.com".into(), name: Some("Batch2".into()), created_at: None },
    ]).await.unwrap();
    assert_eq!(inserted_many, 2);

    let updated_many = client.user().update_many(&UserUpdateArgs {
        where_: Some(UserWhereInput {
            email: Some(StringFilter { starts_with: Some("batch".into()), ..Default::default() }),
            ..Default::default()
        }),
        data: UserUpdateInput { name: Some("Batch Updated".into()), ..Default::default() },
    }).await.unwrap();
    assert_eq!(updated_many, 2);

    let upserted = client.user().upsert(&UserUpsertArgs {
        where_: Some(UserWhereInput {
            email: Some(StringFilter { equals: Some("batch1@example.com".into()), ..Default::default() }),
            ..Default::default()
        }),
        create: UserCreateInput { email: "batch1@example.com".into(), name: Some("Ignored".into()), created_at: None },
        update: UserUpdateInput { name: Some("Upserted Batch1".into()), ..Default::default() },
    }).await.unwrap();
    assert_eq!(upserted.name.as_deref(), Some("Upserted Batch1"));

    let first_selected = client.user().find_first(&UserFindFirstArgs {
        where_: Some(UserWhereInput {
            email: Some(StringFilter { equals: Some("batch1@example.com".into()), ..Default::default() }),
            ..Default::default()
        }),
        select: Some(vec!["id".into(), "email".into(), "name".into(), "created_at".into()]),
        ..Default::default()
    }).await.unwrap().unwrap();
    assert_eq!(first_selected.name.as_deref(), Some("Upserted Batch1"));

    // Verify BoolFilter.not and DateTimeFilter.in_list/not_in serialize as expected
    let bool_json = serde_json::to_value(&BoolFilter { not: Some(false), ..Default::default() }).unwrap();
    assert_eq!(bool_json, json!({ "not": false }));
    let dt_filter: DateTimeFilter = serde_json::from_value(json!({
        "in": ["2026-01-01T00:00:00Z"],
        "notIn": ["2026-01-02T00:00:00Z"]
    })).unwrap();
    assert_eq!(dt_filter.in_list.len(), 1);
    assert_eq!(dt_filter.not_in.len(), 1);
    let dt_json = serde_json::to_value(&dt_filter).unwrap();
    assert!(dt_json.get("in").and_then(|v| v.as_array()).is_some());
    assert!(dt_json.get("notIn").and_then(|v| v.as_array()).is_some());

    let deleted_batches = client.user().delete_many(&UserFindUniqueArgs {
        where_: Some(UserWhereInput {
            email: Some(StringFilter { starts_with: Some("batch".into()), ..Default::default() }),
            ..Default::default()
        }),
    }).await.unwrap();
    assert_eq!(deleted_batches, 2);

    assert!(client.table("User").find_many(&FindManyArgs {
        r#where: Some(json!({ "email": { "badOp": "x" } })),
        ..Default::default()
    }).await.is_err());
    assert_eq!(client.table("User").count(&CountArgs::default()).await.unwrap(),1);
    let empty = client.table("User").find_many(&FindManyArgs {r#where:Some(json!({"OR":[]})),..Default::default()}).await.unwrap();
    assert!(empty.is_empty());
    assert_eq!(client.table("User").delete_many(&DeleteManyArgs::default()).await.unwrap(),1);
    assert_eq!(client.table("User").count(&CountArgs::default()).await.unwrap(),0);
    let _ = client.adapter().disconnect().await;
    std::fs::remove_file(path).unwrap();
}
