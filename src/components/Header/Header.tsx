import styles from "./Header.module.css";

const Header = () => {
  // Function to delete selected photos
  const deleteFiles = async () => {

  };

  return (
    <header className={styles["top-bar"]}>
      <div className={styles["top-bar-row"]}>
        {[].length ? (
          <>
            <div className={styles["select-deselect-all-parent"]}>
              {/* Checkbox to select/deselect all photos */}
              <input
                className={styles["select-deselect-all-checkbox"]}
                type="checkbox"
                name="selectDeselectAll"
                id="selectDeselectAll"
                title="Remove all selected"
                checked={!![].length}
                onChange={() => {
                }}
              />

              <label
                className={styles["select-deselect-all-checkbox-label"]}
                htmlFor="selectDeselectAll"
                title="Remove all selected"
              >
                {[]?.length}{" "}
                {[]?.length >= 2 ? "Files" : "File"} Selected
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
