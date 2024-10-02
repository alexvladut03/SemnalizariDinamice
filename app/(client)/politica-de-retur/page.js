import React from "react";

export default function page() {
  return (
    <div className="max-w-7xl mx-auto py-10 space-y-8">
      <h1 className="text-4xl font-bold text-center">Politica de Retur</h1>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">1. Condiții de retur</h2>
        <p>
          Cumpărătorul poate solicita returnarea produselor în următoarele
          situații:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Coletele prezintă deteriorări severe;</li>
          <li>Produsele au fost livrate sau facturate greșit;</li>
          <li>Produsele prezintă defecte de fabricație.</li>
        </ul>
        <p>
          Cumpărătorul are dreptul să notifice în scris Vânzătorului că renunță
          la cumpărare fără penalități și fără invocarea unui motiv în termen de
          14 zile de la primirea produsului.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          2. Produse neeligibile pentru retur
        </h2>
        <p>
          Produsele personalizate nu pot fi returnate. Vă rugăm să aveți în
          vedere că aceste produse sunt create după configurațiile specificate
          de dumneavoastră, deci nu pot fi schimbate sau returnate.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">3. Procedura de returnare</h2>
        <p>
          Produsele trebuie să fie returnate în ambalajul original, cu factura
          atașată, și să nu prezinte urme de uzură fizică sau deteriorare.
          Pentru a returna un produs, contactați-ne la adresa de e-mail
          contact@semnalizari-dinamice.ro pentru instrucțiuni detaliate despre
          procesul de retur.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">4. Rambursare</h2>
        <p>
          În cazul exercitării dreptului legal de returnare a produsului,
          rambursarea contravalorii acestuia se va face prin virament bancar în
          contul indicat de Cumpărător în cel mult 14 zile de la primirea
          produsului returnat.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">5. Alte detalii</h2>
        <p>
          În cazul în care produsele a căror returnare se solicită prezintă
          ambalaje deteriorate, urme de uzură, zgârieturi sau lovituri, ne
          rezervăm dreptul de a decide acceptarea returului sau de a opri o sumă
          din valoarea returnată, în funcție de evaluarea prejudiciilor aduse.
        </p>
      </div>
    </div>
  );
}
