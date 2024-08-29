import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { getImagesCustom } from "@/utils/actions/images/get-images";

const MediaPopUp = ({ editor }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUploads = async () => {
      const uploads = await getImagesCustom();
      setImages(uploads.uploads);
      setLoading(false);
    };

    fetchUploads();
  }, []);

  const addImageOnClick = (e) => {
    const url = e.target.src;

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <ScrollArea className="h-[400px] p-4">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-6 gap-2">
          {images &&
            images.map((image, index) => (
              <div className="relative" key={index}>
                <Image
                  className="rounded-lg mt-3 w-40 h-40 border-2 border-gray-100 hover:border-gray-300"
                  src={`https://utfs.io/f/${image.key}`}
                  alt="Gallery Image"
                  width={200}
                  height={200}
                  onClick={addImageOnClick}
                />
              </div>
            ))}
        </div>
      )}
    </ScrollArea>
  );
};

export default MediaPopUp;
