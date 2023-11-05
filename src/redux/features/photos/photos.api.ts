import {
  IDeletePhotosArgs,
  IDeletePhotosRes,
  IUploadAPhotoArgs,
  IUploadAPhotoRes,
  TGetAllPhotosArgs,
  TGetAllPhotosRes,
} from "@ts/photos";
import { apiSlice } from "@redux/apiSlice";

// Create an API slice for managing photos
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

    // Define a mutation endpoint to upload a photo
    uploadAPhoto: builder.mutation<IUploadAPhotoRes, IUploadAPhotoArgs>({
      query: (values) => {
        return {
          url: `/photos`,
          method: "PATCH",
          body: values,
        };
      },
      invalidatesTags: ["getAllPhotos"], // Invalidate cache with this tag
    }),

    // Define a mutation endpoint to delete photos
    deletePhotos: builder.mutation<IDeletePhotosRes, IDeletePhotosArgs>({
      query: (values) => {
        return {
          url: `/photos`,
          method: "PUT",
          body: values,
        };
      },
      invalidatesTags: ["getAllPhotos"], // Invalidate cache with this tag
    }),
  }),
});

// Export generated hooks for using the API endpoints
export const {
  useGetAllPhotosQuery,
  useLazyGetAllPhotosQuery,
  useUploadAPhotoMutation,
  useDeletePhotosMutation,
} = photosApi;
