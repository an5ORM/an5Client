import { Mssql, TableClient } from './base';

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
  id?: string | Mssql.StringFilter;
  userId?: string | Mssql.StringFilter;
  total?: number | Mssql.NumberFilter;
  createdAt?: Date | Mssql.DateTimeFilter;
};

export type OrderSelect = { id?: boolean; userId?: boolean; total?: boolean; createdAt?: boolean; };
export type OrderInclude = {  };
export type OrderCreateInput = { id?: string; userId: string; total?: number; createdAt?: Date;  };
export type OrderUpdateInput = { userId?: string; total?: number | Mssql.IntFieldUpdateOperationsInput; createdAt?: Date;  };
export type OrderFindManyArgs = { where?: OrderWhereInput; orderBy?: any; take?: number; skip?: number; include?: OrderInclude; select?: OrderSelect; };
export type OrderFindFirstArgs = { where?: OrderWhereInput; orderBy?: any; include?: OrderInclude; select?: OrderSelect; };
export type OrderFindUniqueArgs = { where?: OrderWhereInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderCreateArgs = { data: OrderCreateInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderUpdateArgs = { where: OrderWhereInput; data: OrderUpdateInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderUpsertArgs = { where: OrderWhereInput; create: OrderCreateInput; update: OrderUpdateInput; include?: OrderInclude; select?: OrderSelect; };
export type OrderDeleteArgs = { where: OrderWhereInput; include?: OrderInclude; select?: OrderSelect; };
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
  OrderDeleteArgs
>;
