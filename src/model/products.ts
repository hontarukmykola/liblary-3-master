export interface ProductModel {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discount: number;
  imageUrl: string;
  description?: string;
  genreName?: string;
}

export type ProductFormField = {
  id: number;
  title: string;
  quantity: number;
  price: number;
  discount: number;
  imageUrl: string;
  description?: string;
  genreId: number;
};

export interface GenreModel {
  id: number;
  name: string;
}

export interface GenreOption {
  value: number;
  label: string;
}