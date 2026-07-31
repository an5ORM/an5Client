import { An5, TableClient } from './base';

export interface LlmConfig {
  id: string;
  provider: string;
  apiKey: string;
  model: string | null;
  endpoint: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type LlmConfigWhereInput = {
  AND?: LlmConfigWhereInput | LlmConfigWhereInput[];
  OR?: LlmConfigWhereInput[];
  NOT?: LlmConfigWhereInput | LlmConfigWhereInput[];
  id?: string | An5.StringFilter;
  provider?: string | An5.StringFilter;
  apiKey?: string | An5.StringFilter;
  model?: string | An5.StringNullableFilter | null;
  endpoint?: string | An5.StringNullableFilter | null;
  isActive?: boolean | An5.BooleanFilter;
  createdAt?: Date | An5.DateTimeFilter;
  updatedAt?: Date | An5.DateTimeFilter;
};

export type LlmConfigSelect = { id?: boolean; provider?: boolean; apiKey?: boolean; model?: boolean; endpoint?: boolean; isActive?: boolean; createdAt?: boolean; updatedAt?: boolean; };
export type LlmConfigInclude = {  };
export type LlmConfigCreateInput = { id?: string; provider: string; apiKey: string; model?: string | null; endpoint?: string | null; isActive?: boolean; createdAt?: Date; updatedAt?: Date;  };
export type LlmConfigUpdateInput = { provider?: string; apiKey?: string; model?: string | null; endpoint?: string | null; isActive?: boolean; createdAt?: Date; updatedAt?: Date;  };
export type LlmConfigFindManyArgs = { where?: LlmConfigWhereInput; orderBy?: any; take?: number; skip?: number; include?: LlmConfigInclude; select?: LlmConfigSelect; };
export type LlmConfigFindFirstArgs = { where?: LlmConfigWhereInput; orderBy?: any; include?: LlmConfigInclude; select?: LlmConfigSelect; };
export type LlmConfigFindUniqueArgs = { where?: LlmConfigWhereInput; include?: LlmConfigInclude; select?: LlmConfigSelect; };
export type LlmConfigCreateArgs = { data: LlmConfigCreateInput; include?: LlmConfigInclude; select?: LlmConfigSelect; };
export type LlmConfigUpdateArgs = { where: LlmConfigWhereInput; data: LlmConfigUpdateInput; include?: LlmConfigInclude; select?: LlmConfigSelect; };
export type LlmConfigUpsertArgs = { where: LlmConfigWhereInput; create: LlmConfigCreateInput; update: LlmConfigUpdateInput; include?: LlmConfigInclude; select?: LlmConfigSelect; };
export type LlmConfigDeleteArgs = { where: LlmConfigWhereInput; include?: LlmConfigInclude; select?: LlmConfigSelect; };
export type LlmConfigTableClient = TableClient<
  LlmConfig,
  LlmConfigWhereInput,
  LlmConfigSelect,
  LlmConfigInclude,
  LlmConfigCreateInput,
  LlmConfigUpdateInput,
  LlmConfigFindManyArgs,
  LlmConfigFindFirstArgs,
  LlmConfigFindUniqueArgs,
  LlmConfigCreateArgs,
  LlmConfigUpdateArgs,
  LlmConfigUpsertArgs,
  LlmConfigDeleteArgs
>;
