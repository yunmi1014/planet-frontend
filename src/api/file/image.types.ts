// export type TPath = "inquery" | "portfolio" | "review";

export interface StorageUploadParams {
	path: string;
	file: File;
}

export interface StorageDeleteParams {
	path: string;
}
