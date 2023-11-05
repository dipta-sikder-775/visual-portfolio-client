import { useAppDispatch, useAppSelector } from "@redux/hooks";
import styles from "./Header.module.css";
import {
  removeSelected,
  selectPhotos,
} from "@redux/features/photos/photos.slice";
import { toast } from "react-hot-toast";
import {
  useDeletePhotosMutation,
  useLazyGetAllPhotosQuery,
} from "@redux/features/photos/photos.api";
import { IDeletePhotosArgs } from "@ts/photos";

const Header = () => {
  // Initialize hooks, queries, and dispatch
  const [getAllPhotos] = useLazyGetAllPhotosQuery();
  const [deletePhotos] = useDeletePhotosMutation();
  const dispatch = useAppDispatch();
  const { selectedPhotos } = useAppSelector(selectPhotos);

  // Function to delete selected photos
  const deleteFiles = async () => {
    try {
      toast.loading("Executing delete request...", { id: "deletePhotos" });
      const allPhotos = await getAllPhotos().unwrap();
      let clonedAllPhotos: IDeletePhotosArgs | undefined;

      if (allPhotos) {
        clonedAllPhotos = structuredClone(allPhotos);

        for (const photoId of selectedPhotos) {
          if (photoId in clonedAllPhotos) {
            delete clonedAllPhotos[photoId];
          }
        }
      }

      await deletePhotos(clonedAllPhotos as IDeletePhotosArgs).unwrap();
      toast.success("Successfully deleted selected photos", {
        id: "deletePhotos",
      });
      dispatch(removeSelected());
    } catch (error) {
      toast.error("An Error Occurred! Can't delete selected photos", {
        id: "deletePhotos",
      });
      console.log("delete photos error: ", error);
    }
  };

  return (
    <header className={styles["top-bar"]}>
      <div className={styles["top-bar-row"]}>
        {selectedPhotos.length ? (
          <>
            <div className={styles["select-deselect-all-parent"]}>
              {/* Checkbox to select/deselect all photos */}
              <input
                className={styles["select-deselect-all-checkbox"]}
                type="checkbox"
                name="selectDeselectAll"
                id="selectDeselectAll"
                title="Remove all selected"
                checked={!!selectedPhotos.length}
                onChange={() => {
                  dispatch(removeSelected());
                }}
              />

              <label
                className={styles["select-deselect-all-checkbox-label"]}
                htmlFor="selectDeselectAll"
                title="Remove all selected"
              >
                {selectedPhotos?.length}{" "}
                {selectedPhotos?.length >= 2 ? "Files" : "File"} Selected
              </label>
            </div>

            {/* Button to delete selected photos */}
            <p onClick={deleteFiles} className={styles["delete-files"]}>
              Delete Files
            </p>
          </>
        ) : (
          // Header title when no photos are selected
          <h1 className={styles["top-bar-title"]}>Gallery</h1>
        )}
      </div>

      {/* Horizontal line separator */}
      <div className={styles["top-bar-hr"]} />
    </header>
  );
};

export default Header;
