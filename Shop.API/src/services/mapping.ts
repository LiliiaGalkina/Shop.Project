import { IComment, ICommentEntity, IProduct, IProductEntity, IProductImage, IProductImageEntity } from "../../types";

  export const mapCommentEntity = ({
    comment_id,
    product_id,
    ...rest
  }: ICommentEntity): IComment => {
    return {
      id: comment_id,
      productId: product_id,
      ...rest,
    };
  };

  export const mapCommentsEntity = (data: ICommentEntity[]): IComment[] => {
    return data.map(mapCommentEntity);
  };

    export const mapProductsEntity = (data: IProductEntity[]): IProduct[] => {
      return data.map(({ product_id, title, description, price }) => ({
        id: product_id,
        title: title || "",
        description: description || "",
        price: Number(price) || 0,
      }));
    };

//hw
export const mapImageEntity = ({
  image_id,
  product_id,
  url,
  main,
}: IProductImageEntity): IProductImage => {
  return {
    id: image_id,
    productId: product_id,
    main: Boolean(main),
    url,
  };
};


export const mapImagesEntity = (data: IProductImageEntity[]): IProductImage[] => {
	return data.map(mapImageEntity);
}
//