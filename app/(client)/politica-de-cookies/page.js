import React from "react";

export default function page() {
  return (
    <div className="max-w-7xl mx-auto py-10 space-y-8">
      <h1 className="text-4xl font-bold text-center">Politica de Cookies</h1>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">1. Ce este un cookie?</h2>
        <p>
          Un cookie este un fișier text care conține mici fragmente de
          informații trimise navigatorului tău și memorate în computerul,
          telefonul tău mobil sau alt dispozitiv atunci când vizitezi un site.
          Acest fișier cookie trimite informații înapoi către site ori de câte
          ori îl revizitezi.
        </p>
        <p>
          Cookie-urile pot fi permanente (cunoscute drept cookie-uri
          persistente), care rămân în computerul tău până când le ștergi, sau
          temporare (cunoscute drept cookie-uri pentru sesiune), care sunt
          valabile doar până când închizi fereastra navigatorului tău.
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          2. Cum utilizează semnalizari-dinamice.ro cookie-urile?
        </h2>
        <p>
          Utilizăm cookie-urile pentru a îmbunătăți funcționalitatea site-urilor
          noastre, pentru a te ajuta să navighezi mai eficient de la o pagină la
          alta, pentru a memora preferințele tale și în general pentru a
          îmbunătăți experiența utilizatorilor.
        </p>
        <p>
          Cookie-urile pe care le folosim pe site-urile noastre pot fi din
          următoarele categorii:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Cookie-uri strict necesare:</strong> Aceste cookie-uri sunt
            esențiale pentru ca tu să poți naviga pe site și să folosești
            serviciile pe care le-ai solicitat.
          </li>
          <li>
            <strong>Cookie-uri pentru performanță:</strong> Aceste cookie-uri
            colectează informații despre cum utilizează vizitatorii un site, de
            exemplu, care sunt paginile cele mai vizitate.
          </li>
          <li>
            <strong>Cookie-uri pentru funcționalitate:</strong> Aceste
            cookie-uri permit unui site să memoreze lucrurile alese de tine (cum
            ar fi numele de utilizator sau limba) și oferă opțiuni mai
            personale.
          </li>
          <li>
            <strong>Cookie-uri pentru publicitate:</strong> Aceste cookie-uri
            sunt utilizate pentru a limita de câte ori vezi o reclamă, precum și
            pentru a măsura impactul campaniilor publicitare.
          </li>
        </ul>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          3. Cum să administrezi & ștergi cookie-uri
        </h2>
        <p>
          Dacă vrei să impui restricții, să blochezi sau să ștergi fișiere
          cookie, poți s-o faci modificând setările navigatorului tău de web.
          Utilizarea semnalizari-dinamice.ro fără respingerea cookie-urilor sau
          a tehnologiilor similare denotă consimțământul vizitatorilor pentru
          utilizarea de către noi a unor astfel de tehnologii și pentru
          prelucrarea informațiilor.
        </p>
      </div>
    </div>
  );
}
