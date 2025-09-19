export interface ProductType {
  id: number;
  title: string;
  brand: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  availabilityStatus: string;
  description: string;
  thumbnail: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  images: string[];
  minimumOrderQuantity: number;
  returnPolicy: string;
  reviews: ReviewType[];
  weight: number;
  warrantyInformation: string;
  tags: string[];
  sku: string;
  shippingInformation: string;
  quantity: number;
}

export interface ReviewType {
  comment: string;
  date: Date;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}

export interface ProductState {
  products: ProductType[];
  loading: boolean;
  error: string | null;
  total: number;
  skip: number;
  limit: number;
  selectedCategory: string;
  categoryLists: string[];
  sortBy: string;
  order: "asc" | "desc";
  searchProduct: string;
}

export interface CartState {
  cart: ProductType[];
  totalAmount: number;
  totalQuantity: number;
}

export interface LoginState {
  error: string | null;
  isLoading: boolean;
}

export interface LoginType {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}
