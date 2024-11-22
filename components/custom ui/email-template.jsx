import React from "react";

export const EmailTemplate = ({ order }) => {
  const {
    shippingFirstName,
    shippingLastName,
    shippingEmail,
    totalCost,
    products,
    shippingStreet,
    shippingLocality,
    shippingCounty,
    shippingZipCode,
  } = order;

  return (
    <div className="font-sans text-gray-800 p-6 bg-gray-100 rounded-md">
      <h1 className="text-2xl font-bold text-green-600 mb-4">
        Mulțumim pentru comandă, {shippingFirstName}!
      </h1>
      <p className="mb-2">
        Bună {shippingFirstName} {shippingLastName},
      </p>
      <p className="mb-4">
        Suntem bucuroși să vă informăm că comanda dumneavoastră este în
        procesare. Mai jos găsiți detaliile comenzii:
      </p>
      <h2 className="text-xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">
        Rezumat comandă
      </h2>
      <p className="mb-4">
        <span className="font-semibold">Cost total:</span> {totalCost} RON
      </p>
      <h3 className="text-lg font-semibold mb-2">Adresa de livrare</h3>
      <p className="mb-4">
        {shippingStreet}, {shippingLocality}, {shippingCounty},{" "}
        {shippingZipCode}
      </p>
      <h3 className="text-lg font-semibold mb-2">Produse comandate</h3>
      <ul className="list-disc list-inside mb-4">
        {products.map((product, index) => (
          <li key={index} className="mb-1">
            <span className="font-semibold">Nume Produs:</span> {product.name} -{" "}
            <span className="font-semibold">Cantitate:</span> {product.quantity}{" "}
            - <span className="font-semibold">Preț:</span> {product.price} RON
          </li>
        ))}
      </ul>
      <p className="mb-4">
        Dacă aveți întrebări despre comandă, ne puteți contacta la{" "}
        <a href={`mailto:${shippingEmail}`} className="text-blue-500 underline">
          {shippingEmail}
        </a>
        .
      </p>
      <p className="mt-6">Vă mulțumim că ați ales serviciile noastre!</p>
      <footer className="mt-10 text-sm text-gray-500">
        Acest email este generat automat. Vă rugăm să nu răspundeți.
      </footer>
    </div>
  );
};
