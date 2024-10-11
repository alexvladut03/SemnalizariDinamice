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
import { React, useEffect, useState } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Image from "next/image";
import { TrashIcon } from "lucide-react";
import RichTextEditor from "@/components/custom ui/text-editor";
import { DisplayValidationError } from "@/components/custom ui/display-validation-error";
import MediaPopUp from "@/components/custom ui/media-pop-up";
import DOMPurify from "dompurify";
import { DisplayServerActionResponse } from "@/components/custom ui/display-server-actions-response";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateProduct } from "@/utils/actions/product/update-product";
import { FaEdit } from "react-icons/fa";

const EditProduct = ({ categories, attributes, product, images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mainImage, setMainImage] = useState();
  const [gallery, setGallery] = useState([]);
  const [description, setDescription] = useState(product.description);
  const mainCategories = categories.filter(
    (category) => category.parentId === null
  );
  const productCategoryWithChildren = {
    ...product.category,
    ...(product.subcategory ? { children: [{ ...product.subcategory }] } : {}),
  };

  const [selectedMainCategory, setSelectedMainCategory] = useState(
    productCategoryWithChildren
  );
  const [selectedChildCategory, setSelectedChildCategory] = useState(
    product.subcategory ? product.subcategory : null
  );

  const attributeReformatted = product.attributes.map((attr) => ({
    attributeId: attr.attributeId,
    selectedValues: attr.values,
  }));
  // Store selected attributes and their selected values
  const [selectedAttributes, setSelectedAttributes] =
    useState(attributeReformatted);

  const { reset, ...form } = useForm({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      slug: product.slug,
      mainImage: mainImage,
      gallery: gallery,
      description: product.description,
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId,
      attributes: product.attributes,
    },
  });

  const { execute, result, isExecuting } = useAction(updateProduct, {
    onSuccess: () => {
      setIsOpen(false);
      reset();
      toast({
        variant: "default",
        title: "Success",
        description: `Produsul ${product.name} a fost actualizat!`,
        duration: 3000,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "A aparut o eroare la actualizarea produsului.",
        duration: 3000,
      });
    },
  });

  useEffect(() => {
    // Reset the form with the updated product values
    reset({
      name: product.name,
      sku: product.sku,
      price: product.price,
      stock: product.stock,
      slug: product.slug,
      mainImage: mainImage,
      gallery: gallery,
      description: product.description,
      categoryId: product.categoryId,
      subcategoryId: product.subcategoryId,
      attributes: product.attributes,
    });

    // Update state variables based on the product
    setSelectedMainCategory(productCategoryWithChildren);
    setSelectedChildCategory(product.subcategory ? product.subcategory : "");
    setSelectedAttributes(attributeReformatted);
    setMainImage(product.images.find((img) => img.isMain)?.image);
    setGallery(
      product.images
        .filter((img) => !img.isMain) // Filter for non-main images
        .map((img) => img.image)
    );
  }, [
    product,
    attributeReformatted,
    gallery,
    mainImage,
    productCategoryWithChildren,
    reset,
  ]); // Re-run the effect when the product changes

  const handleRemoveMainImage = () => {
    setMainImage(null);
  };

  const handleAddMainImage = (image) => {
    setMainImage(image);
  };

  const handleRemoveGalleryImage = (image) => {
    setGallery(gallery.filter((img) => img !== image));
  };

  const handleAddGalleryImage = (url) => {
    setGallery((prevGallery) => {
      const updatedGallery = [...prevGallery, url];
      return updatedGallery;
    });
  };

  // Add a new selected attribute
  const addSelectedAttribute = () => {
    setSelectedAttributes([
      ...selectedAttributes,
      {
        attributeId: product.attributes.attributeId,
        selectedValues: product.attributes.values,
      },
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
        <DialogTrigger className="text-2xl mr-2 text-emerald-600">
          <FaEdit />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1100px]">
          <DialogHeader>
            <DialogTitle>Create a Product</DialogTitle>
            <DialogDescription>
              Fill in the fields below. Click Save when you are done.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[500px] p-4">
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
                  mainImage: mainImage ? mainImage : "", // Ensure this is passed correctly
                  gallery: gallery, // Pass the gallery directly as an array
                  description: DOMPurify.sanitize(description), // Sanitize without stringifying
                  subcategoryId: selectedChildCategory
                    ? selectedChildCategory.id
                    : "", // Ensure this is null when no child is selected
                  id: product.id,
                });
              }}
              className="space-y-8"
            >
              <div className="grid grid-cols-4 gap-5">
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
                <div className="col-span-2 gap-5 grid grid-cols-2">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categorie Principala</FormLabel>
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
                                  : ""
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

                {/* Attribute Selection */}
                <FormField
                  control={form.control}
                  name="attributes"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex gap-5 items-start">
                        <FormLabel>Atribute</FormLabel>
                        {/* Add New Attribute */}
                        <p
                          onClick={addSelectedAttribute}
                          className="bg-black hover:cursor-pointer hover:bg-blue-500 text-sm text-white rounded-2xl text-center w-full py-2 px-4"
                        >
                          Adauga un atribut
                        </p>
                      </div>
                      <FormControl>
                        <>
                          {selectedAttributes.map((selectedAttr, index) => (
                            <div key={index} className="mb-4">
                              <div className="flex items-center gap-2">
                                {/* Select Attribute */}
                                <Select
                                  onValueChange={(value) => {
                                    handleAttributeSelection(index, value);
                                  }}
                                  value={selectedAttr.attributeId || ""}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Selecteaza atribut" />
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
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => removeSelectedAttribute(index)}
                                >
                                  <TrashIcon className="h-4 w-4" />
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
                      <DisplayValidationError
                        value={result.validationErrors?.attributes}
                      />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  className="row-start-2"
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
                      <FormLabel>Pret</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Price" {...field} />
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
                        <Input type="number" placeholder="Stock" {...field} />
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

              <div className="flex gap-5">
                <div>
                  <FormLabel className="mt-1 mr-5">
                    Imagine Principala
                  </FormLabel>
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
                    <Dialog>
                      <DialogTrigger>
                        <p className="bg-black hover:bg-blue-500 text-sm text-white rounded-2xl text-center w-full py-2 px-4">
                          Add Image
                        </p>
                      </DialogTrigger>
                      <DialogContent className="bg-white max-w-6xl">
                        <DialogHeader>
                          <DialogTitle>Images</DialogTitle>
                          <DialogDescription>
                            Select an image for the main image.
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
                    value={result.validationErrors?.mainImage}
                  />
                </div>

                <div>
                  <div className="flex gap-5 items-center">
                    <FormLabel>Galerie</FormLabel>
                    <Dialog>
                      <DialogTrigger>
                        <p className="bg-black hover:bg-blue-500 text-sm text-white rounded-2xl text-center w-full py-2 px-4">
                          Add Images
                        </p>
                      </DialogTrigger>
                      <DialogContent className="bg-white max-w-6xl">
                        <DialogHeader>
                          <DialogTitle>Images</DialogTitle>
                          <DialogDescription>
                            Select multiple images for the gallery.
                          </DialogDescription>
                          <MediaPopUp
                            images={images}
                            onImageSelect={handleAddGalleryImage}
                          />
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="grid grid-cols-4 gap-5">
                    {Array.isArray(gallery) && gallery.length > 0 ? (
                      gallery.map((image) => (
                        <div key={image.id} className="relative">
                          <Image
                            className="rounded-lg mt-3 w-40 h-40 border-2 border-gray-100 hover:border-gray-300"
                            src={image.url} // Access the url property here
                            alt={image.altText || "Imagine de galerie"} // Use altText if available
                            width={200}
                            height={200}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(image)} // Adjust if necessary
                            className="pr-4 pt-2 absolute right-0 top-0 text-red-500 text-2xl"
                          >
                            <RiDeleteBin5Fill />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p>Nu sunt imagini disponibile.</p> // Optional: Render a message if no images
                    )}
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
                  {isExecuting ? "Se editeaza..." : "Editeaza"}
                </Button>
              </DialogFooter>
            </form>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default EditProduct;
