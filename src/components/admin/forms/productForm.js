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
import { UploadDropzone } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import Image from "next/image";
import { imageRemove } from "../../../../actions/images";
import { TiDelete } from "react-icons/ti";

const ProductForm = ({ formData, action }) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: formData,
  });

  const [mainImage, setMainImage] = useState(formData.mainImage);
  const [gallery, setGallery] = useState(formData.gallery);

  useEffect(() => {
    form.setValue("mainImage", JSON.stringify(mainImage));
    form.setValue("gallery", JSON.stringify(gallery));
  }, [mainImage, gallery]);

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
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold my-8">Creează produs</h1>
      <div className="max-w-2xl p-8 bg-white rounded-lg shadow-md mb-8">
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

            <div className="my-2">
              <FormLabel>Imagine Principala</FormLabel>
              {mainImage ? (
                <div className="relative">
                  <Image
                    className="rounded-lg"
                    src={mainImage.url}
                    alt="Main Image"
                    width={100}
                    height={100}
                  />
                  <button
                    className="absolute top-0 right-0"
                    type="button"
                    onClick={handleRemoveMainImage}
                  >
                    <TiDelete className="text-red-700 text-3xl" />
                  </button>
                </div>
              ) : (
                <UploadDropzone
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

              <input
                type="hidden"
                {...form.register("mainImage")}
                value={JSON.stringify(mainImage)}
              />
            </div>

            <div className="my-2">
              <FormLabel>Galerie</FormLabel>
              {gallery &&
                gallery.map((image, index) => (
                  <div key={index}>
                    <Image
                      className="rounded-lg mx-auto mb-2"
                      src={image.url}
                      alt="Gallery Image"
                      width={200}
                      height={200}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(image)}
                      className="bg-red-500 hover:bg-red-700 text-white rounded-2xl text-center w-full py-2"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              <UploadDropzone
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
