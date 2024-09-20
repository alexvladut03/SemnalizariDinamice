import UploadDropzoneButton from "@/components/custom ui/upload-dropzone-button";
import { MediaMapping } from "./_components/MediaMapping";

const Media = async () => {
  return (
    <div className="grid grid-cols-4 gap-5 ">
      <MediaMapping />
      <UploadDropzoneButton />
    </div>
  );
};

export default Media;
