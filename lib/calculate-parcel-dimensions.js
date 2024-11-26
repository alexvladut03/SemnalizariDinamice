export function calculateParcelDimensions(products) {
  if (!Array.isArray(products) || products.length === 0) {
    throw new Error("Trebuie să existe cel puțin un produs.");
  }

  let maxLength = 0; // Lungimea maximă dintre produse
  let maxWidth = 0; // Lățimea maximă dintre produse
  let totalHeight = 0; // Înălțimea totală (produsele stivuite)

  products.forEach((product) => {
    const { count, length, width, height } = product;

    // Verifică dacă dimensiunile produsului sunt valide
    if (!length || !width || !height || !count) {
      throw new Error(
        "Produsele trebuie să aibă dimensiuni și o cantitate valide."
      );
    }

    // Lungimea și lățimea coletului vor fi cele mai mari dintre toate produsele
    maxLength = Math.max(maxLength, length);
    maxWidth = Math.max(maxWidth, width);

    // Înălțimea totală este suma înălțimilor fiecărui produs, ținând cont de cantitate
    totalHeight += count * height;
  });

  return {
    length: maxLength,
    width: maxWidth,
    height: totalHeight,
  };
}
