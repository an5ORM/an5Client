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
  createdAt?: Date | An5.DateTimeFilter;
};

export type OrderSelect = { id?: boolean; userId?: boolean; total?: boolean; createdAt?: boolean; };
export type OrderInclude = {  };
export type OrderCreateInput = { id?: string; userId: string; total?: number; createdAt?: Date;  };
export type OrderUpdateInput = { userId?: string; total?: number | An5.IntFieldUpdateOperationsInput; createdAt?: Date;  };
export type OrderFindManyArgs = { where?: OrderWhereInput; orderBy?: any; take?: number; skip?: number; include?: OrderInclude; select?: OrderSelect; };
export type OrderFindFirstArgs = { where?: OrderWhereInput; orderBy?: any; include?: OrderInclude; select?: OrderSelect; };
export type OrderFindUniqueArgs = { where?: OrderWhereInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderCreateArgs = { data: OrderCreateInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderUpdateArgs = { where: OrderWhereInput; data: OrderUpdateInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderUpsertArgs = { where: OrderWhereInput; create: OrderCreateInput; update: OrderUpdateInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderDeleteArgs = { where: OrderWhereInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderScalarFieldEnum = 'id' | 'userId' | 'total' | 'createdAt';
export type OrderAggregateArgs = { where?: OrderWhereInput; _count?: true | { _all?: true; id?: true; userId?: true; total?: true; createdAt?: true }; _sum?: { total?: true }; _avg?: { total?: true }; _min?: { id?: true; userId?: true; total?: true; createdAt?: true }; _max?: { id?: true; userId?: true; total?: true; createdAt?: true }; };
export type OrderGroupByArgs = { by: OrderScalarFieldEnum | OrderScalarFieldEnum[]; where?: OrderWhereInput; orderBy?: any; skip?: number; take?: number; _count?: true | { _all?: true; id?: true; userId?: true; total?: true; createdAt?: true }; _sum?: { total?: true }; _avg?: { total?: true }; _min?: { id?: true; userId?: true; total?: true; createdAt?: true }; _max?: { id?: true; userId?: true; total?: true; createdAt?: true }; };
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
