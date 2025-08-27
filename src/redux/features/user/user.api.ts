/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IResponse, IUser, TApprovalStatus, TUserStatus } from "@/types";
import baseApi from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    allUsers: builder.query<
      {
        users: IUser[];
        meta: IResponse<IUser[]>["meta"];
      },
      Record<string, any> | void
    >({
      query: (params) => ({
        url: "/user",
        method: "GET",
        params: params,
      }),
      providesTags: ["USER"],
      transformResponse: (response: IResponse<IUser[]>) => ({
        users: response.data,
        meta: response.meta,
      }),
    }),

    getSingleUserInfo: builder.query<IResponse<IUser>, string>({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    setUserStatus: builder.mutation<
      IUser,
      { userId: string; isActive: TUserStatus }
    >({
      query: ({ userId, isActive }) => ({
        url: `/user/${userId}/status`,
        method: "PATCH",
        data: { isActive },
      }),
      invalidatesTags: ["USER"],
    }),

    setUserApprovalStatus: builder.mutation<
      IUser,
      { userId: string; approvalStatus: TApprovalStatus }
    >({
      query: ({ userId, approvalStatus }) => ({
        url: `/user/${userId}/approval-status`,
        method: "PATCH",
        data: { approvalStatus },
      }),
      invalidatesTags: ["USER"],
    }),

    updateProfile: builder.mutation<
      IResponse<IUser>,
      { id: string; body: Partial<IUser> }
    >({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useUserInfoQuery,
  useAllUsersQuery,
  useGetSingleUserInfoQuery,
  useSetUserStatusMutation,
  useSetUserApprovalStatusMutation,
  useUpdateProfileMutation,
} = userApi;
