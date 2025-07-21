import axios from "axios";
import { IProduct, IProductFilterPayload } from "@Shared/types";
import { IProductEditData } from "../types";
import { API_HOST } from "./const";


export async function getProducts(): Promise<IProduct[]> {
  const { data } = await axios.get<IProduct[]>(`${API_HOST}/products`);
  return data || [];
}

export async function searchProducts(
  filter: IProductFilterPayload
): Promise<IProduct[]> {
  const { data } = await axios.get<IProduct[]>(`${API_HOST}/products/search`, {
    params: filter,
  });
  return data || [];
}

export async function getProduct(id: string): Promise<IProduct | null> {
  try {
    const { data } = await axios.get<IProduct>(`${API_HOST}/products/${id}`);
    return data;
  } catch (e) {
    return null;
  }
}

export async function removeProduct(id: string): Promise<void> {
  await axios.delete(`${API_HOST}/products/${id}`);
}

function splitNewImages(str = ""): string[] {
  return str
    .split(/\r\n|,/g)
    .map((url) => url.trim())
    .filter((url) => url);
}

function compileIdsToRemove(data: string | string[]): string[] {
  if (typeof data === "string") return [data];
  return data;
}

export async function updateProduct(
  productId: string,
  formData: IProductEditData
): Promise<IProduct | null> {
  try {
    // запрашиваем у Products API товар до всех изменений
    const { data: currentProduct } = await axios.get<IProduct>(
      `${API_HOST}/products/${productId}`
    );

    if (formData.commentsToRemove) {
      // используйте Comments API "delete" метод
      const commentsIdsToRemove = compileIdsToRemove(formData.commentsToRemove);
      const getDeleteCommentActions = () =>
        commentsIdsToRemove.map((commentId) => {
          return axios.delete(`${API_HOST}/comments/${commentId}`);
        });
      await Promise.all(getDeleteCommentActions());
    }

    if (formData.imagesToRemove) {
		// используйте Products API "remove-images" метод
		 const imagesIdsToRemove = compileIdsToRemove(formData.imagesToRemove);
      await axios.post(`${API_HOST}/products/remove-images`, imagesIdsToRemove);
    }
    
    if (formData.newImages) {
      // превратите строку newImages в массив строк, разделитель это перенос строки или запятая
		// для добавления изображений используйте Products API "add-images" метод
		const urls = splitNewImages(formData.newImages);
		const images = urls.map((url) => ({ url, main: false }));
		  if (!currentProduct.thumbnail) {
        images[0].main = true;
		}
		await axios.post(`${API_HOST}/products/add-images`, { productId, images });
    }

    if (
      formData.mainImage &&
      formData.mainImage !== currentProduct?.thumbnail?.id
    ) {
      // если при редактировании товара было выбрано другое изображение для обложки,
		// то нужно обратиться к Products API "update-thumbnail" методу
		await axios.post(`${API_HOST}/products/update-thumbnail/${productId}`, {
      newThumbnailId: formData.mainImage,
    });
    }

    // обращаемся к Products API методу PATCH для обновления всех полей, которые есть в форме
	  // в ответ получаем обновленный товар и возвращаем его из этой функции
	   await axios.patch(`${API_HOST}/products/${productId}`, {
       title: formData.title,
       description: formData.description,
       price: Number(formData.price),
     });

    // временно возвращаем неизмененный товар, пока все предыдущие этапы не будут реализованы
    return currentProduct;
  } catch (e) {
    console.log(e); // фиксируем ошибки, которые могли возникнуть в процессе
  }
}
