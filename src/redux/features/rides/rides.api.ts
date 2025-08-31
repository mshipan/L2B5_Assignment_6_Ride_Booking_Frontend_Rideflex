import type {
  AdminDashboard,
  DriverDashboard,
  IResponse,
  IRide,
  RideQueryParams,
  RiderDashboard,
} from "@/types";
import baseApi from "../baseApi";

export const ridesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRides: builder.query<IResponse<IRide[]>, RideQueryParams | void>({
      query: (params) => ({
        url: "/rides/all-rides",
        method: "GET",
        params,
      }),
      providesTags: ["RIDES"],
    }),

    requestARide: builder.mutation<IResponse<IRide>, Partial<IRide>>({
      query: (body) => ({
        url: "/rides",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["RIDES"],
    }),

    estimateFare: builder.mutation<
      IResponse<{
        distanceInKm: number;
        durationInMinutes: number;
        estimatedFare: number;
      }>,
      { pickupLocation: string; destinationLocation: string }
    >({
      query: (body) => ({
        url: "/rides/estimate-fare",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["RIDES"],
    }),

    getMyRides: builder.query<IResponse<IRide[]>, void>({
      query: () => ({
        url: "/rides/my-rides",
        method: "GET",
      }),
      providesTags: ["RIDES"],
    }),

    getRideDetails: builder.query<IResponse<IRide>, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}`,
        method: "GET",
      }),
      providesTags: ["RIDES"],
    }),

    cancelRide: builder.mutation<IResponse<IRide>, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDES"],
    }),

    getRiderRideHistory: builder.query<IResponse<IRide[]>, void>({
      query: () => ({
        url: "/rides/rider-history",
        method: "GET",
      }),
      providesTags: ["RIDES"],
    }),

    getAdminDashboard: builder.query<IResponse<AdminDashboard>, void>({
      query: () => ({
        url: "/rides/admin-dashboard",
        method: "GET",
      }),
      providesTags: ["USER", "RIDES", "DRIVER"],
    }),

    getRiderDashboard: builder.query<IResponse<RiderDashboard>, void>({
      query: () => ({
        url: "/rides/rider-dashboard",
        method: "GET",
      }),
      providesTags: ["USER", "RIDES", "DRIVER"],
    }),

    getDriverDashboard: builder.query<IResponse<DriverDashboard>, void>({
      query: () => ({
        url: "/rides/driver-dashboard",
        method: "GET",
      }),
      providesTags: ["USER", "RIDES", "DRIVER"],
    }),
  }),
});

export const {
  useGetAllRidesQuery,
  useRequestARideMutation,
  useEstimateFareMutation,
  useGetMyRidesQuery,
  useGetRideDetailsQuery,
  useCancelRideMutation,
  useGetRiderRideHistoryQuery,
  useGetAdminDashboardQuery,
  useGetRiderDashboardQuery,
  useGetDriverDashboardQuery,
} = ridesApi;
