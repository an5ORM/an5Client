// This file is auto-generated. Do not edit directly.

export const modelToTable: Record<string, string> = {
  embeddingConfig: "[dbo].[embeddingconfigs]",
  llmConfig: "[dbo].[llmconfigs]",
  user: "[dbo].[users]",
  order: "[dbo].[orders]",
};

export const modelFields: Record<string, Record<string, { ts: string; sql: string }>> = {
  embeddingConfig: { id: { ts: "string", sql: "NVARCHAR(1000)" }, provider: { ts: "string", sql: "NVARCHAR(100)" }, apiKey: { ts: "string", sql: "NVARCHAR(4000)" }, model: { ts: "string?", sql: "NVARCHAR(500)" }, endpoint: { ts: "string?", sql: "NVARCHAR(2000)" }, isActive: { ts: "boolean", sql: "BIT" }, createdAt: { ts: "Date", sql: "DATETIME2" }, updatedAt: { ts: "Date", sql: "DATETIME2" } },
  llmConfig: { id: { ts: "string", sql: "NVARCHAR(1000)" }, provider: { ts: "string", sql: "NVARCHAR(100)" }, apiKey: { ts: "string", sql: "NVARCHAR(4000)" }, model: { ts: "string?", sql: "NVARCHAR(500)" }, endpoint: { ts: "string?", sql: "NVARCHAR(2000)" }, isActive: { ts: "boolean", sql: "BIT" }, createdAt: { ts: "Date", sql: "DATETIME2" }, updatedAt: { ts: "Date", sql: "DATETIME2" } },
  user: { id: { ts: "string", sql: "NVARCHAR(1000)" }, email: { ts: "string", sql: "NVARCHAR(255)" }, name: { ts: "string?", sql: "NVARCHAR(255)" }, createdAt: { ts: "Date", sql: "DATETIME2" } },
  order: { id: { ts: "string", sql: "NVARCHAR(1000)" }, userId: { ts: "string", sql: "NVARCHAR(1000)" }, total: { ts: "number", sql: "INT" }, createdAt: { ts: "Date", sql: "DATETIME2" } },
};

export interface RelationDef {
  modelName: string;
  relationType: "many" | "one";
  foreignKey: string;
  localKey: string;
}

export const relationMap: Record<string, Record<string, RelationDef>> = {
  embeddingConfig:   {
  },
  llmConfig:   {
  },
  user:   {
  },
  order:   {
  },
};
