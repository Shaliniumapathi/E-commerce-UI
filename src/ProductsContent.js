const dressProducts = [
  // ---------- YOUR ORIGINAL 5 (UNCHANGED) ----------
  {
    id: 1,
    title: "Kurti Dress",
    price: 1499,
    category: "Kurties",
    description: "Lightweight floral summer dress made with breathable fabric, perfect for casual outings.",
    images: [
      "/src/assets/Images/young-woman-beautiful-yellow-dress.jpg",
      "/src/assets/Images/young-dress-2.jpg"
    ]
  },
  {
    id: 2,
    title: "Floral Summer Dress",
    price: 3499,
    category: "Western Wear",
    description: "Elegant black evening gown designed for parties and special occasions.",
    images: [
      "/src/assets/Images/shopping1.webp",
      "/src/assets/Images/shopping2.webp"
    ]
  },
  {
    id: 3,
    title: "Floral Summer Dress",
    price: 999,
    category: "Western Wear",
    description: "Soft cotton casual shirt suitable for daily wear and office casual look.",
    images: [
      "/src/assets/Images/western-03.jpg",
      "/src/assets/Images/western-03.jpg"
    ]
  },
  {
    id: 4,
    title: "Kids Party Wear Dress",
    price: 1299,
    category: "Western Wear",
    description: "Colorful party wear dress for kids with a comfortable fit and stylish design.",
    images: [
      "/src/assets/Images/kids-girl-1.webp",
      "/src/assets/Images/kids-girl-2.webp"
    ]
  },
  {
    id: 5,
    title: "Off Saree",
    price: 1799,
    category: "Traditional Wear",
    description: "Traditional ethnic kurti with modern patterns, suitable for festivals and daily wear.",
    images: [
      "/src/assets/Images/off-saree.webp",
      "/src/assets/Images/off-saree-1.webp"
    ]
  },

  // ---------- NEW 15 PRODUCTS ----------
  {
    id: 6,
    title: "Anarkali Long Dress",
    price: 2599,
    category: "Kurties",
    description: "Elegant Anarkali dress crafted for festive and wedding occasions.",
    images: [
      "/src/assets/Images/top-1.webp",
      "/src/assets/Images/top-2.webp"
    ]
  },
  {
    id: 7,
    title: "Women's Office Wear Kurti",
    price: 1399,
    category: "Western Wear",
    description: "Comfortable office wear kurti with subtle prints.",
    images: [
      "/src/assets/Images/western-01.webp",
      "/src/assets/Images/western-01.webp"
    ]
  },
  {
    id: 8,
    title: "Crop",
    price: 2899,
    category: "Western Wear",
    description: "Stylish denim jacket with modern fit.",
    images: [
      "/src/assets/Images/western-02.webp",
      "/src/assets/Images/western-02.webp"
    ]
  },
  {
    id: 9,
    title: "Trendy T-shirt",
    price: 1999,
    category: "Western Wear",
    description: "Slim-fit formal trousers made with breathable fabric.",
    images: [
      "/src/assets/Images/tshirt-01.webp",
      "/src/assets/Images/tshirt-01.webp"
    ]
  },
  {
    id: 10,
    title: "T-shirt",
    price: 899,
    category: "Western Wear",
    description: "Classic polo t-shirt suitable for casual wear.",
    images: [
      "/src/assets/Images/tshirt-02.webp",
      "/src/assets/Images/tshirt-02.webp"
    ]
  },
  {
    id: 11,
    title: "Co Order Set",
    price: 799,
    category: "Kurties",
    description: "Soft cotton casual wear set for kids.",
    images: [
      "/src/assets/Images/co-order-set.webp",
      "/src/assets/Images/co-order-set.webp"
    ]
  },
  {
    id: 12,
    title: "Co Order Set",
    price: 1099,
    category: "Kurties",
    description: "Warm and cozy winter hoodie for kids.",
    images: [
      "/src/assets/Images/co-order-set-1.avif",
      "/src/assets/Images/co-order-set-1.avif"
    ]
  },
  {
    id: 13,
    title: "Women's Shirt",
    price: 2199,
    category: "Western Wear",
    description: "Stylish handbag with spacious compartments.",
    images: [
      "/src/assets/Images/jeans-shirt.webp",
      "/src/assets/Images/jeans-shirt.webp"
    ]
  },
  {
    id: 14,
    title: "Material",
    price: 1499,
    category: "Kurties",
    description: "Comfortable sandals with elegant design.",
    images: [
      "/src/assets/Images/meterial.webp",
      "/src/assets/Images/meterial.webp"
    ]
  },
  {
    id: 15,
    title: "Lehanga",
    price: 2999,
    category: "Traditional Wear",
    description: "Lightweight sports shoes with superior grip.",
    images: [
      "/src/assets/Images/lehanga.webp",
      "/src/assets/Images/lehanga.webp"
    ]
  }
  // {
  //   id: 16,
  //   title: "Ethnic Jewelry Set",
  //   price: 1799,
  //   category: "Accessories",
  //   description: "Traditional ethnic jewelry set for festive wear.",
  //   images: [
  //     "/src/assets/Images/jewelry-1.webp",
  //     "/src/assets/Images/jewelry-2.webp"
  //   ]
  // },
  // {
  //   id: 17,
  //   title: "Women's Winter Shawl",
  //   price: 1299,
  //   category: "Accessories",
  //   description: "Soft and warm winter shawl.",
  //   images: [
  //     "/src/assets/Images/shawl-1.webp",
  //     "/src/assets/Images/shawl-2.webp"
  //   ]
  // },
  // {
  //   id: 18,
  //   title: "Men's Leather Wallet",
  //   price: 999,
  //   category: "Accessories",
  //   description: "Premium leather wallet with multiple compartments.",
  //   images: [
  //     "/src/assets/Images/wallet-1.webp",
  //     "/src/assets/Images/wallet-2.webp"
  //   ]
  // },
  // {
  //   id: 19,
  //   title: "Women's Sunglasses",
  //   price: 1199,
  //   category: "Accessories",
  //   description: "Stylish sunglasses with UV protection.",
  //   images: [
  //     "/src/assets/Images/sunglasses-1.webp",
  //     "/src/assets/Images/sunglasses-2.webp"
  //   ]
  // },
  // {
  //   id: 20,
  //   title: "Kids Sports Shoes",
  //   price: 1499,
  //   category: "Kids",
  //   description: "Durable sports shoes designed for kids’ active lifestyle.",
  //   images: [
  //     "/src/assets/Images/kids-shoes-1.webp",
  //     "/src/assets/Images/kids-shoes-2.webp"
  //   ]
  // }
];

export default dressProducts;
