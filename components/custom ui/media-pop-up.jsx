import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const MediaPopUp = ({ uploads, editor, onImageSelect }) => {
  const [images, setImages] = useState(uploads.uploads);
  const [selectedImages, setSelectedImages] = useState(new Set());

  const toggleImageSelection = (url) => {
    const updatedSelection = new Set(selectedImages);

    if (updatedSelection.has(url)) {
      updatedSelection.delete(url); // Deselect if already selected
    } else {
      updatedSelection.add(url); // Select if not already selected
      if (onImageSelect) onImageSelect(url); // Add to gallery if selected

      // If editor is provided, set the image in the editor
      if (editor) {
        editor.chain().focus().setImage({ src: url }).run();
      }
    }

    setSelectedImages(updatedSelection);
  };

  return (
    <ScrollArea className="h-[400px] p-4">
      <div className="grid grid-cols-6 gap-2">
        {images &&
          images.map((image, index) => {
            const url = `https://utfs.io/f/${image.key}`;
            const isSelected = selectedImages.has(url);
            return (
              <div className="relative" key={index}>
                <Image
                  className={`rounded-lg mt-3 w-40 h-40 border-2 border-gray-100 cursor-pointer ${
                    isSelected ? "border-blue-500" : "hover:border-gray-300"
                  }`}
                  src={url}
                  alt="Gallery Image"
                  width={200}
                  height={200}
                  onClick={() => toggleImageSelection(url)} // Toggle selection
                />
              </div>
            );
          })}
      </div>
    </ScrollArea>
  );
};

export default MediaPopUp;
