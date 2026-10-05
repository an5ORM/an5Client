# an5Client

Auto-generated client artifacts for AN5 ORM. Contains TypeScript, Python, .NET (C#), Golang, Rust, Java, Kotlin, and Swift model types, metadata, and entity classes generated from `.an5` schema files.

## Structure

```
an5Client/
├── typescript/          # TypeScript types and metadata
│   ├── index.ts         # Barrel exports & An5Client class
│   ├── base.ts          # Base types, filters, error classes
│   ├── an5Metadata.ts   # Model-table mappings, relations
│   ├── User.ts          # Generated User model & TableClient
│   └── Order.ts         # Generated Order model & TableClient
├── python/              # Python metadata, dataclasses, and ORM client
│   ├── __init__.py
│   ├── an5_metadata.py  # Model-table mappings & field metadata
│   ├── an5_models.py    # Python @dataclass model definitions
│   └── an5_client.py    # Typed An5Client ORM class
├── dotnet/              # .NET entity classes & DbContext
│   ├── User.cs
│   ├── Order.cs
│   ├── An5DbContext.cs  # Complete DbContext & TableClient<T> repository
│   └── An5Config.cs
└── golang/              # Golang models & DbContext repository
    ├── User.go          # Generated User struct + WhereInput/OrderBy/Args
    ├── Order.go         # Generated Order struct + WhereInput/OrderBy/Args
    ├── client.go        # An5DbContext & generic TableClient[T]
    └── config.go        # Environment connection string helper
├── rust/                # Rust crate (serde + chrono)
│   ├── Cargo.toml       # Crate manifest (an5-client)
│   └── src/
│       ├── lib.rs       # Module exports
│       ├── models.rs    # Structs + WhereInput/OrderBy/FindManyArgs
│       ├── filters.rs   # StringFilter/IntFilter/NumberFilter/Bool/DateTime + Dialect
│       ├── metadata.rs  # model_to_table / model_primary_key
│       ├── config.rs    # DATABASE_URL helper
│       └── client.rs    # An5Client (adapter-backed) + typed <Model>Table handles + vector math
├── java/               # Java sources, package an5.client (flat, like dotnet/)
│   ├── User.java        # JavaBean with getters, fluent withX, fromRow/toValues
│   ├── An5DbContext.java# Entry point; one ModelClient<Model> per schema model
│   ├── ModelClient.java # Generic typed table client
│   ├── An5OrmTypes.java # Filters + per-model Where/OrderBy inputs
│   ├── An5Metadata.java # Tables, columns and relations
│   ├── An5Values.java   # Column-value converters
│   └── An5Config.java   # DATABASE_URL / an5.connectionString
├── kotlin/             # Kotlin sources, package an5.client (flat, like java/)
│   ├── User.kt          # data class with fromRow/toValues
│   ├── An5Db.kt         # Entry point; one ModelClient<Model> per schema model
│   ├── An5OrmTypes.kt   # Filter data classes + per-model Where/OrderBy
│   ├── An5Metadata.kt   # Tables, columns and relations
│   └── An5Config.kt     # DATABASE_URL / an5.connectionString
└── swift/              # Swift package (SwiftPM)
    ├── Package.swift    # Package manifest (An5Client)
    └── Sources/An5Client/
        ├── User.swift       # struct with init(row:) and values
        ├── An5Db.swift      # Entry point; one ModelClient<Model> per schema model
        ├── An5OrmTypes.swift# Filter builders + per-model Where/OrderBy
        ├── An5Metadata.swift# Tables, columns and relations
        └── An5Config.swift  # AN5_DATABASE_URL / Info.plist
```

### Wiring a native client into a build

Java and Kotlin ship as sources, the way the .NET client does: add the directory as a
source root and depend on the matching runtime (`an5Adapters/java` or `an5Adapters/kotlin`,
each with its own `pom.xml` / `build.gradle.kts`).

Swift ships as a package instead, because SwiftPM has no way to point a target at an
arbitrary directory the way a csproj or a go.mod does. Depend on it directly:

```swift
.package(path: "../an5Client/swift")
// or, from the released package:
.package(url: "https://github.com/an5ORM/an5Client.git", from: "0.1.4")
```

## Usage

### TypeScript

```typescript
import { An5Client, User, Order } from './an5Client/typescript';

const db = new An5Client();

// Supports flex property casing (db.User, db.user, db.Users, db.users)
const users = await db.User.findMany({
  where: { email: { contains: '@example.com' } }
});
```

### Python

```python
from an5Client.python import An5Client, User

db = An5Client()

# Supports flexible property casing (db.User, db.user, db.Users, db.users)
users = db.User.find_many(where={"email": {"contains": "@example.com"}})
user = db.User.create({"email": "john@example.com", "name": "John"})
```

### .NET (C#)

```csharp
using An5Orm;
using An5Orm.Entities;

var db = new An5DbContext(connectionString);

// Supports flexible property access (db.User, db.Users)
var users = db.User.FindMany("Email LIKE '%@example.com%'");
var count = db.User.Count();
db.User.Create(new User { Email = "john@example.com", Name = "John" });
```

### Golang

```go
package main

import (
    "context"
    "database/sql"
    "fmt"
    "an5Client/golang"
)

func main() {
    db, _ := sql.Open("sqlserver", an5client.GetDefaultConnectionString())
    ctx := an5client.NewAn5DbContext(db)

    // Supports flexible property access (ctx.User, ctx.Users)
    users, _ := ctx.User.FindMany(context.Background(), "email LIKE ?", "%@example.com%")
    fmt.Printf("Found %d users\n", len(users))
}
```

### Rust

```rust
use an5_client::{An5Client, StringFilter, UserFindManyArgs, UserWhereInput};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    // Register the sqlx drivers you need before connecting.
    sqlx::any::install_drivers(&[sqlx::sqlite::any::DRIVER])?;
    let db = An5Client::connect("sqlite:file:app.sqlite?mode=rwc").await?;

    // Typed per-model handle.
    let args = UserFindManyArgs {
        where_: Some(UserWhereInput {
            email: Some(StringFilter {
                contains: Some("@example.com".to_string()),
                ..Default::default()
            }),
            ..Default::default()
        }),
        take: Some(10),
        ..Default::default()
    };
    let users = db.user().find_many(&args).await?;
    println!("{} users", users.len());

    // Or dynamic access, like `db.User` in TypeScript.
    let all = db.table("User").find_many(&Default::default()).await?;
    println!("{} total", all.len());
    Ok(())
}
```

Rust has no dynamic property access, so a generated method (`db.user()`) is
the equivalent of `db.User` — matching Go, where the generator emits a real
`ctx.User` field.

## Generation

This package is auto-generated by `an5Orm/generator`. Do not edit files manually.

```bash
# Regenerate from schema
cd ../an5Orm
npm run generate
```

## Testing

The package ships generated sources for multiple languages, so the local checks
compile each target surface:

```bash
npm test
npm run test:package:smoke
npm run test:python
npm run test:dotnet
npm run test:go
npm run test:rust
```

## License

MIT
