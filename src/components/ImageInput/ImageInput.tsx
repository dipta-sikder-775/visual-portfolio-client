import { FaRegImage } from "react-icons/fa";
import styles from "./ImageInput.module.css";
import { useState } from "react";
import { ICloudinaryImageUploadData } from "@ts/cloudinary-upload";
import { v4 as uuid } from "uuid";
import { toast } from "react-hot-toast";
import { useUploadAPhotoMutation } from "@redux/features/photos/photos.api";

const ImageInput = () => {
  // State to track selected files
  const [allFiles, setAllFiles] = useState<File[]>([]);
  const [uploadAPhoto] = useUploadAPhotoMutation();

  // Function to handle the upload of selected images
  const handleUploadImages = async () => {
    try {
      // Show loading toast while uploading
      toast.loading(
        `Executing ${allFiles.length >= 2 ? "Photos" : "Photo"} upload...`,
        { id: "photosUpload" }
      );

      // Create a FormData object for each selected file
      for (const file of allFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_APP_UPLOAD_PRESET
        );
        formData.append("cloud_name", import.meta.env.VITE_APP_CLOUD_NAME);

        // Upload the image to Cloudinary
        const imageUploadRes = await fetch(
          import.meta.env.VITE_APP_CLOUDINARY_API_URL,
          {
            method: "POST",
            body: formData,
          }
        );

        const imageUploadData =
          (await imageUploadRes.json()) as ICloudinaryImageUploadData;

        if (imageUploadData?.secure_url) {
          // Create data object with the uploaded image URL and add to state
          const data = {
            [uuid()]: {
              url: imageUploadData.secure_url,
            },
          };

          // Call the uploadAPhoto mutation to save the image URL
          await uploadAPhoto(data).unwrap();
        }
      }

      // Show success toast and reset the selected files
      toast.success(
        `Successfully uploaded ${allFiles.length} ${
          allFiles.length >= 2 ? "Photos" : "Photo"
        }`,
        { id: "photosUpload" }
      );
      setAllFiles([]);
    } catch (error) {
      // Show an error toast if the upload fails
      toast.error("An Error Occurred! Can't upload some photos", {
        id: "photosUpload",
      });
      console.log("upload file error: ", error);
    }
  };

  return (
    <div className={styles["photo-input-parent"]}>
      {!allFiles?.length ? (
        // Render file input if no files are selected
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
