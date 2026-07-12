import { Mssql, TableClient } from './base';

export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}

export type UserWhereInput = {
  AND?: UserWhereInput | UserWhereInput[];
  OR?: UserWhereInput[];
  NOT?: UserWhereInput | UserWhereInput[];
  id?: string | Mssql.StringFilter;
  email?: string | Mssql.StringFilter;
  name?: string | Mssql.StringNullableFilter | null;
  createdAt?: Date | Mssql.DateTimeFilter;
};

export type UserSelect = { id?: boolean; email?: boolean; name?: boolean; createdAt?: boolean; };
export type UserInclude = {  };
export type UserCreateInput = { id?: string; email: string; name?: string | null; createdAt?: Date;  };
export type UserUpdateInput = { email?: string; name?: string | null; createdAt?: Date;  };
export type UserFindManyArgs = { where?: UserWhereInput; orderBy?: any; take?: number; skip?: number; include?: UserInclude; select?: UserSelect; };
export type UserFindFirstArgs = { where?: UserWhereInput; orderBy?: any; include?: UserInclude; select?: UserSelect; };
export type UserFindUniqueArgs = { where?: UserWhereInput; include?: UserInclude; select?: UserSelect; };
export type UserCreateArgs = { data: UserCreateInput; include?: UserInclude; select?: UserSelect; };
export type UserUpdateArgs = { where: UserWhereInput; data: UserUpdateInput; include?: UserInclude; select?: UserSelect; };
export type UserUpsertArgs = { where: UserWhereInput; create: UserCreateInput; update: UserUpdateInput; include?: UserInclude; select?: UserSelect; };
export type UserDeleteArgs = { where: UserWhereInput; include?: UserInclude; select?: UserSelect; };
export type UserTableClient = TableClient<
  User,
  UserWhereInput,
  UserSelect,
  UserInclude,
  UserCreateInput,
  UserUpdateInput,
  UserFindManyArgs,
  UserFindFirstArgs,
  UserFindUniqueArgs,
  UserCreateArgs,
  UserUpdateArgs,
  UserUpsertArgs,
  UserDeleteArgs
>;
