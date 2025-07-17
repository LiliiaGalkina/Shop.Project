export interface IComment {
  id: string;
  name: string;
  email: string;
  body: string;
  productId: string;
}


  export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    comments?: IComment[];
    images?: IProductImage[];
	  thumbnail?: IProductImage;
  }


export interface IProductImage {
	id: string;
	url: string;
	productId: string;
	main: boolean;
}


