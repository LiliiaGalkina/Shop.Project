import { RowDataPacket } from "mysql2/index";


export interface ICommentEntity extends RowDataPacket {
  comment_id: string;
  name: string;
  email: string;
  body: string;
  product_id: string;
}

export type CommentCreatePayload = Omit<IComment, "id">;
 import { IComment, IProduct, IProductImage } from "@Shared/types";


  export interface IProductEntity extends IProduct, RowDataPacket {
    product_id: string;
}
  
   export interface IProductSearchFilter {
     title?: string;
     description?: string;
     priceFrom?: number;
     priceTo?: number;
}
   
export type ProductCreatePayload = Omit<IProduct, "id" | "comments">;
   



export interface IProductImageEntity extends RowDataPacket {
	image_id: string;
	url: string;
	product_id: string;
	main: number;
}

export type ImageCreatePayload = Omit<IProductImage, "id" | "productId">;

export interface ProductAddImagesPayload {
  productId: string;
  images: ImageCreatePayload[];
}

export type ImagesRemovePayload = string[];


export { IComment, IProduct, IProductImage };
//
