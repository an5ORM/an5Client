export * from './base';
export * from './User';
export * from './Order';

import { An5 as BaseAn5 } from './base';
import * as UserTypes from './User';
import * as OrderTypes from './Order';

export namespace An5 {
  export type SortOrder = BaseAn5.SortOrder;
  export type StringFilter = BaseAn5.StringFilter;
  export type StringNullableFilter = BaseAn5.StringNullableFilter;
  export type NumberFilter = BaseAn5.NumberFilter;
  export type NumberNullableFilter = BaseAn5.NumberNullableFilter;
  export type BooleanFilter = BaseAn5.BooleanFilter;
  export type BooleanNullableFilter = BaseAn5.BooleanNullableFilter;
  export type DateTimeFilter = BaseAn5.DateTimeFilter;
  export type DateTimeNullableFilter = BaseAn5.DateTimeNullableFilter;
  export type IntFieldUpdateOperationsInput = BaseAn5.IntFieldUpdateOperationsInput;
  export type FloatFieldUpdateOperationsInput = BaseAn5.FloatFieldUpdateOperationsInput;
  export const An5ClientKnownRequestError = BaseAn5.An5ClientKnownRequestError;
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

export class An5Client {
  $connect(): Promise<void> { return Promise.resolve(); }
  $disconnect(): Promise<void> { return Promise.resolve(); }
  $transaction<R>(fn: (tx: An5Client) => Promise<R>, options?: { timeout?: number }): Promise<R>;
  $transaction<R>(list: Promise<R>[]): Promise<R[]>;
  $transaction(fn: any, options?: any): Promise<any> { return typeof fn === 'function' ? fn(this) : Promise.all(fn); }
  $queryRaw<T = any>(queryParts: TemplateStringsArray | string, ...values: any[]): Promise<T> { return Promise.resolve([] as any); }
  $queryRawUnsafe<R = any>(query: string, ...values: any[]): Promise<R> { return Promise.resolve([] as any); }
  $executeRaw<T = any>(queryParts: TemplateStringsArray | string, ...values: any[]): Promise<any> { return Promise.resolve(0 as any); }
  $executeRawUnsafe(query: string, ...values: any[]): Promise<number> { return Promise.resolve(0); }
  user!: UserTypes.UserTableClient;
  order!: OrderTypes.OrderTableClient;
}
