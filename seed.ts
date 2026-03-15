import { db } from './src/firebase';
import { collection, addDoc, getDocs, deleteDoc, query } from 'firebase/firestore';

const categories = [
  { name: "Dairy & Eggs", slug: "dairy-eggs", image: "https://images.unsplash.com/photo-1550583724-1255814234c3?auto=format&fit=crop&q=80&w=400" },
  { name: "Groceries", slug: "groceries", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400" },
  { name: "Beverages", slug: "beverages", image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400" },
  { name: "Snacks", slug: "snacks", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bb087?auto=format&fit=crop&q=80&w=400" },
  { name: "Fruits & Veg", slug: "fruits-veg", image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=400" },
  { name: "Meat & Fish", slug: "meat-fish", image: "https://images.unsplash.com/photo-1607623273573-748d80347254?auto=format&fit=crop&q=80&w=400" }
];

const products = [
  {
    name: "Olper's Milk 1 Litre",
    description: "High quality processed milk for your daily needs.",
    price: 280,
    discountPrice: 265,
    stock: 50,
    category: "Dairy & Eggs",
    images: ["https://images.unsplash.com/photo-1563636619-e9107da5a1bb?auto=format&fit=crop&q=80&w=400"],
    brand: "Olper's",
    rating: 4.8,
    isFeatured: true,
    isTopSelling: true,
    slug: "olpers-milk-1l"
  },
  {
    name: "Dalda Cooking Oil 5 Litre",
    description: "Pure and healthy cooking oil for a better lifestyle.",
    price: 2450,
    discountPrice: 2300,
    stock: 20,
    category: "Groceries",
    images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400"],
    brand: "Dalda",
    rating: 4.9,
    isFeatured: true,
    isTopSelling: true,
    slug: "dalda-oil-5l"
  },
  {
    name: "Lipton Yellow Label Tea 475g",
    description: "A rich and aromatic tea for your perfect morning.",
    price: 950,
    discountPrice: 890,
    stock: 35,
    category: "Beverages",
    images: ["https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=400"],
    brand: "Lipton",
    rating: 4.7,
    isFeatured: false,
    isTopSelling: true,
    slug: "lipton-tea-475g"
  },
  {
    name: "Lays Masala Family Pack",
    description: "Crunchy and spicy potato chips for the whole family.",
    price: 150,
    discountPrice: 140,
    stock: 100,
    category: "Snacks",
    images: ["https://images.unsplash.com/photo-1566478431375-704332ca523f?auto=format&fit=crop&q=80&w=400"],
    brand: "Lays",
    rating: 4.5,
    isFeatured: true,
    isTopSelling: false,
    slug: "lays-masala-family"
  },
  {
    name: "Fresh Red Apples 1kg",
    description: "Sweet and crunchy apples from the valley of Swat.",
    price: 320,
    discountPrice: 290,
    stock: 15,
    category: "Fruits & Veg",
    images: ["https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=400"],
    brand: "Local",
    rating: 4.6,
    isFeatured: true,
    isTopSelling: true,
    slug: "fresh-red-apples"
  },
  {
    name: "Chicken Breast Boneless 1kg",
    description: "Fresh and hygienic chicken breast for your recipes.",
    price: 1150,
    discountPrice: 1050,
    stock: 10,
    category: "Meat & Fish",
    images: ["https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=400"],
    brand: "K&Ns",
    rating: 4.9,
    isFeatured: false,
    isTopSelling: true,
    slug: "chicken-breast-1kg"
  },
  {
    name: "National Iodized Salt 800g",
    description: "Pure iodized salt for your health and taste.",
    price: 60,
    discountPrice: 55,
    stock: 200,
    category: "Groceries",
    images: ["https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&q=80&w=400"],
    brand: "National",
    rating: 4.8,
    isFeatured: false,
    isTopSelling: false,
    slug: "national-salt-800g"
  },
  {
    name: "Coca Cola 1.5 Litre",
    description: "Refreshing soft drink for every occasion.",
    price: 180,
    discountPrice: 170,
    stock: 60,
    category: "Beverages",
    images: ["https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=400"],
    brand: "Coke",
    rating: 4.4,
    isFeatured: false,
    isTopSelling: true,
    slug: "coca-cola-1-5l"
  }
];

async function seed() {
  console.log("Starting seed...");
  
  // Clear existing (optional, but good for clean start)
  const pSnap = await getDocs(collection(db, 'products'));
  for (const doc of pSnap.docs) await deleteDoc(doc.ref);
  
  const cSnap = await getDocs(collection(db, 'categories'));
  for (const doc of cSnap.docs) await deleteDoc(doc.ref);

  // Add Categories
  for (const cat of categories) {
    await addDoc(collection(db, 'categories'), cat);
    console.log(`Added category: ${cat.name}`);
  }

  // Add Products
  for (const prod of products) {
    await addDoc(collection(db, 'products'), prod);
    console.log(`Added product: ${prod.name}`);
  }

  console.log("Seed completed!");
}

seed().catch(console.error);
