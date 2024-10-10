import React from "react";

export default function CumCumpar() {
  return (
    <div className="max-w-7xl mx-auto py-10 space-y-8">
      <h1 className="text-4xl font-bold text-center">Cum cumpăr?</h1>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          1. Adăugarea produselor în coș
        </h2>
        <p>
          După ce ai găsit produsul dorit pe site, apasă pe butonul &quot;Adaugă
          în coș&quot; de pe pagina produsului. Poți adăuga mai multe produse,
          iar acestea vor apărea în coșul tău de cumpărături.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">2. Vizualizarea coșului</h2>
        <p>
          După ce ai adăugat toate produsele dorite, apasă pe iconița coșului de
          cumpărături din partea de sus a paginii pentru a vizualiza detaliile
          coșului tău. Aici vei vedea lista produselor selectate și prețul
          total.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          3. Completarea datelor de livrare
        </h2>
        <p>
          După ce ai verificat coșul, apasă pe &quot;Vezi detaliile
          coșului&quot; și vei fi redirecționat către pagina de finalizare a
          comenzii. Completează cu atenție informațiile tale de livrare: nume,
          prenume, adresă, număr de telefon și alte detalii relevante.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">4. Finalizarea comenzii</h2>
        <p>
          După ce ai completat toate informațiile necesare, apasă pe
          &quot;Finalizează comanda&quot;. Comanda ta va fi procesată, iar un
          reprezentant te va contacta pentru confirmarea detaliilor și a
          livrării.
        </p>
      </div>
    </div>
  );
}
