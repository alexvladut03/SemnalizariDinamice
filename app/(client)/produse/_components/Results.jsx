import { useSearchParams } from "next/navigation";

export default function Results() {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get("search") || "";

  return (
    <div className="flex">
      <div className="text-2xl font-semibold">
        {searchValue
          ? `Rezultatele căutării: ${searchValue}`
          : "Produsele noastre"}
      </div>
    </div>
  );
}
