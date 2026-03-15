export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: string;
  images: string[];
  brand: string;
  rating: number;
  isFeatured?: boolean;
  isTopSelling?: boolean;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  role: 'admin' | 'customer';
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: any;
  paymentMethod: 'COD' | 'Online';
  createdAt: string;
}
