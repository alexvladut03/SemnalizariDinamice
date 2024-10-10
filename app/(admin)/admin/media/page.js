import { ImageMapping } from "./_components/ImageMapping";
import { AddImage } from "./_components/AddImage";
import { getAllImages } from "@/utils/functions/image/get-all-images";

const Media = async () => {
  const images = await getAllImages();

  return (
    <div className="p-4 bg-gray-100">
      <div className="text-center text-2xl my-8 font-semibold">
        O lista cu imaginile adaugate
      </div>
      <div className="flex justify-end mb-4">
        <AddImage />
      </div>
      <section className="bg-white rounded-lg shadow-sm shadow-gray-400">
        <ImageMapping images={images} />
      </section>
    </div>
  );
};

export default Media;
