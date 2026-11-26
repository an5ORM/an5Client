use an5_client::client::An5Client;
use an5_client::filters::{IntFilter, NumberFilter, SortOrder, StringFilter};
use an5_client::models::{
    OrderAggregateHavingInput, OrderCountAggregateFilter, OrderGroupByArgs,
    OrderNumericAggregateFilter, OrderOrderByInput, UserCreateInput, UserFindManyArgs,
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
