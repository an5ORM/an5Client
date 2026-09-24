import { An5, TableClient } from './base';

export interface Order {
  id: string;
  userId: string;
  total: number;
  createdAt: Date;
}

export type OrderWhereInput = {
  AND?: OrderWhereInput | OrderWhereInput[];
  OR?: OrderWhereInput[];
  NOT?: OrderWhereInput | OrderWhereInput[];
  id?: string | An5.StringFilter;
  userId?: string | An5.StringFilter;
  total?: number | An5.NumberFilter;
  createdAt?: Date | string | An5.DateTimeFilter;
};

export type OrderSelect = { id?: boolean; userId?: boolean; total?: boolean; createdAt?: boolean; };
export type OrderInclude = {  };
export type OrderCreateInput = { id?: string; userId: string; total?: number; createdAt?: Date | string;  };
export type OrderUpdateInput = { userId?: string; total?: number | An5.IntFieldUpdateOperationsInput; createdAt?: Date | string;  };
export type OrderOrderByInput = { id?: An5.SortOrder; userId?: An5.SortOrder; total?: An5.SortOrder; createdAt?: An5.SortOrder };
export type OrderFindManyArgs = { where?: OrderWhereInput; orderBy?: OrderOrderByInput | OrderOrderByInput[]; take?: number; skip?: number; include?: OrderInclude; select?: OrderSelect; };
export type OrderFindFirstArgs = { where?: OrderWhereInput; orderBy?: OrderOrderByInput | OrderOrderByInput[]; include?: OrderInclude; select?: OrderSelect; };
export type OrderFindUniqueArgs = { where?: OrderWhereInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderCreateArgs = { data: OrderCreateInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderUpdateArgs = { where: OrderWhereInput; data: OrderUpdateInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderUpsertArgs = { where: OrderWhereInput; create: OrderCreateInput; update: OrderUpdateInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderDeleteArgs = { where: OrderWhereInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderScalarFieldEnum = 'id' | 'userId' | 'total' | 'createdAt';
export type OrderAggregateArgs = { where?: OrderWhereInput; _count?: true | { _all?: true; id?: true; userId?: true; total?: true; createdAt?: true }; _sum?: { total?: true }; _avg?: { total?: true }; _min?: { id?: true; userId?: true; total?: true; createdAt?: true }; _max?: { id?: true; userId?: true; total?: true; createdAt?: true }; };
export type OrderAggregateHavingInput = { _count?: { _all?: An5.NumberFilter | number; id?: An5.NumberFilter | number; userId?: An5.NumberFilter | number; total?: An5.NumberFilter | number; createdAt?: An5.NumberFilter | number }; _sum?: { total?: An5.NumberFilter | number }; _avg?: { total?: An5.NumberFilter | number }; _min?: { id?: any; userId?: any; total?: any; createdAt?: any }; _max?: { id?: any; userId?: any; total?: any; createdAt?: any }; };
export type OrderGroupByArgs = { by: OrderScalarFieldEnum | OrderScalarFieldEnum[]; where?: OrderWhereInput; having?: OrderAggregateHavingInput; orderBy?: OrderOrderByInput | OrderOrderByInput[]; skip?: number; take?: number; _count?: true | { _all?: true; id?: true; userId?: true; total?: true; createdAt?: true }; _sum?: { total?: true }; _avg?: { total?: true }; _min?: { id?: true; userId?: true; total?: true; createdAt?: true }; _max?: { id?: true; userId?: true; total?: true; createdAt?: true }; };
export type OrderTableClient = TableClient<
  Order,
  OrderWhereInput,
  OrderSelect,
  OrderInclude,
  OrderCreateInput,
  OrderUpdateInput,
  OrderFindManyArgs,
  OrderFindFirstArgs,
  OrderFindUniqueArgs,
  OrderCreateArgs,
  OrderUpdateArgs,
  OrderUpsertArgs,
  OrderDeleteArgs,
  OrderAggregateArgs,
  OrderGroupByArgs
>;
