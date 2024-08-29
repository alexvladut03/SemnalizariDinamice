import React from "react";
import Image from "next/image";
import { RiDeleteBin5Fill } from "react-icons/ri";

import UploadDropzoneButton from "@/components/custom ui/upload-dropzone-button";
import { getImages } from "@/utils/actions/images/get-images";

const Media = async () => {
  const uploads = await getImages();

  const images = uploads.uploads.files;

  return (
    <div className="grid grid-cols-4 gap-5 ">
      {images &&
        images.map((image, index) => (
          <div className="relative" key={index}>
            <Image
              className="rounded-lg mt-3 w-40 h-40 border-2 border-gray-100 hover:border-gray-300"
              src={`https://utfs.io/f/${image.key}`}
              alt="Gallery Image"
              width={200}
              height={200}
            />
            <button
              type="button"
              className="pt-4 pr-1 absolute right-0 top-0 text-red-500 text-2xl"
            >
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      <UploadDropzoneButton />
    </div>
  );
};

export default Media;
