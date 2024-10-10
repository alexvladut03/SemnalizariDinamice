import React from "react";

export default function page() {
  return (
    <div className="max-w-7xl mx-auto py-10 space-y-8">
      <h1 className="text-4xl font-bold text-center">Cum se livrează?</h1>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">1. Metode de livrare</h2>
        <p>
          Livrarea produselor comandate pe site-ul nostru se face prin
          intermediul partenerilor noștri de încredere:
        </p>
        <ul className="list-disc ml-6">
          <li>SameDay</li>
          <li>FanCourier</li>
        </ul>
        <p>
          În funcție de disponibilitatea acestor servicii și de locația ta, vei
          putea alege metoda de livrare dorită în momentul plasării comenzii.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          2. Timpul estimativ de livrare
        </h2>
        <p>
          În general, livrarea se face în termen de 1-3 zile lucrătoare, în
          funcție de locația ta și de disponibilitatea produselor. În anumite
          cazuri, timpul de livrare poate fi extins, dar vei fi notificat de
          fiecare dată prin e-mail sau telefon.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">3. Costul transportului</h2>
        <p>
          Costul transportului variază în funcție de metoda de livrare și
          locație:
        </p>
        <ul className="list-disc ml-6">
          <li>SameDay: 20 RON</li>
          <li>FanCourier: 25 RON</li>
        </ul>
        <p>
          Aceste tarife sunt valabile pentru comenzile plasate în rețeaua de
          acoperire a curierilor. Pentru livrările în afara ariei de acoperire,
          poate exista un cost suplimentar, care îți va fi comunicat înainte de
          expedierea comenzii.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">4. Transport gratuit</h2>
        <p>
          Beneficiezi de transport gratuit pentru toate comenzile care depășesc
          suma de 300 RON. Dacă valoarea coșului tău este sub această sumă, se
          aplică tarifele de transport menționate mai sus.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          5. Confirmare și urmărirea comenzii
        </h2>
        <p>
          După ce comanda ta este expediată, vei primi un e-mail cu un număr de
          urmărire, care îți va permite să vezi statusul livrării în timp real
          pe site-ul curierului ales.
        </p>
      </div>
    </div>
  );
}
