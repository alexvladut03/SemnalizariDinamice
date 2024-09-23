import UploadDropzoneButton from "@/components/custom ui/upload-dropzone-button";
import { MediaMapping } from "./_components/MediaMapping";
import { getImagesCustom } from "@/utils/actions/images/get-images";

const Media = async () => {
  const uploads = await getImagesCustom();

  return (
    <div className="grid grid-cols-4 gap-5 ">
      <MediaMapping uploads={uploads} />
      <UploadDropzoneButton />
    </div>
  );
};

export default Media;
