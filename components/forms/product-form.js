"use client";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import Image from "next/image";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Toaster } from "@/components/ui/toaster";
import DOMPurify from "dompurify";
import { deleteImage } from "@/utils/actions/images/delete-image";
import { productSchema } from "@/utils/zod";
import RichTextEditor from "../custom ui/text-editor";

const ProductForm = ({ formData, action, categories }) => {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: formData,
  });

  const [mainImage, setMainImage] = useState(formData.mainImage);
  const [gallery, setGallery] = useState(formData.gallery);
  const [description, setDescription] = useState(formData.description);
  const [fitment, setFitment] = useState(formData.fitment);
  const [characteristics, setCharacteristics] = useState(
    formData.characteristics
  );

  useEffect(() => {
    form.setValue("mainImage", JSON.stringify(mainImage));
    form.setValue("gallery", JSON.stringify(gallery));
    form.setValue("description", description);
    form.setValue("fitment", fitment);
    form.setValue("characteristics", characteristics);
  }, [mainImage, gallery, description, fitment, characteristics]);

  const handleRemoveMainImage = async () => {
    const res = await deleteImage(mainImage.key);
    if (res.success) {
      alert("Image removed successfully");
      setMainImage("");
    }
  };

  const handleRemoveGalleryImage = async (image) => {
    const res = await deleteImage(image.key);
    if (res.success) {
      alert("Image removed successfully");
      setGallery(gallery.filter((img) => img !== image));
    }
  };

  return (
    <>
      <div className="flex flex-col items-center ">
        <h1 className="text-2xl font-bold my-8">Creează produs</h1>
        <div className="p-8 bg-white rounded-lg shadow-sm shadow-gray-400 mb-8">
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

              <div className="grid grid-cols-2 gap-4">
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
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        name={field.name}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              ref={field.ref}
                              placeholder="Selecteaza o categorie"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category, index) =>
                            console.log("Category", category)
                          )}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 items-center">
                <div>
                  <FormLabel className="mt-1">Imagine Principala</FormLabel>
                  {mainImage ? (
                    <div className="relative ">
                      <Image
                        className="rounded-lg mt-[13px] w-[340px] h-[340px] border-2 border-gray-100 hover:border-gray-300 border-solid"
                        src={mainImage.url}
                        alt="Main Image"
                        width={200}
                        height={200}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveMainImage}
                        className="pr-4 pt-2 absolute right-0 top-0 text-red-500 text-2xl"
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </div>
                  ) : (
                    <UploadDropzone
                      className="w-[340px] h-[340px] border-2 border-gray-100 hover:border-gray-300 border-solid mt-3 ut-label:hidden ut-allowed-content:hidden ut-button:w-48 ut-button:bg-black ut-upload-icon:text-black"
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

                <input
                  type="hidden"
                  {...form.register("mainImage")}
                  value={JSON.stringify(mainImage)}
                />
                <div className="pl-2 space-y-10">
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
              </div>
              <FormLabel className="flex pt-3">Galerie</FormLabel>
              <div className="grid grid-cols-4 gap-5 ">
                {gallery &&
                  gallery.map((image, index) => (
                    <div className="relative" key={index}>
                      <Image
                        className="rounded-lg mt-3 w-40 h-40 border-2 border-gray-100 hover:border-gray-300"
                        src={image.url}
                        alt="Gallery Image"
                        width={200}
                        height={200}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveGalleryImage(image)}
                        className="pt-4 pr-1 absolute right-0 top-0 text-red-500 text-2xl"
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </div>
                  ))}

                <UploadDropzone
                  className="w-40 h-40 border-2 border-gray-100 hover:border-gray-300 border-solid mt-3 ut-label:hidden ut-allowed-content:hidden ut-button:w-32 ut-button:bg-black ut-upload-icon:text-black"
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
                      <RichTextEditor
                        {...field}
                        onChange={(value) => setDescription(value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <input
                type="hidden"
                {...form.register("description")}
                value={JSON.stringify(DOMPurify.sanitize(description))}
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
      <Toaster />
    </>
  );
};

export default ProductForm;
