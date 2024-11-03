"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ProductSchema } from "@/utils/zod";
import { useAction } from "next-safe-action/hooks";
import { toast } from "@/components/ui/use-toast";
import { React, useState } from "react";
import { createProduct } from "@/utils/actions/product/create-product";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import RichTextEditor from "@/components/custom ui/text-editor";
import { DisplayValidationError } from "@/components/custom ui/display-validation-error";
import MediaPopUp from "@/components/custom ui/media-pop-up";
import DOMPurify from "dompurify";
import { DisplayServerActionResponse } from "@/components/custom ui/display-server-actions-response";
import { ScrollArea } from "@/components/ui/scroll-area";

const AddProduct = ({ categories, attributes, images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mainImage, setMainImage] = useState();
  const [gallery, setGallery] = useState([]);
  const [description, setDescription] = useState("");
  const mainCategories = categories.filter(
    (category) => category.parentId === null
  );
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedChildCategory, setSelectedChildCategory] = useState(null);

  // Store selected attributes and their selected values
  const [selectedAttributes, setSelectedAttributes] = useState([]);

  const { reset, ...form } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      sku: "",
      price: "",
      stock: "",
      slug: "",
      mainImage: "",
      gallery: [],
      description: "",
      categoryId: "",
      subcategoryId: "",
      attributes: [],
    },
  });

  const { execute, result, isExecuting } = useAction(createProduct, {
    onSuccess: ({ data }) => {
      setIsOpen(false);
      reset();
      setMainImage(null);
      setGallery([]);
      setSelectedAttributes([]); // Reset attributes on success
      toast({
        variant: "default",
        title: "Success",
        description: `Produsul ${data.product} a fost creat!`,
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "A aparut o eroare la crearea produsului.",
        duration: 3000,
      });
    },
  });

  const handleRemoveMainImage = () => {
    setMainImage(null);
  };

  const handleAddMainImage = (image) => {
    setMainImage(image);
  };

  const handleRemoveGalleryImage = (image) => {
    setGallery(gallery.filter((img) => img !== image));
  };

  const handleAddGalleryImage = (id) => {
    setGallery((prevGallery) => {
      const updatedGallery = [...prevGallery, id];
      return updatedGallery;
    });
  };

  // Add a new selected attribute
  const addSelectedAttribute = () => {
    setSelectedAttributes([
      ...selectedAttributes,
      { attributeId: "", selectedValues: [] }, // Initialize with empty attribute ID and values
    ]);
  };

  // Remove an attribute from the selected list
  const removeSelectedAttribute = (index) => {
    const updatedAttributes = selectedAttributes.filter((_, i) => i !== index);
    setSelectedAttributes(updatedAttributes);
  };

  const handleAttributeSelection = (index, value) => {
    const updatedAttributes = selectedAttributes.map((attribute, i) =>
      i === index
        ? { ...attribute, attributeId: value, selectedValues: [] } // Reset selected values
        : attribute
    );
    setSelectedAttributes(updatedAttributes);
  };

  const handleValueSelection = (index, value) => {
    const updatedAttributes = selectedAttributes.map((attribute, i) => {
      if (i === index) {
        const selectedValues = attribute.selectedValues.includes(value)
          ? attribute.selectedValues.filter((val) => val !== value) // Remove if already selected
          : [...attribute.selectedValues, value]; // Add if not selected
        return { ...attribute, selectedValues };
      }
      return attribute;
    });
    setSelectedAttributes(updatedAttributes);
  };

  return (
    <Form {...form}>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="p-2 w-52 text-lg font-semibold bg-gray-400 rounded-lg border-2 hover:border-black">
          Creează un produs
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1000px]">
          <DialogHeader className="pl-4">
            <DialogTitle>Creează un produs</DialogTitle>
            <DialogDescription>
              Completează câmpurile de mai jos, apoi apasă pe butonul
              &quot;Creează&quot; când ai terminat.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const values = form.getValues();
                // Filter out attributes that have a selected value
                const selectedAttrValues = selectedAttributes
                  .filter(
                    (attr) => attr.attributeId && attr.selectedValues.length
                  ) // Only include valid attributes
                  .map((attr) => ({
                    attributeId: attr.attributeId,
                    values: attr.selectedValues,
                  }));

                execute({
                  ...values,
                  price: parseFloat(values.price),
                  stock: parseInt(values.stock),
                  attributes: selectedAttrValues,
                  mainImage: mainImage ? mainImage : {}, // Ensure this is passed correctly
                  gallery: gallery, // Pass the gallery directly as an array
                  description: DOMPurify.sanitize(description), // Sanitize without stringifying
                });
              }}
              className="space-y-4 p-4"
            >
              <div className="grid grid-cols-4 col-span-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numele Produsului</FormLabel>
                      <FormControl>
                        <Input placeholder="Capace" {...field} />
                      </FormControl>
                      <DisplayValidationError
                        value={result.validationErrors?.name}
                      />
                    </FormItem>
                  )}
                />
                {/* Main Category Select */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categorie Principală</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedMainCategory(
                            mainCategories.find((cat) => cat.id === value)
                          );
                          setSelectedChildCategory(null); // Reset child category on main category change
                        }}
                        value={
                          selectedMainCategory ? selectedMainCategory.id : ""
                        }
                        name={field.name}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Main Category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mainCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <DisplayValidationError
                        value={result.validationErrors?.categoryId}
                      />
                    </FormItem>
                  )}
                />

                {/* Child Category Select */}
                {selectedMainCategory?.children &&
                  selectedMainCategory.children.length > 0 && (
                    <FormField
                      control={form.control}
                      name="subcategoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subcategorie</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              setSelectedChildCategory(
                                selectedMainCategory.children.find(
                                  (child) => child.id === value
                                )
                              );
                            }}
                            value={
                              selectedChildCategory
                                ? selectedChildCategory.id
                                : null
                            }
                            name={field.name}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Subcategory" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {selectedMainCategory.children.map((child) => (
                                <SelectItem key={child.id} value={child.id}>
                                  {child.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
              </div>
              <div className="grid grid-cols-4 gap-5">
                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                        <Input placeholder="SKU" {...field} />
                      </FormControl>
                      <DisplayValidationError
                        value={result.validationErrors?.sku}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preț</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="150" {...field} />
                      </FormControl>
                      <DisplayValidationError
                        value={result.validationErrors?.price}
                      />
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
                        <Input type="number" placeholder="10" {...field} />
                      </FormControl>
                      <DisplayValidationError
                        value={result.validationErrors?.stock}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Slug" {...field} />
                      </FormControl>
                      <DisplayValidationError
                        value={result.validationErrors?.slug}
                      />
                    </FormItem>
                  )}
                />
              </div>
              {/* Attribute Selection */}

              <FormField
                control={form.control}
                name="attributes"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 col-span-4 gap-5">
                      <div>
                        <FormLabel>Atribute</FormLabel>
                        {/* Add New Attribute */}
                        <p
                          onClick={addSelectedAttribute}
                          className="bg-black hover:cursor-pointer hover:bg-blue-500 text-sm text-white rounded-2xl text-center w-full py-2 px-4 mt-2"
                        >
                          Adaugă un atribut
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-5">
                      <FormControl>
                        <>
                          {selectedAttributes.map((selectedAttr, index) => (
                            <div key={index} className="mb-4 w-full">
                              <div className="flex w-full items-center gap-1">
                                {/* Select Attribute */}
                                <Select
                                  onValueChange={(value) => {
                                    handleAttributeSelection(index, value);
                                  }}
                                  value={selectedAttr.attributeId || ""}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selectează atribut" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {attributes
                                      .filter(
                                        (attr) =>
                                          !selectedAttributes.some(
                                            (selected) =>
                                              selected.attributeId ===
                                                attr.id &&
                                              selected !== selectedAttr // Exclude the currently editing attribute
                                          )
                                      )
                                      .map((attribute) => (
                                        <SelectItem
                                          key={attribute.id}
                                          value={attribute.id}
                                        >
                                          {attribute.name}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  onClick={() => removeSelectedAttribute(index)}
                                  className="py-0 px-2"
                                >
                                  <TrashIcon className="w-5 h-5" />
                                </Button>
                              </div>

                              {/* Select Values */}
                              {selectedAttr.attributeId && (
                                <div className="ml-4 mt-2">
                                  {attributes
                                    .find(
                                      (attr) =>
                                        attr.id === selectedAttr.attributeId
                                    )
                                    ?.values.map((value, valueIndex) => (
                                      <label
                                        key={valueIndex}
                                        className="flex items-center"
                                      >
                                        <input
                                          type="checkbox"
                                          value={value}
                                          checked={selectedAttr.selectedValues.includes(
                                            value
                                          )}
                                          onChange={() =>
                                            handleValueSelection(index, value)
                                          }
                                          className="mr-2"
                                        />
                                        {value}
                                      </label>
                                    ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </>
                      </FormControl>
                    </div>
                    <DisplayValidationError
                      value={result.validationErrors?.attributes}
                    />
                  </FormItem>
                )}
              />

              <div className="flex gap-5">
                <div>
                  <FormLabel className="mt-1 mr-5">
                    Imagine Principală
                  </FormLabel>
                  {mainImage ? (
                    <div className="relative ">
                      <Image
                        className="rounded-lg mt-6 w-72 h-72 border-2 border-gray-100 hover:border-gray-300 border-solid"
                        src={mainImage.url}
                        alt="Main Image"
                        width={500}
                        height={500}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveMainImage}
                        className="absolute right-2 top-2 text-red-500 text-2xl"
                      >
                        <RiDeleteBin5Fill />
                      </button>
                    </div>
                  ) : (
                    <Dialog>
                      <DialogTrigger>
                        <p className="bg-black hover:bg-blue-500 text-sm text-white rounded-2xl text-center w-full py-2 px-4">
                          Adaugă Imagine
                        </p>
                      </DialogTrigger>
                      <DialogContent className="bg-white max-w-6xl">
                        <DialogHeader>
                          <DialogTitle>Imagini</DialogTitle>
                          <DialogDescription>
                            Selectează o imagine pentru imaginea principală.
                          </DialogDescription>
                          <MediaPopUp
                            images={images}
                            onImageSelect={handleAddMainImage}
                          />
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
                  <input
                    type="hidden"
                    {...form.register("mainImage")}
                    value={mainImage ? JSON.stringify(mainImage) : ""}
                  />
                  <DisplayValidationError
                    value={result.validationErrors?.mainImage.url}
                  />
                </div>

                <div>
                  <div className="flex gap-5 items-center">
                    <FormLabel>Galerie</FormLabel>
                    <Dialog>
                      <DialogTrigger>
                        <p className="bg-black hover:bg-blue-500 text-sm text-white rounded-2xl text-center w-full py-2 px-4">
                          Adaugă Imagine
                        </p>
                      </DialogTrigger>
                      <DialogContent className="bg-white max-w-6xl">
                        <DialogHeader>
                          <DialogTitle>Imagini</DialogTitle>
                          <DialogDescription>
                            Selectează mai multe imagini pentru galerie.
                          </DialogDescription>
                          <MediaPopUp
                            images={images}
                            onImageSelect={handleAddGalleryImage}
                          />
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid grid-cols-4 gap-5 ">
                    {gallery.map((image, index) => (
                      <div key={index} className="relative">
                        <Image
                          className="rounded-lg mt-3 w-32 h-32 border-2 border-gray-100 hover:border-gray-300"
                          src={image.url}
                          alt="Gallery Image"
                          width={500}
                          height={500}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(image)}
                          className="absolute right-2 top-5 text-red-500 text-2xl"
                        >
                          <RiDeleteBin5Fill />
                        </button>
                      </div>
                    ))}
                  </div>
                  <input
                    type="hidden"
                    {...form.register("gallery")}
                    value={JSON.stringify(gallery)}
                  />
                  <DisplayValidationError
                    value={result.validationErrors?.gallery}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descriere</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        {...field}
                        images={images}
                        onChange={(value) => setDescription(value)}
                      />
                    </FormControl>
                    <DisplayValidationError
                      value={result.validationErrors?.description}
                    />
                  </FormItem>
                )}
              />

              <input
                type="hidden"
                {...form.register("description")}
                value={JSON.stringify(description)}
              />

              {!result.validationErrors && (
                <DisplayServerActionResponse result={result} />
              )}

              <DialogFooter className={"flex flex-col"}>
                <Button
                  type="submit"
                  className="bg-black hover:bg-blue-500 text-white rounded-2xl text-center w-full py-2"
                >
                  {isExecuting ? "Se creează.." : "Creează"}
                </Button>
              </DialogFooter>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default AddProduct;
