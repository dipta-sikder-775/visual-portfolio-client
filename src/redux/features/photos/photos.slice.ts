import { RootState } from "@redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define the shape of the photos slice state
interface IPhotos {
  selectedPhotos: string[];
}

// Define the initial state for the photos slice
const initialState: IPhotos = {
  selectedPhotos: [],
};

// Create a Redux slice for managing photos
const photosSlice = createSlice({
  name: "photos", // The name of the slice
  initialState, // Initial state
  reducers: {
    // Action to toggle selection of a photo by its ID
    toggleSelect: (state, action: PayloadAction<string>) => {
      const isChecked = state.selectedPhotos.find(
        (selectedPhoto) => selectedPhoto === action.payload
      );

      if (isChecked) {
        // If the photo is already selected, remove it from the selection
        const index = state.selectedPhotos.findIndex(
          (selectedPhoto) => selectedPhoto === action.payload
        );
        state.selectedPhotos.splice(index, 1);
      } else {
        // If the photo is not selected, add it to the selection
        state.selectedPhotos.push(action.payload);
      }
    },

    // Action to remove all selected photos
    removeSelected: (state) => {
      state.selectedPhotos.length = 0;
    },
  },
});

// Export the action creators
export const { toggleSelect, removeSelected } = photosSlice.actions;

// Define a selector function to access the photos state
type TSelectPhotos = (state: RootState) => typeof state.photos;

export const selectPhotos: TSelectPhotos = (state) => state.photos;

// Create the reducer for the photos slice
const photosReducer = photosSlice.reducer;

export default photosReducer;
