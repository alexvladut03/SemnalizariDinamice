const products = [
  {
    id: "capace-audi-negre-60mm",
    category: "Capace-Audi",
    name: "Capace Audi Negre 60mm",
    price: "80 RON",
    stock: 10,
    imageSrc: "/img/CapaceNegreMiciAudi.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
    ],
    description:
      "Aceste capace centrale pentru roți sunt proiectate pentru a adăuga un aspect modern și sofisticat vehiculului tău Audi. Fiecare set include patru capace de roți, fabricate din materiale de înaltă calitate pentru a garanta durabilitatea și rezistența la intemperii.",
    fitment:
      "Capacele se potrivesc in mod alternativ oricarui model Audi cu diametrul de 60 mm",
    characteristics: [
      "Set: 4 capace",
      "Model auto: Audi",
      "Material: ABS",
      "Culoare: negru/crom",
      "Rezistenta la radiatii UV si agenti chimici",
      "Dimensiuni: 60mm",
    ],
  },
  {
    id: "capace-audi-negre-stea",
    category: "Capace-Audi",
    name: "Capace Audi Negre Tip Stea 135mm",
    price: "100 RON",
    stock: 5,
    imageSrc: "/img/CapaceNegreAudi.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste capace centrale pentru roți sunt proiectate pentru a adăuga un aspect modern și sofisticat vehiculului tău Audi. Fiecare set include patru capace de roți, fabricate din materiale de înaltă calitate pentru a garanta durabilitatea și rezistența la intemperii.",
    fitment: "Compatibile cu jante Audi OEM",
    characteristics: [
      "Diametru exterior 135 MM",
      "Material: Plastic ABS",
      "Impermeabile: 100%",
      "Culoare: Negru",
      "Rezistent la radiatiile UV si agenti chimici",
      "Pretul afisat este pentru set 4 bucati",
    ],
  },
  {
    id: "capace-audi-gri-stea",
    category: "Capace-Audi",
    name: "Capace Audi Gri Tip Stea 135mm",
    price: "100 RON",
    stock: 3,
    imageSrc: "/img/CapaceGriAudi.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste capace centrale pentru roți sunt proiectate pentru a adăuga un aspect modern și sofisticat vehiculului tău Audi. Fiecare set include patru capace de roți, fabricate din materiale de înaltă calitate pentru a garanta durabilitatea și rezistența la intemperii.",
    fitment: "Compatibile cu jante Audi de tip stea",
    characteristics: [
      "Diametru exterior 135 MM",
      "Material: Plastic ABS",
      "Impermeabile: 100%",
      "Culoare: Gri",
      "Rezistent la radiatiile UV si agenti chimici",
      "Pretul afisat este pentru set 4 bucati",
    ],
  },
  {
    id: "semnalizari-dinamice-audi-b8-5",
    name: "Semnalizari Dinamice Audi B8.5",
    price: "150 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.5.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste semnalizări dinamice sunt concepute pentru a oferi un aspect modern și elegant vehiculului tău Audi. Setul include două bucăți (stânga și dreapta) și este prevăzut cu un design aerodinamic, adaptându-se perfect caroseriei mașinii tale.",
    fitment: `
      <ul>
        <li>Audi A4 B8.5 (2011—2016)</li>
        <li>Audi A5 B8.5 (2010—2016)</li>
        <li>Audi S5 2010-2016</li>
        <li>Audi A3 8P B8.5 (2010-2013)</li>
        <li>Audi RS3 2012</li>
        <li>Audi RS4 2013 2014</li>
        <li>Audi RS5 2011-2016</li>
      </ul>`,
    characteristics: [
      "Culoarea luminii: Galben",
      "Efect vizual: Flux de apă",
      "Instalare: Înlocuire directă",
      "Impermeabile: 100%",
      "Nu este necesara codificarea",
      "Cu suprafata mata rezistenta la zgarieturi",
      "X2 bucati semnalizare stanga/dreapta",
    ],
  },
  {
    id: "semnalizari-dinamice-audi-b8",
    name: "Semnalizari Dinamice Audi B8",
    price: "150 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste semnalizări dinamice sunt concepute pentru a oferi un aspect modern și elegant vehiculului tău Audi. Setul include două bucăți (stânga și dreapta) și este prevăzut cu un design aerodinamic, adaptându-se perfect caroseriei mașinii tale.",
    fitment: [
      "A4 / S4 2008-2009 B8",
      "A5 / S5 2007-2009 B8",
      "A6 / S6 2008-2011 C6 ",
      "A8 / S8 2008-2010 D3",
      "Q3 / SQ3 2012-2015",
      "A3 8P 2008-2010 ",
    ],
    characteristics: [
      "Culoarea luminii: Galben",
      "Efect vizual: Flux de apă",
      "Instalare: Înlocuire directă",
      "Impermeabile: 100%",
      "Nu este necesara codificarea",
      "Cu suprafata mata rezistenta la zgarieturi",
      "X2 bucati semnalizare stanga/dreapta",
    ],
  },
  {
    id: "semnalizari-dinamice-audi-c7",
    name: "Semnalizari dinamice Audi C7",
    price: "100 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.5.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste semnalizări dinamice sunt concepute pentru a oferi un aspect modern și elegant vehiculului tău. Setul include două bucăți (stânga și dreapta) și este prevăzut cu un design aerodinamic, adaptându-se perfect caroseriei mașinii tale.",
    fitment: ["A6 C7 2011-2015", "A6 C7.5 Facelift 2015-2018"],
    characteristics: [
      "Culoarea luminii: Galben",
      "Efect vizual: Flux de apă",
      "Instalare: Înlocuire directă",
      "Impermeabile: 100%",
      "Nu este necesara codificarea",
      "Cu suprafata mata rezistenta la zgarieturi",
      "X2 bucati semnalizare stanga/dreapta",
      "Nu dau eroare de bec ars (Canbus)",
      "Durata de viata: 50000 ore",
    ],
  },
  {
    id: "emblema-spate-audi-192mm",
    name: "Emblema spate 192mm",
    price: "100 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.5.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste embleme de spate sunt concepute pentru a oferi un aspect modern și elegant vehiculului tău. Emblemele full negre sunt ideale pentru cei care doresc să aducă un plus de rafinament și personalitate mașinii lor.",
    fitment:
      "Compatibile cu modelele Audi cu dimensiunea emblemei spate de 192mm",
    characteristics: [
      "Diametru: 192mm",
      "Culoare: Negru",
      "Material: ABS+Aluminiu",
    ],
  },
  {
    id: "emblema-audi-fata-273mm",
    name: "Emblema Audi fata 273mm",
    price: "100 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.5.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste embleme de fata sunt concepute pentru a oferi un aspect modern și elegant vehiculului tău Audi. Emblemele full negre sunt ideale pentru cei care doresc să aducă un plus de rafinament și personalitate mașinii lor.",
    fitment:
      "Compatibile cu modelele Audi cu dimensiunea emblemei față de 273mm",
    characteristics: [
      "Diametru: 273mm",
      "Culoare: Negru",
      "Material: ABS+Aluminiu",
    ],
  },
  {
    id: "capace-audi-rotunde-black-rama-argintie-61mm",
    category: "Capace-Audi",
    name: "Capace Audi rotunde Black cu rama argintie 61mm",
    price: "100 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.5.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste capace centrale pentru roți sunt proiectate pentru a adăuga un aspect modern și sofisticat vehiculului tău Audi. Fiecare set include patru capace de roți, fabricate din materiale de înaltă calitate pentru a garanta durabilitatea și rezistența la intemperii.",
    fitment: "Compatibile cu jante Audi de 61mm",
    characteristics: [
      "Diametru: 61mm",
      "Material: ABS+Aluminiu",
      "Culoare: Negru cu rama argintie",
      "Impermeabile: 100%",
    ],
  },
  {
    id: "capace-audi-gri-60mm",
    category: "Capace-Audi",
    name: "Capace Audi gri 60mm",
    price: "100 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.5.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste capace centrale pentru roți sunt proiectate pentru a adăuga un aspect modern și sofisticat vehiculului tău Audi. Fiecare set include patru capace de roți, fabricate din materiale de înaltă calitate pentru a garanta durabilitatea și rezistența la intemperii.",
    fitment: "Compatibile cu jante Audi de 60mm",
    characteristics: [
      "Diametru: 60mm",
      "Material: ABS+Aluminiu",
      "Culoare: Gri",
      "Impermeabile: 100%",
    ],
  },
  {
    id: "prosop-audi-l",
    name: "Prosop Audi L",
    price: "100 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.5.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Prosop Audi de dimensiune L. Material de calitate superioară, absorbție excelentă.",
    fitment: "Universal",
    characteristics: [
      "Dimensiune: L",
      "Material: Calitate superioară",
      "Absorbție: Excelentă",
    ],
  },
  {
    id: "semnalizari-dinamice-bmw-f10",
    name: "Semnalizari dinamice BMW F10",
    price: "100 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.5.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste semnalizări dinamice sunt concepute pentru a oferi un aspect modern și elegant vehiculului tău BMW. Setul include două bucăți (stânga și dreapta) și este prevăzut cu un design aerodinamic, adaptându-se perfect caroseriei mașinii tale.",
    fitment: "Compatibile cu BMW F10",
    characteristics: [
      "Culoarea luminii: Galben",
      "Efect vizual: Flux de apă",
      "Instalare: Înlocuire directă",
      "Impermeabile: 100%",
    ],
  },
  {
    id: "semnalizari-dinamice-bmw-f30",
    name: "Semnalizari dinamice BMW F30",
    price: "100 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.5.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste semnalizări dinamice sunt concepute pentru a oferi un aspect modern și elegant vehiculului tău BMW. Setul include două bucăți (stânga și dreapta) și este prevăzut cu un design aerodinamic, adaptându-se perfect caroseriei mașinii tale.",
    fitment: "Compatibile cu BMW F30",
    characteristics: [
      "Culoarea luminii: Galben",
      "Efect vizual: Flux de apă",
      "Instalare: Înlocuire directă",
      "Impermeabile: 100%",
    ],
  },
  {
    id: "semnalizari-dinamice-golf-5",
    name: "Semnalizari dinamice Golf 5",
    price: "100 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.5.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste semnalizări dinamice sunt concepute pentru a oferi un aspect modern și elegant vehiculului GOLF-ul  tau. Setul include două bucăți (stânga și dreapta) și este prevăzut cu un design aerodinamic, adaptându-se perfect caroseriei mașinii tale.",
    fitment: "Compatibile cu Golf 5",
    characteristics: [
      "Culoarea luminii: Galben",
      "Efect vizual: Flux de apă",
      "Instalare: Înlocuire directă",
      "Impermeabile: 100%",
    ],
  },
  {
    id: "semnalizari-dinamice-golf-7",
    name: "Semnalizari dinamice Golf 7",
    price: "100 RON",
    stock: 5,
    imageSrc: "/img/SemnalizariDinamiceB8.5.webp",
    gallery: [
      "/img/CapaceNegreMiciAudi.webp",
      "/img/CapaceNegreAudi.webp",
      "/img/CapaceGriAudi.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
      "/img/SemnalizariDinamiceB8.5.webp",
    ],
    description:
      "Aceste semnalizări dinamice sunt concepute pentru a oferi un aspect modern și elegant vehiculului GOLF-ul  tau. Setul include două bucăți (stânga și dreapta) și este prevăzut cu un design aerodinamic, adaptându-se perfect caroseriei mașinii tale.",
    fitment: "Compatibile cu Golf 7",
    characteristics: [
      "Culoarea luminii: Galben",
      "Efect vizual: Flux de apă",
      "Instalare: Înlocuire directă",
      "Impermeabile: 100%",
    ],
  },
];

export default products;
