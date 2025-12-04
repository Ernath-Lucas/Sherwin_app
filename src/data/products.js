export const products = [
  {
    id: 1,
    reference: "1-405",
    name: "ProMar 200 Interior Latex",
    nameEn: "ProMar 200 Interior Latex",
    nameFr: "ProMar 200 Latex Intérieur",
    size: "1L",
    price: 11.30,
    allowedQuantities: [10, 30, 50, 60],
    relatedProducts: ["8-814", "8-810"]
  },
  {
    id: 2,
    reference: "1-335",
    name: "Duration Home Interior",
    nameEn: "Duration Home Interior",
    nameFr: "Duration Home Intérieur",
    size: "1L",
    price: 9.99,
    allowedQuantities: [5, 10, 15, 20],
    relatedProducts: ["C-658"]
  },
  {
    id: 3,
    reference: "SW7005",
    name: "Alabaster",
    nameEn: "Alabaster",
    nameFr: "Albâtre",
    color: "#F0EDE5",
    size: "1L",
    price: 11.99,
    allowedQuantities: [1, 5, 10, 20],
    relatedProducts: ["SW7006", "SW7008"]
  },
  {
    id: 4,
    reference: "C-658",
    name: "Emerald Urethane Trim Enamel",
    nameEn: "Emerald Urethane Trim Enamel",
    nameFr: "Émail Urethane Emerald",
    size: "1L",
    price: 11.99,
    allowedQuantities: [5, 10, 15, 20],
    relatedProducts: ["1-335"]
  },
  {
    id: 5,
    reference: "L-202",
    name: "SuperPaint Interior Acrylic",
    nameEn: "SuperPaint Interior Acrylic",
    nameFr: "SuperPaint Acrylique Intérieur",
    size: "1L",
    price: 11.99,
    allowedQuantities: [5, 10, 15, 20],
    relatedProducts: ["8-814"]
  },
  {
    id: 6,
    reference: "8-814",
    name: "Premium Wall & Wood Primer",
    nameEn: "Premium Wall & Wood Primer",
    nameFr: "Primaire Premium Mur & Bois",
    size: "1L",
    price: 8.99,
    allowedQuantities: [5, 10, 20, 30],
    relatedProducts: ["1-405", "L-202"]
  },
  {
    id: 7,
    reference: "8-810",
    name: "Multi-Purpose Latex Primer",
    nameEn: "Multi-Purpose Latex Primer",
    nameFr: "Primaire Latex Multi-Usage",
    size: "1L",
    price: 7.99,
    allowedQuantities: [10, 20, 30, 40],
    relatedProducts: ["1-405"]
  },
  {
    id: 8,
    reference: "SW7006",
    name: "Extra White",
    nameEn: "Extra White",
    nameFr: "Blanc Extra",
    color: "#FFFFFF",
    size: "1L",
    price: 10.99,
    allowedQuantities: [1, 5, 10, 20],
    relatedProducts: ["SW7005"]
  },
  {
    id: 9,
    reference: "SW7008",
    name: "Alabaster Light",
    nameEn: "Alabaster Light",
    nameFr: "Albâtre Clair",
    color: "#F5F2EA",
    size: "1L",
    price: 11.99,
    allowedQuantities: [1, 5, 10, 20],
    relatedProducts: ["SW7005", "SW7006"]
  }
];

export const getProductByReference = (ref) => {
  return products.find(p => 
    p.reference.toLowerCase() === ref.toLowerCase() ||
    p.reference.toLowerCase().includes(ref.toLowerCase()) ||
    p.name.toLowerCase().includes(ref.toLowerCase())
  );
};

export const searchProducts = (query) => {
  if (!query || query.trim() === '') return [];
  const searchTerm = query.toLowerCase().trim();
  return products.filter(p => 
    p.reference.toLowerCase().includes(searchTerm) ||
    p.name.toLowerCase().includes(searchTerm) ||
    p.nameEn.toLowerCase().includes(searchTerm) ||
    p.nameFr.toLowerCase().includes(searchTerm)
  );
};

export const getRelatedProducts = (references) => {
  return products.filter(p => references.includes(p.reference));
};
