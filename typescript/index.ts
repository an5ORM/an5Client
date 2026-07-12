export * from './base';
export * from './User';
export * from './Order';

import { Mssql as BaseMssql } from './base';
import * as UserTypes from './User';
import * as OrderTypes from './Order';

export namespace Mssql {
  export type SortOrder = BaseMssql.SortOrder;
  export type StringFilter = BaseMssql.StringFilter;
  export type StringNullableFilter = BaseMssql.StringNullableFilter;
  export type NumberFilter = BaseMssql.NumberFilter;
  export type NumberNullableFilter = BaseMssql.NumberNullableFilter;
  export type BooleanFilter = BaseMssql.BooleanFilter;
  export type BooleanNullableFilter = BaseMssql.BooleanNullableFilter;
  export type DateTimeFilter = BaseMssql.DateTimeFilter;
  export type DateTimeNullableFilter = BaseMssql.DateTimeNullableFilter;
  export type IntFieldUpdateOperationsInput = BaseMssql.IntFieldUpdateOperationsInput;
  export type FloatFieldUpdateOperationsInput = BaseMssql.FloatFieldUpdateOperationsInput;
  export const MssqlClientKnownRequestError = BaseMssql.MssqlClientKnownRequestError;
  export type User = UserTypes.User;
  export type UserWhereInput = UserTypes.UserWhereInput;
  export type UserSelect = UserTypes.UserSelect;
  export type UserInclude = UserTypes.UserInclude;
  export type UserCreateInput = UserTypes.UserCreateInput;
  export type UserUpdateInput = UserTypes.UserUpdateInput;
  export type Order = OrderTypes.Order;
  export type OrderWhereInput = OrderTypes.OrderWhereInput;
  export type OrderSelect = OrderTypes.OrderSelect;
  export type OrderInclude = OrderTypes.OrderInclude;
  export type OrderCreateInput = OrderTypes.OrderCreateInput;
  export type OrderUpdateInput = OrderTypes.OrderUpdateInput;
}

export class MssqlClient {
  $connect(): Promise<void> { return Promise.resolve(); }
  $disconnect(): Promise<void> { return Promise.resolve(); }
  $transaction<R>(fn: (tx: MssqlClient) => Promise<R>, options?: { timeout?: number }): Promise<R>;
  $transaction<R>(list: Promise<R>[]): Promise<R[]>;
  $transaction(fn: any, options?: any): Promise<any> { return typeof fn === 'function' ? fn(this) : Promise.all(fn); }
  $queryRaw<T = any>(queryParts: TemplateStringsArray | string, ...values: any[]): Promise<T> { return Promise.resolve([] as any); }
  $queryRawUnsafe<R = any>(query: string, ...values: any[]): Promise<R> { return Promise.resolve([] as any); }
  $executeRaw<T = any>(queryParts: TemplateStringsArray | string, ...values: any[]): Promise<any> { return Promise.resolve(0 as any); }
  $executeRawUnsafe(query: string, ...values: any[]): Promise<number> { return Promise.resolve(0); }
  user!: UserTypes.UserTableClient;
  order!: OrderTypes.OrderTableClient;
}
