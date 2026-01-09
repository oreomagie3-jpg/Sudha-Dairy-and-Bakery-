
export type Category = 'Dairy' | 'Bakery' | 'Sweets' | 'Beverages';

export interface Product {
  id: string;
  name: string;
  hindiName: string;
  price: number;
  category: Category;
  unit: string;
  image: string;
  description: string;
  isFresh?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface PersonalWish {
  senderName: string;
  message: string;
}

export interface BirthdayCustomer {
  id: string;
  name: string;
  photo: string;
  instagram?: string;
  wish: string;
  wishCount: number;
  personalWishes: PersonalWish[];
  postedAt?: string;
}

export type CountdownCategory = 'Birthday' | 'Anniversary' | 'Festival' | 'Special';

export interface CountdownEvent {
  id: string;
  name: string;
  date: string;
  category: CountdownCategory;
  createdBy: string;
}

export interface User {
  name: string;
  mobile: string;
  ordersCount: number;
  joinDate: string;
  avatar: string;
}
