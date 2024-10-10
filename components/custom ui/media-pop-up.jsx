import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const MediaPopUp = ({ images: uploadedImages, editor, onImageSelect }) => {
  const [images, setImages] = useState(uploadedImages);
  const [selectedImages, setSelectedImages] = useState(new Set());

  const toggleImageSelection = (image) => {
    const updatedSelection = new Set(selectedImages);

    if (updatedSelection.has(image.url)) {
      updatedSelection.delete(image.url); // Deselect if already selected
    } else {
      updatedSelection.add(image.url); // Select if not already selected
      if (onImageSelect) onImageSelect(image); // Add to gallery if selected

      // If editor is provided, set the image in the editor
      if (editor) {
        editor.chain().focus().setImage({ src: image.url }).run();
      }
    }

    setSelectedImages(updatedSelection);
  };

  return (
    <ScrollArea className="h-[400px] p-4">
      <div className="grid grid-cols-6 gap-2">
        {images &&
          images.map((image) => {
            const isSelected = selectedImages.has(image.url);
            return (
              <div className="relative" key={image.id}>
                <Image
                  className={`rounded-lg mt-3 w-40 h-40 border-2 border-gray-100 cursor-pointer ${
                    isSelected ? "border-blue-500" : "hover:border-gray-300"
                  }`}
                  src={image.url}
                  alt="Gallery Image"
                  width={200}
                  height={200}
                  onClick={() => toggleImageSelection(image)} // Toggle selection
                />
              </div>
            );
          })}
      </div>
    </ScrollArea>
  );
};

export default MediaPopUp;
