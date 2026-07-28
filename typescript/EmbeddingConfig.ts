import { An5, TableClient } from './base';

export interface EmbeddingConfig {
  id: string;
  provider: string;
  apiKey: string;
  model: string | null;
  endpoint: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type EmbeddingConfigWhereInput = {
  AND?: EmbeddingConfigWhereInput | EmbeddingConfigWhereInput[];
  OR?: EmbeddingConfigWhereInput[];
  NOT?: EmbeddingConfigWhereInput | EmbeddingConfigWhereInput[];
  id?: string | An5.StringFilter;
  provider?: string | An5.StringFilter;
  apiKey?: string | An5.StringFilter;
  model?: string | An5.StringNullableFilter | null;
  endpoint?: string | An5.StringNullableFilter | null;
  isActive?: boolean | An5.BooleanFilter;
  createdAt?: Date | An5.DateTimeFilter;
  updatedAt?: Date | An5.DateTimeFilter;
};

export type EmbeddingConfigSelect = { id?: boolean; provider?: boolean; apiKey?: boolean; model?: boolean; endpoint?: boolean; isActive?: boolean; createdAt?: boolean; updatedAt?: boolean; };
export type EmbeddingConfigInclude = {  };
export type EmbeddingConfigCreateInput = { id?: string; provider: string; apiKey: string; model?: string | null; endpoint?: string | null; isActive?: boolean; createdAt?: Date; updatedAt?: Date;  };
export type EmbeddingConfigUpdateInput = { provider?: string; apiKey?: string; model?: string | null; endpoint?: string | null; isActive?: boolean; createdAt?: Date; updatedAt?: Date;  };
export type EmbeddingConfigFindManyArgs = { where?: EmbeddingConfigWhereInput; orderBy?: any; take?: number; skip?: number; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigFindFirstArgs = { where?: EmbeddingConfigWhereInput; orderBy?: any; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigFindUniqueArgs = { where?: EmbeddingConfigWhereInput; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigCreateArgs = { data: EmbeddingConfigCreateInput; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigUpdateArgs = { where: EmbeddingConfigWhereInput; data: EmbeddingConfigUpdateInput; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigUpsertArgs = { where: EmbeddingConfigWhereInput; create: EmbeddingConfigCreateInput; update: EmbeddingConfigUpdateInput; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigDeleteArgs = { where: EmbeddingConfigWhereInput; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigTableClient = TableClient<
  EmbeddingConfig,
  EmbeddingConfigWhereInput,
  EmbeddingConfigSelect,
  EmbeddingConfigInclude,
  EmbeddingConfigCreateInput,
  EmbeddingConfigUpdateInput,
  EmbeddingConfigFindManyArgs,
  EmbeddingConfigFindFirstArgs,
  EmbeddingConfigFindUniqueArgs,
  EmbeddingConfigCreateArgs,
  EmbeddingConfigUpdateArgs,
  EmbeddingConfigUpsertArgs,
  EmbeddingConfigDeleteArgs
>;
