export interface Product {
  id?: number;
  name: string;
  image: string | File;
  createdAt: string | Date;
  updatedAt: string | Date;
}
