"use client";
import { useForm } from "react-hook-form";
import { productSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { useState } from "react";
import Image from "next/image";
import { imageRemove } from "../../../../actions/images";
import { RiDeleteBin5Fill } from "react-icons/ri";

const ProductForm = ({ formData, action }) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: formData,
  });

  const [mainImage, setMainImage] = useState(formData.mainImage);
  const [gallery, setGallery] = useState(formData.gallery);

  const handleRemoveMainImage = async () => {
    const res = await imageRemove(mainImage.key);
    if (res.success) {
      alert("Image removed successfully");
      setMainImage("");
    }
  };

  const handleRemoveGalleryImage = async (image) => {
    const res = await imageRemove(image.key);
    if (res.success) {
      alert("Image removed successfully");
      setGallery(gallery.filter((img) => img !== image));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-8">Creează produs</h1>
      <div className="p-8 bg-white rounded-lg shadow-md mb-8">
        <Form {...form}>
          <form action={action} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input placeholder="ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input placeholder="Price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input placeholder="Stock" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 justify-items-center">
              <div>
                <FormLabel className="flex justify-center mt-1">
                  Imagine Principala
                </FormLabel>
                {mainImage ? (
                  <div className="relative ">
                    <Image
                      className="rounded-lg mt-[13px] w-52 h-52 border-2  border-gray-500"
                      src={mainImage.url}
                      alt="Main Image"
                      width={200}
                      height={200}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveMainImage}
                      className="p-2 absolute right-0 top-0 text-red-500 text-2xl"
                    >
                      <RiDeleteBin5Fill />
                    </button>
                  </div>
                ) : (
                  <UploadDropzone
                    className="mt-[13px] w-52 h-52 border-solid border-2 border-gray-200"
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setMainImage(res[0]);
                    }}
                    onUploadError={(error) => {
                      // Do something with the error.
                      alert(`ERROR! ${error.message}`);
                    }}
                  />
                )}
              </div>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <input
                type="hidden"
                {...form.register("mainImage")}
                value={JSON.stringify(mainImage)}
              />
            </div>
            <FormLabel className="grid grid-cols-2 pt-1 justify-items-center">
              Galerie
            </FormLabel>
            <div className="grid grid-cols-2 justify-items-center">
              {gallery &&
                gallery.map((image, index) => (
                  <div className="relative" key={index}>
                    <Image
                      className="rounded-lg mt-3 w-52 h-52 border-2 border-gray-500"
                      src={image.url}
                      alt="Gallery Image"
                      width={200}
                      height={200}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(image)}
                      className="p-2 pt-3 absolute right-0 top-0 text-red-500 text-2xl"
                    >
                      <RiDeleteBin5Fill />
                    </button>
                  </div>
                ))}

              <UploadDropzone
                className="w-52 h-52 border-2 border-gray-200 border-solid mt-3"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setGallery((gallery) => [...gallery, res[0]]);
                }}
                onUploadError={(error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />

              <input
                type="hidden"
                {...form.register("gallery")}
                value={JSON.stringify(gallery)}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fitment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fitment</FormLabel>
                  <FormControl>
                    <Input placeholder="Fitment" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="characteristics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Characteristics</FormLabel>
                  <FormControl>
                    <Input placeholder="Characteristics" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-black hover:bg-blue-500 text-white rounded-2xl text-center w-full py-2"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
