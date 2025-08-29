import type { IResponse, IRide, IUser } from "@/types";
import baseApi from "../baseApi";

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateDriverAvailability: builder.mutation<IUser, boolean>({
      query: (isOnline) => ({
        url: "/user/driver/availability",
        method: "PATCH",
        data: { isOnline },
      }),
      invalidatesTags: ["DRIVER", "USER"],
    }),

    getAvailableRides: builder.query<IResponse<IRide[]>, void>({
      query: () => ({
        url: "/rides/available",
        method: "GET",
      }),
      providesTags: ["DRIVER", "RIDES"],
    }),

    acceptRide: builder.mutation<IResponse<IRide>, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/accept`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDES"],
    }),

    pickupRide: builder.mutation<IResponse<IRide>, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/pickup`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDES"],
    }),

    inTransitRide: builder.mutation<IResponse<IRide>, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/start-transit`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDES"],
    }),

    completeRide: builder.mutation<IResponse<IRide>, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDES"],
    }),

    cancelRideByDriver: builder.mutation<IResponse<IRide>, string>({
      query: (rideId) => ({
        url: `/rides/${rideId}/cancel-by-driver`,
        method: "PATCH",
      }),
      invalidatesTags: ["DRIVER", "RIDES"],
    }),

    getDriverRideHistory: builder.query<IResponse<IRide[]>, void>({
      query: () => ({
        url: "/rides/driver-history",
        method: "GET",
      }),
      providesTags: ["DRIVER", "RIDES"],
    }),
  }),
});

export const {
  useUpdateDriverAvailabilityMutation,
  useGetAvailableRidesQuery,
  useAcceptRideMutation,
  usePickupRideMutation,
  useInTransitRideMutation,
  useCompleteRideMutation,
  useCancelRideByDriverMutation,
  useGetDriverRideHistoryQuery,
} = driverApi;
