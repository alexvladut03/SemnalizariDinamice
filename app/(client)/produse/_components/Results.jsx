export default function Results({ searchValue }) {
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
