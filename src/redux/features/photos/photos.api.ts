import { apiSlice } from "@redux/apiSlice";

export const photosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
  useDeletePhotosMutation,
} = photosApi;
