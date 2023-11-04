import { FaRegImage } from "react-icons/fa";
import styles from "./ImageInput.module.css";
import { useState } from "react";

const ImageInput = () => {
  const [allFiles, setAllFiles] = useState<File[]>([]);

  const handleUploadImages = async () => {
  };

  return (
    <div className={styles["photo-input-parent"]}>
      {!allFiles?.length ? (
        <>
          <input
            className={styles["file-input"]}
            type="file"
            accept=".png, .jpg, .jpeg, .webp, .gif, .svg"
            multiple
            name="fileInput"
            id="fileInput"
            onChange={({ target: { files } }) => {
              if (files?.length) setAllFiles(Object.values(files));
              else setAllFiles([]);
            }}
          />

          <label className={styles["file-input-label"]} htmlFor="fileInput">
            <FaRegImage className={styles["photo-icon"]} />
            <p className={styles["add-images-text"]}>Add Images</p>
          </label>
        </>
      ) : (
        // Render file upload options if files are selected
        <div className={styles["file-upload-parent"]}>
          <p className={styles["file-upload-count"]}>
            {allFiles.length} {allFiles.length >= 2 ? "Photos" : "Photo"}{" "}
            Selected
          </p>

          <div className={styles["buttons-container"]}>
            <button
              onClick={handleUploadImages}
              className={`btn ${styles["upload-button"]}`}
              type="button"
            >
              Upload
            </button>

            <button
              onClick={() => setAllFiles([])}
              className={`btn ${styles["remove-button"]}`}
              type="button"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageInput;
