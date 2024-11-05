"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import addImage from "@/utils/actions/images/add-image";
import { useDropzone } from "react-dropzone";
import { useAction } from "next-safe-action/hooks";
import { toast } from "@/components/ui/use-toast";
import { ArrowUp, Loader2 } from "lucide-react";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DisplayValidationError } from "@/components/custom ui/display-validation-error";

export const AddImage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [rejected, setRejected] = useState([]);

  const { execute, result, isExecuting } = useAction(addImage, {
    onSuccess: ({ data }) => {
      setIsOpen(false);
      setFiles([]);
      toast({
        variant: "default",
        title: "Success",
        description: `Imaginea a fost adaugata cu succes!`,
        duration: 3000,
      });
    },
    onError: ({ error }) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.serverError,
        duration: 3000,
      });
    },
  });

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name) => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    execute(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="p-2 w-48 text-lg font-semibold bg-gray-400 rounded-lg border-2 hover:border-black">
        Adaugă o imagine
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Adaugă o imagine</DialogTitle>
          <DialogDescription>
            Aici poți să încarci imaginile produselor.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div
            {...getRootProps({
              className: `py-16 border-2 border-dashed rounded-lg flex items-center justify-center gap-4 ${
                isDragActive ? "border-secondary-400" : "border-neutral-300"
              }`,
            })}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-4">
              <ArrowUp className="w-5 h-5 fill-current" />
              {isDragActive ? (
                <p>Se incarca...</p>
              ) : (
                <p>Poti sa dai click sau &quot;drag & drop&quot; aici</p>
              )}
            </div>
          </div>

          {/* Preview */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Previzualizare</h2>
              <div className="flex gap-3">
                <Button type="button" onClick={removeAll}>
                  Sterge toate imaginile
                </Button>
                {isExecuting ? (
                  <Button type="submit" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se incarca..
                  </Button>
                ) : (
                  <Button type="submit">Incarca imaginile</Button>
                )}
              </div>
            </div>

            {/* Accepted files */}
            <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
              Fisiere acceptate
            </h3>
            <ul className="mt-6 grid grid-cols-3 gap-10">
              {files.map((file) => (
                <li
                  key={file.name}
                  className="relative h-32 rounded-md shadow-lg"
                >
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={100}
                    height={100}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                    className="h-full w-full object-contain rounded-md"
                  />
                  <button
                    type="button"
                    className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                    onClick={() => removeFile(file.name)}
                  >
                    <FaXmark className="w-5 h-5 text-red-600 hover:text-red-300 transition-colors" />
                  </button>
                  <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                    {file.name}
                  </p>
                </li>
              ))}
            </ul>

            {/* Validation Errors */}
            <DisplayValidationError value={result.validationErrors?.files} />

            {/* Rejected Files */}
            <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
              Fisiere respinse
            </h3>
            <ul className="mt-6 flex flex-col">
              {rejected.map(({ file, errors }) => (
                <li
                  key={file.name}
                  className="flex items-start justify-between"
                >
                  <div>
                    <p className="mt-2 text-neutral-500 text-sm font-medium">
                      {file.name}
                    </p>
                    <ul className="text-[12px] text-red-400">
                      {errors.map((error) => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                    onClick={() => removeRejected(file.name)}
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </form>
      </DialogContent>
    </Dialog>
  );
};
