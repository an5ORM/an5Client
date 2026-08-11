import { An5, TableClient } from './base';

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
  id?: string | An5.StringFilter;
  email?: string | An5.StringFilter;
  name?: string | An5.StringNullableFilter | null;
  createdAt?: Date | An5.DateTimeFilter;
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
export type UserScalarFieldEnum = 'id' | 'email' | 'name' | 'createdAt';
export type UserAggregateArgs = { where?: UserWhereInput; _count?: true | { _all?: true; id?: true; email?: true; name?: true; createdAt?: true }; _sum?: {  }; _avg?: {  }; _min?: { id?: true; email?: true; name?: true; createdAt?: true }; _max?: { id?: true; email?: true; name?: true; createdAt?: true }; };
export type UserAggregateHavingInput = { _count?: { _all?: An5.NumberFilter | number; id?: An5.NumberFilter | number; email?: An5.NumberFilter | number; name?: An5.NumberFilter | number; createdAt?: An5.NumberFilter | number }; _sum?: {  }; _avg?: {  }; _min?: { id?: any; email?: any; name?: any; createdAt?: any }; _max?: { id?: any; email?: any; name?: any; createdAt?: any }; };
export type UserGroupByArgs = { by: UserScalarFieldEnum | UserScalarFieldEnum[]; where?: UserWhereInput; having?: UserAggregateHavingInput; orderBy?: any; skip?: number; take?: number; _count?: true | { _all?: true; id?: true; email?: true; name?: true; createdAt?: true }; _sum?: {  }; _avg?: {  }; _min?: { id?: true; email?: true; name?: true; createdAt?: true }; _max?: { id?: true; email?: true; name?: true; createdAt?: true }; };
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
  UserDeleteArgs,
  UserAggregateArgs,
  UserGroupByArgs
>;
