"use client";

import { UploadDropzone } from "@/utils/uploadthing";

const UploadDropzoneButton = () => {
  return (
    <UploadDropzone
      className="w-40 h-40 border-2 border-gray-100 hover:border-gray-300 border-solid mt-3 ut-label:hidden ut-allowed-content:hidden ut-button:w-32 ut-button:bg-black ut-upload-icon:text-black"
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
};

export default UploadDropzoneButton;
