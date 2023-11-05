import React, { forwardRef } from "react";
import styles from "./Photo.module.css";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  selectPhotos,
  toggleSelect,
} from "@redux/features/photos/photos.slice";

// Define the props for the Photo component
interface IPhotoProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  url: string; // URL of the photo
  index: number; // Index of the photo in the grid
  isDragging: boolean; // Indicates whether the photo is being dragged
  photoId: string; // Unique ID of the photo
}

const Photo = forwardRef<HTMLDivElement, IPhotoProps>(
  ({ url, index, photoId, isDragging, ...props }, ref) => {
    const dispatch = useAppDispatch();
    const { selectedPhotos } = useAppSelector(selectPhotos);
    const isSelected = selectedPhotos.includes(photoId);

    return (
      <div
        className={`${styles.parent} ${styles["transform-origin"]} ${
          index === 0 ? styles["feature-photo"] : ""
        } ${isDragging ? styles["cursor-move"] : ""}`}
      >
        {!isDragging && (
          <div>
            <input
              type="checkbox"
              onChange={() => {
                dispatch(toggleSelect(photoId));
              }}
              checked={!isDragging && isSelected}
              name={photoId}
              id={photoId}
              className={`${styles.selectCheckbox}`}
            />
            <label className={styles["sr-only"]} htmlFor={photoId}>
              checkbox
            </label>
          </div>
        )}

        <div
          {...props}
          role="none"
          ref={ref}
          className={`${styles["transform-origin"]} ${
            index === 0 ? styles["feature-photo"] : ""
          }`}
        >
          <div
            className={`${styles["image-wrapper"]} ${
              !isDragging
                ? `${styles.overlay} ${
                    isSelected ? styles["selected-overlay"] : ""
                  }`
                : ""
            }`}
          >
            <img src={url} alt={photoId} className={styles.photo} />
          </div>
        </div>
      </div>
    );
  }
);

export default Photo;
