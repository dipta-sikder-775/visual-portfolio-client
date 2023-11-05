/* getAllPhotos start */
export interface ImageData {
  url: string;
}

export interface ImageDataCollection {
  [key: string]: ImageData;
}

export type TGetAllPhotosRes = ImageDataCollection | undefined;
export type TGetAllPhotosArgs = void;

/* getAllPhotos end */

/* ******************************* */

/* uploadAPhoto start */
export interface IUploadAPhotoArgs {
  [key: string]: ImageData;
}

export type IUploadAPhotoRes = ImageDataCollection | undefined;
/* uploadAPhoto end */

/* ****************************** */

/* deletePhotos start */
export interface IDeletePhotosArgs {
  [key: string]: ImageData;
}

export type IDeletePhotosRes = ImageDataCollection | undefined;
/* deletePhotos end */
