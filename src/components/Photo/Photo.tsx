import React, { forwardRef } from "react";
import styles from "./Photo.module.css";

// Define the props for the Photo component
interface IPhotoProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  url: string; // URL of the photo
  index: number; // Index of the photo in the grid
}

const Photo = forwardRef<HTMLDivElement, IPhotoProps>(
  ({ url, index, ...props }, ref) => {
    return (
      <div
        className={`${styles["transform-origin"]} ${
          index === 0 ? styles["feature-photo"] : ""
        }`}
      >
        <div className={`${styles["image-wrapper"]}`}>
          <img src={url} alt={""} className={styles.photo} />
        </div>
      </div>
    );
  }
);

export default Photo;
