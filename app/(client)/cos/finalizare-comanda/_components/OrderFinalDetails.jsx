"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { validateUserFanSchema } from "@/utils/zod";

export default function OrderFinalDetails() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validateUserFanSchema),
    defaultValues: {
      name: "",
      contactPerson: "",
      phone: "",
      county: "",
      locality: "",
      street: "",
    },
  });
  console.log(errors);
  const [isDeliveryCourier, setIsDeliveryCourier] = useState(true);
  const [isDeliveryPersonal, setIsDeliveryPersonal] = useState(false);
  const [counties, setCounties] = useState([]);
  const [localities, setLocalities] = useState([]);

  const handleCountyChange = (value) => {
    setValue("county", value, { shouldValidate: true });
    fetchLocalities(value);
  };

  const handleLocalityChange = (value) => {
    setValue("locality", value, { shouldValidate: true });
  };

  useEffect(() => {
    fetch("https://api.fancourier.ro/reports/counties")
      .then((res) => res.json())
      .then((data) => {
        setCounties(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching counties:", error);
      });
  }, []);

  const fetchLocalities = (county) => {
    fetch(`https://api.fancourier.ro/reports/localities?county=${county}`)
      .then((res) => res.json())
      .then((data) => {
        setLocalities(data.data || []);
      })
      .catch((error) => {
        console.error("Error fetching localities:", error);
      });
  };

  const onSubmit = async (clientData) => {
    try {
      // Trimitere date către backend
      const response = await fetch("/api/fanCourier/createAWB", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientData }),
      });

      if (!response.ok) {
        // Dacă validarea eșuează pe backend, afișează răspunsul
        const errorData = await response.json();
        console.log("Erorile de validare de pe backend:", errorData.errors);
      } else {
        const data = await response.json();
        console.log("Răspunsul de la Fan Courier:", data);
      }
    } catch (error) {
      console.error("Eroare la trimiterea comenzii:", error);
    }
  };

  const handleDeliveryCourier = () => {
    setIsDeliveryCourier(true);
    setIsDeliveryPersonal(false);
  };

  const handleDeliveryPersonal = () => {
    setIsDeliveryCourier(false);
    setIsDeliveryPersonal(true);
  };

  return (
    <div className="pb-6 bg-gray-100">
      <div className="bg-white rounded-lg shadow-sm shadow-amber-500 p-6">
        <div className="flex text-xl font-medium pb-4">
          <div className="bg-amber-500 w-7 h-full rounded-full flex justify-center items-center text-white">
            1
          </div>
          <div className="pl-4">Modalitate livrare</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6 font-medium">
          <button
            onClick={handleDeliveryCourier}
            className={`lg:p-4 p-2 border rounded-lg text-center ${
              isDeliveryCourier ? "bg-amber-500 border-black" : ""
            }`}
          >
            Livrare la domiciliu
          </button>

          <button
            onClick={handleDeliveryPersonal}
            className={`lg:p-4 p-2 border rounded-lg text-center ${
              isDeliveryPersonal ? "bg-amber-500 border-black" : ""
            }`}
          >
            Livrare la EasyBox
          </button>
        </div>

        {isDeliveryCourier && (
          <div className="p-4 rounded-lg">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-4 lg:space-y-0"
            >
              <div className="col-span-2 font-medium">Persoana de contact</div>
              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Nume si Prenume
                </label>
                <Input
                  {...register("name")}
                  {...register("contactPerson")}
                  placeholder="Nume si prenume"
                />
                <div className="text-red-500 text-sm ml-1">
                  {errors.name?.message}
                </div>
              </div>
              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Telefon
                </label>
                <Input
                  {...register("phone")}
                  placeholder="Numarul tau de telefon"
                />
                <div className="text-red-500 text-sm ml-1">
                  {errors.phone?.message}
                </div>
              </div>

              <div className="col-span-2 font-medium">Adresa de livrare</div>
              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Judet
                </label>
                <Select onValueChange={handleCountyChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selectează județul" />
                  </SelectTrigger>
                  <SelectContent>
                    {counties.map((county) => (
                      <SelectItem key={county.id} value={county.name}>
                        {county.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-red-500 text-sm ml-1">
                  {errors.county?.message}
                </div>
              </div>

              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Localitate
                </label>
                <Select onValueChange={handleLocalityChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selectează localitatea" />
                  </SelectTrigger>
                  <SelectContent>
                    {localities.length > 0 ? (
                      localities.map((locality) => (
                        <SelectItem key={locality.id} value={locality.name}>
                          {locality.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem
                        key="no-locality"
                        value="no-locality"
                        disabled
                      >
                        Alege mai intai judetul
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <div className="text-red-500 text-sm ml-1">
                  {errors.locality?.message}
                </div>
              </div>

              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Strada
                </label>
                <Input {...register("street")} placeholder="Strada" />
                <div className="text-red-500 text-sm ml-1">
                  {errors.street?.message}
                </div>
              </div>
              <div>
                <label className="ml-1 text-sm font-medium text-gray-700">
                  Numar
                </label>
                <Input {...register("streetNo")} placeholder="Numar" />
              </div>

              <div className="col-span-2 font-medium mt-4">
                Detalii Adresă (Opțional)
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Cod Postal (Opțional)
                  </label>
                  <Input {...register("zipCode")} placeholder="Cod Postal" />
                </div>
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Email (Opțional)
                  </label>
                  <Input {...register("email")} placeholder="Email" />
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-4 gap-4">
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Bloc (Opțional)
                  </label>
                  <Input {...register("building")} placeholder="Bloc" />
                </div>
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Scara (Opțional)
                  </label>
                  <Input {...register("entrance")} placeholder="Scara" />
                </div>
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Etaj (Opțional)
                  </label>
                  <Input {...register("floor")} placeholder="Etaj" />
                </div>
                <div>
                  <label className="ml-1 text-sm font-medium text-gray-700">
                    Apartament (Opțional)
                  </label>
                  <Input {...register("apartment")} placeholder="Apartament" />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 p-2 bg-amber-500 text-white rounded-lg"
              >
                Trimite Comanda
              </button>
            </form>
          </div>
        )}
        {isDeliveryPersonal && (
          <div className="p-4 bg-gray-50 rounded-lg">
            Detalii ridicare persoana
          </div>
        )}
      </div>
    </div>
  );
}
