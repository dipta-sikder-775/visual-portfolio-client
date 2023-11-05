import { apiSlice } from "@redux/apiSlice";

export const photosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a query endpoint to get all photos
    getAllPhotos: builder.query<TGetAllPhotosRes, TGetAllPhotosArgs>({
      query: () => {
        return {
          url: `/photos`,
          method: "GET",
        };
      },
      providesTags: ["getAllPhotos"], // Invalidate cache with this tag
    }),

    deletePhotos: builder.mutation({
      query: (values) => {
        return {
          url: `/photos`,
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["getAllPhotos"],
    }),
  }),
});

// Export generated hooks for using the API endpoints
export const {
  useGetAllPhotosQuery,
  useLazyGetAllPhotosQuery,
  useDeletePhotosMutation,
} = photosApi;
