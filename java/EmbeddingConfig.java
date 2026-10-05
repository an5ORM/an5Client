// This file is auto-generated. Do not edit directly.
package an5.client;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Embedding provider configuration. Stores API keys and model settings for RAG features.
 *
 * <p>Mutable with getters and setters rather than a record, because `update` and `upsert`
 * take a partly filled instance and a record cannot say "this column is unchanged".
 */
public class EmbeddingConfig {
  private String id;
  private String provider;
  private String apiKey;
  private String model;
  private String endpoint;
  private Boolean isActive;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public String getId() {
    return this.id;
  }

  public void setId(String value) {
    this.id = value;
  }

  /** Sets Id and returns this instance, for chained construction. */
  public EmbeddingConfig withId(String value) {
    this.id = value;
    return this;
  }

  public String getProvider() {
    return this.provider;
  }

  public void setProvider(String value) {
    this.provider = value;
  }

  /** Sets Provider and returns this instance, for chained construction. */
  public EmbeddingConfig withProvider(String value) {
    this.provider = value;
    return this;
  }

  public String getApiKey() {
    return this.apiKey;
  }

  public void setApiKey(String value) {
    this.apiKey = value;
  }

  /** Sets ApiKey and returns this instance, for chained construction. */
  public EmbeddingConfig withApiKey(String value) {
    this.apiKey = value;
    return this;
  }

  public String getModel() {
    return this.model;
  }

  public void setModel(String value) {
    this.model = value;
  }

  /** Sets Model and returns this instance, for chained construction. */
  public EmbeddingConfig withModel(String value) {
    this.model = value;
    return this;
  }

  public String getEndpoint() {
    return this.endpoint;
  }

  public void setEndpoint(String value) {
    this.endpoint = value;
  }

  /** Sets Endpoint and returns this instance, for chained construction. */
  public EmbeddingConfig withEndpoint(String value) {
    this.endpoint = value;
    return this;
  }

  public Boolean getIsActive() {
    return this.isActive;
  }

  public void setIsActive(Boolean value) {
    this.isActive = value;
  }

  /** Sets IsActive and returns this instance, for chained construction. */
  public EmbeddingConfig withIsActive(Boolean value) {
    this.isActive = value;
    return this;
  }

  public LocalDateTime getCreatedAt() {
    return this.createdAt;
  }

  public void setCreatedAt(LocalDateTime value) {
    this.createdAt = value;
  }

  /** Sets CreatedAt and returns this instance, for chained construction. */
  public EmbeddingConfig withCreatedAt(LocalDateTime value) {
    this.createdAt = value;
    return this;
  }

  public LocalDateTime getUpdatedAt() {
    return this.updatedAt;
  }

  public void setUpdatedAt(LocalDateTime value) {
    this.updatedAt = value;
  }

  /** Sets UpdatedAt and returns this instance, for chained construction. */
  public EmbeddingConfig withUpdatedAt(LocalDateTime value) {
    this.updatedAt = value;
    return this;
  }

  /**
   * Reads `EmbeddingConfig` from a database row.
   *
   * <p>Every column goes through a converter rather than a cast: JDBC hands an `INT` back as
   * `Integer` on one driver and `Long` on another, and a `NUMERIC` column that fits in a
   * `long` still arrives as a `BigDecimal`.
   *
   * <p>Eager-loaded relations arrive as nested rows and are converted the same way. One that
   * was not asked for is left as it is, so `getOrders()` being `null` still means the query
   * did not include it.
   */
  public static EmbeddingConfig fromRow(Map<String, Object> row) {
    EmbeddingConfig value = new EmbeddingConfig();
    value.id = An5Values.asString(row.get("id"));
    value.provider = An5Values.asString(row.get("provider"));
    value.apiKey = An5Values.asString(row.get("apiKey"));
    value.model = An5Values.asString(row.get("model"));
    value.endpoint = An5Values.asString(row.get("endpoint"));
    value.isActive = An5Values.asBoolean(row.get("isActive"));
    value.createdAt = An5Values.asLocalDateTime(row.get("createdAt"));
    value.updatedAt = An5Values.asLocalDateTime(row.get("updatedAt"));
    return value;
  }

  /**
   * The columns to write, in declaration order, with `null` left out.
   *
   * <p>An unset column takes the schema's DEFAULT, which is what leaving it out means — and
   * what `update` needs so a partial instance does not blank every other column.
   */
  public Map<String, Object> toValues() {
    Map<String, Object> values = new LinkedHashMap<String, Object>();
    if (this.id != null) {
      values.put("id", this.id);
    }
    if (this.provider != null) {
      values.put("provider", this.provider);
    }
    if (this.apiKey != null) {
      values.put("apiKey", this.apiKey);
    }
    if (this.model != null) {
      values.put("model", this.model);
    }
    if (this.endpoint != null) {
      values.put("endpoint", this.endpoint);
    }
    if (this.isActive != null) {
      values.put("isActive", this.isActive);
    }
    if (this.createdAt != null) {
      values.put("createdAt", this.createdAt);
    }
    if (this.updatedAt != null) {
      values.put("updatedAt", this.updatedAt);
    }
    return values;
  }

  @Override
  public String toString() {
    return "EmbeddingConfig" + toValues();
  }
}
