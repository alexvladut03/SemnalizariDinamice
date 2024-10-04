import React from "react";

export default function page() {
  return (
    <div className="max-w-7xl lg:mx-auto py-10 space-y-8 mx-6">
      <h1 className="text-4xl font-bold text-center">Garanție</h1>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          1. Durata și acoperirea garanției
        </h2>
        <p>
          Produsele vândute pe site-ul semnalizari-dinamice.ro beneficiază de o
          garanție legală de conformitate, conform legislației în vigoare.
          Garanția acoperă defectele de fabricație ale produselor
          comercializate.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">2. Excluderi</h2>
        <p>
          Nu sunt acoperite de garanție defecțiunile cauzate de utilizarea
          necorespunzătoare, manipularea neautorizată, modificări aduse
          produselor sau deteriorările cauzate de factori externi, precum șocuri
          mecanice sau expunerea la condiții extreme.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">3. Procesul de reclamație</h2>
        <p>
          Pentru a face o reclamație în cadrul garanției, cumpărătorul trebuie
          să ne contacteze la adresa de e-mail contact@semnalizari-dinamice.ro
          și să furnizeze detalii despre problema întâmpinată, împreună cu
          dovada achiziției și fotografii ale produsului defect.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">4. Soluții oferite</h2>
        <p>
          În cazul în care produsul este considerat defect în perioada de
          garanție, semnalizari-dinamice.ro va oferi următoarele soluții:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Repararea produsului</strong>
          </li>
          <li>
            <strong>
              Înlocuirea produsului cu unul similar sau echivalent
            </strong>
          </li>
          <li>
            <strong>
              Rambursarea contravalorii produsului în cazul în care repararea
              sau înlocuirea nu este posibilă.
            </strong>
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">5. Cheltuieli de transport</h2>
        <p>
          Costurile de transport pentru returnarea produselor defecte vor fi
          suportate de către <strong>semnalizari-dinamice.ro</strong>, în cazul
          în care reclamația este justificată și produsul intră în garanție.
        </p>
      </div>
    </div>
  );
}
