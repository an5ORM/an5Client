// This file is auto-generated. Do not edit directly.
package an5.client;

import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import an5.adapters.base.Metadata;

/**
 * The generated models' tables, columns and relations.
 *
 * <p>Registered with the adapter when a context is constructed. Without it the table clients
 * have no table names to work with and no primary key to fill in.
 */
public final class An5Metadata {

  private An5Metadata() {}

  /** Model name to table name, schema-qualified. */
  public static final Map<String, String> MODEL_TO_TABLE;

  /** Model name to its columns, as the adapter reads them. */
  public static final Map<String, List<Map<String, Object>>> MODEL_FIELDS;

  /** Model name to its relations, keyed by relation name. */
  public static final Map<String, Map<String, Map<String, String>>> RELATION_MAP;

  static {
    Map<String, String> tables = new LinkedHashMap<String, String>();
    Map<String, List<Map<String, Object>>> fields = new LinkedHashMap<String, List<Map<String, Object>>>();
    Map<String, Map<String, Map<String, String>>> relations =
        new LinkedHashMap<String, Map<String, Map<String, String>>>();

    tables.put("EmbeddingConfig", "dbo.embeddingconfigs");
    fields.put("EmbeddingConfig", Arrays.asList(
        field("id", "string", "NVARCHAR(1000)", false, true, true, "Primary key"),
        field("provider", "string", "NVARCHAR(100)", false, false, false, "Embedding provider: openai, cohere, custom"),
        field("apiKey", "string", "NVARCHAR(4000)", false, false, false, "API key for the embedding service"),
        field("model", "string", "NVARCHAR(500)", true, false, false, "Model name, e.g. text-embedding-3-small"),
        field("endpoint", "string", "NVARCHAR(2000)", true, false, false, "Custom endpoint URL"),
        field("isActive", "boolean", "BIT", false, true, false, "Whether this config is active"),
        field("createdAt", "Date", "DATETIME2", false, true, false, "Creation timestamp"),
        field("updatedAt", "Date", "DATETIME2", false, true, false, "Last update timestamp")
    ));
    tables.put("LlmConfig", "dbo.llmconfigs");
    fields.put("LlmConfig", Arrays.asList(
        field("id", "string", "NVARCHAR(1000)", false, true, true, "Primary key"),
        field("provider", "string", "NVARCHAR(100)", false, false, false, "LLM provider: openai, gemini, custom, azure"),
        field("apiKey", "string", "NVARCHAR(4000)", false, false, false, "API key for the LLM provider"),
        field("model", "string", "NVARCHAR(500)", true, false, false, "Model name, e.g. gpt-4o, gemini-2.5-flash"),
        field("endpoint", "string", "NVARCHAR(2000)", true, false, false, "Custom endpoint URL"),
        field("isActive", "boolean", "BIT", false, true, false, "Whether this config is active"),
        field("createdAt", "Date", "DATETIME2", false, true, false, "Creation timestamp"),
        field("updatedAt", "Date", "DATETIME2", false, true, false, "Last update timestamp")
    ));
    tables.put("User", "dbo.users");
    fields.put("User", Arrays.asList(
        field("id", "string", "NVARCHAR(1000)", false, true, true, "Primary key for the User table (auto-generated UUID)"),
        field("email", "string", "NVARCHAR(255)", false, false, false, "Unique email address used for login and notifications"),
        field("name", "string", "NVARCHAR(255)", true, false, false, "Display name of the user"),
        field("createdAt", "Date", "DATETIME2", false, true, false, "Timestamp when the user profile was created")
    ));
    tables.put("Order", "dbo.orders");
    fields.put("Order", Arrays.asList(
        field("id", "string", "NVARCHAR(1000)", false, true, true, "Primary key for the Order table (auto-generated UUID)"),
        field("userId", "string", "NVARCHAR(1000)", false, false, false, "Foreign key linking to the User model who placed the order"),
        field("total", "number", "INT", false, true, false, "Total cost amount of the order"),
        field("createdAt", "Date", "DATETIME2", false, true, false, "The date and time when the order was created.")
    ));

    MODEL_TO_TABLE = Collections.unmodifiableMap(tables);
    MODEL_FIELDS = Collections.unmodifiableMap(fields);
    RELATION_MAP = Collections.unmodifiableMap(relations);
  }

  private static Map<String, Object> field(
      String name, String type, String sql, boolean optional, boolean hasDefault, boolean isId) {
    return field(name, type, sql, optional, hasDefault, isId, null);
  }

  private static Map<String, Object> field(
      String name,
      String type,
      String sql,
      boolean optional,
      boolean hasDefault,
      boolean isId,
      String description) {
    Map<String, Object> field = new LinkedHashMap<String, Object>();
    field.put("name", name);
    field.put("type", type);
    field.put("sql", sql);
    field.put("isOptional", Boolean.valueOf(optional));
    field.put("hasDefault", Boolean.valueOf(hasDefault));
    field.put("isId", Boolean.valueOf(isId));
    field.put("description", description);
    return field;
  }

  private static Map<String, String> relation(
      String modelName, String relationName, String foreignKey, String localKey) {
    Map<String, String> relation = new LinkedHashMap<String, String>();
    relation.put("modelName", modelName);
    relation.put("relationType", relationName);
    relation.put("foreignKey", foreignKey);
    relation.put("localKey", localKey);
    return relation;
  }

  /** Registers this schema with the adapter runtime. */
  public static void register() {
    Map<String, Object> metadata = new LinkedHashMap<String, Object>();
    metadata.put("modelToTable", MODEL_TO_TABLE);
    metadata.put("modelFields", MODEL_FIELDS);
    metadata.put("relationMap", RELATION_MAP);
    Metadata.setAdapterMetadata(metadata);
  }
}
