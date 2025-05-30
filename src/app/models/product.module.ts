export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate?: number;
    count?: number;
  };
}

// Tipo para a resposta de avaliação do produto
export interface ProductRating {
  rate: number;
  count: number;
}