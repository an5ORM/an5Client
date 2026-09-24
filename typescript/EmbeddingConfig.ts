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
  createdAt?: Date | string | An5.DateTimeFilter;
  updatedAt?: Date | string | An5.DateTimeFilter;
};

export type EmbeddingConfigSelect = { id?: boolean; provider?: boolean; apiKey?: boolean; model?: boolean; endpoint?: boolean; isActive?: boolean; createdAt?: boolean; updatedAt?: boolean; };
export type EmbeddingConfigInclude = {  };
export type EmbeddingConfigCreateInput = { id?: string; provider: string; apiKey: string; model?: string | null; endpoint?: string | null; isActive?: boolean; createdAt?: Date | string; updatedAt?: Date | string;  };
export type EmbeddingConfigUpdateInput = { provider?: string; apiKey?: string; model?: string | null; endpoint?: string | null; isActive?: boolean; createdAt?: Date | string; updatedAt?: Date | string;  };
export type EmbeddingConfigOrderByInput = { id?: An5.SortOrder; provider?: An5.SortOrder; apiKey?: An5.SortOrder; model?: An5.SortOrder; endpoint?: An5.SortOrder; isActive?: An5.SortOrder; createdAt?: An5.SortOrder; updatedAt?: An5.SortOrder };
export type EmbeddingConfigFindManyArgs = { where?: EmbeddingConfigWhereInput; orderBy?: EmbeddingConfigOrderByInput | EmbeddingConfigOrderByInput[]; take?: number; skip?: number; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigFindFirstArgs = { where?: EmbeddingConfigWhereInput; orderBy?: EmbeddingConfigOrderByInput | EmbeddingConfigOrderByInput[]; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigFindUniqueArgs = { where?: EmbeddingConfigWhereInput; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigCreateArgs = { data: EmbeddingConfigCreateInput; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigUpdateArgs = { where: EmbeddingConfigWhereInput; data: EmbeddingConfigUpdateInput; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigUpsertArgs = { where: EmbeddingConfigWhereInput; create: EmbeddingConfigCreateInput; update: EmbeddingConfigUpdateInput; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigDeleteArgs = { where: EmbeddingConfigWhereInput; include?: EmbeddingConfigInclude; select?: EmbeddingConfigSelect; };
export type EmbeddingConfigScalarFieldEnum = 'id' | 'provider' | 'apiKey' | 'model' | 'endpoint' | 'isActive' | 'createdAt' | 'updatedAt';
export type EmbeddingConfigAggregateArgs = { where?: EmbeddingConfigWhereInput; _count?: true | { _all?: true; id?: true; provider?: true; apiKey?: true; model?: true; endpoint?: true; isActive?: true; createdAt?: true; updatedAt?: true }; _sum?: {  }; _avg?: {  }; _min?: { id?: true; provider?: true; apiKey?: true; model?: true; endpoint?: true; isActive?: true; createdAt?: true; updatedAt?: true }; _max?: { id?: true; provider?: true; apiKey?: true; model?: true; endpoint?: true; isActive?: true; createdAt?: true; updatedAt?: true }; };
export type EmbeddingConfigAggregateHavingInput = { _count?: { _all?: An5.NumberFilter | number; id?: An5.NumberFilter | number; provider?: An5.NumberFilter | number; apiKey?: An5.NumberFilter | number; model?: An5.NumberFilter | number; endpoint?: An5.NumberFilter | number; isActive?: An5.NumberFilter | number; createdAt?: An5.NumberFilter | number; updatedAt?: An5.NumberFilter | number }; _sum?: {  }; _avg?: {  }; _min?: { id?: any; provider?: any; apiKey?: any; model?: any; endpoint?: any; isActive?: any; createdAt?: any; updatedAt?: any }; _max?: { id?: any; provider?: any; apiKey?: any; model?: any; endpoint?: any; isActive?: any; createdAt?: any; updatedAt?: any }; };
export type EmbeddingConfigGroupByArgs = { by: EmbeddingConfigScalarFieldEnum | EmbeddingConfigScalarFieldEnum[]; where?: EmbeddingConfigWhereInput; having?: EmbeddingConfigAggregateHavingInput; orderBy?: EmbeddingConfigOrderByInput | EmbeddingConfigOrderByInput[]; skip?: number; take?: number; _count?: true | { _all?: true; id?: true; provider?: true; apiKey?: true; model?: true; endpoint?: true; isActive?: true; createdAt?: true; updatedAt?: true }; _sum?: {  }; _avg?: {  }; _min?: { id?: true; provider?: true; apiKey?: true; model?: true; endpoint?: true; isActive?: true; createdAt?: true; updatedAt?: true }; _max?: { id?: true; provider?: true; apiKey?: true; model?: true; endpoint?: true; isActive?: true; createdAt?: true; updatedAt?: true }; };
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
  EmbeddingConfigDeleteArgs,
  EmbeddingConfigAggregateArgs,
  EmbeddingConfigGroupByArgs
>;
