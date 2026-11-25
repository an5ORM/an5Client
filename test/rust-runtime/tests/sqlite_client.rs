use an5_client::client::An5Client;
use an5_client::filters::StringFilter;
use an5_client::models::{UserCreateInput, UserFindManyArgs, UserWhereInput};
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
    assert!(client.table("User").find_many(&FindManyArgs {
        r#where: Some(json!({ "email": { "badOp": "x" } })),
        ..Default::default()
    }).await.is_err());
    assert_eq!(client.table("User").count(&CountArgs::default()).await.unwrap(),1);
    let empty = client.table("User").find_many(&FindManyArgs {r#where:Some(json!({"OR":[]})),..Default::default()}).await.unwrap();
    assert!(empty.is_empty());
    assert_eq!(client.table("User").delete_many(&DeleteManyArgs::default()).await.unwrap(),1);
    assert_eq!(client.table("User").count(&CountArgs::default()).await.unwrap(),0);
    client.adapter().disconnect().await;
    std::fs::remove_file(path).unwrap();
}
