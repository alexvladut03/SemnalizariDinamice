import React from "react";

export default function page() {
  return (
    <div className="max-w-7xl mx-auto py-10 space-y-8">
      <h1 className="text-4xl font-bold text-center">Cum plătesc?</h1>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">1. Plata ramburs</h2>
        <p>
          Poți opta pentru plata ramburs, ceea ce înseamnă că vei achita
          contravaloarea comenzii tale direct curierului în momentul în care
          primești produsele. Această metodă este simplă și sigură, fără a fi
          nevoie să introduci detaliile bancare online.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">2. Plata cu cardul bancar</h2>
        <p>
          Dacă dorești să achiți comanda cu cardul, vei fi redirecționat către o
          pagină securizată unde va trebui să introduci următoarele informații:
        </p>
        <ul className="list-disc ml-6">
          <li>Numele complet de pe card</li>
          <li>Numărul cardului</li>
          <li>Data de expirare (luna/anul)</li>
          <li>Codul CVV (ultimele 3 cifre de pe spatele cardului)</li>
        </ul>
        <p>
          După ce ai completat toate aceste date, apasă pe &quot;Plătește&quot;
          pentru a finaliza comanda. Plata ta va fi procesată în siguranță prin
          intermediul unei platforme de plată securizată, iar datele tale vor fi
          protejate.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">3. Confirmarea plății</h2>
        <p>
          După finalizarea plății, vei primi un e-mail de confirmare a comenzii,
          împreună cu detalii despre livrarea produselor tale.
        </p>
      </div>
    </div>
  );
}
