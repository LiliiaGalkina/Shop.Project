import axios from "axios";
import { IProduct } from "@Shared/types";

const host = `http://${process.env.LOCAL_PATH}:${process.env.LOCAL_PORT}/${process.env.API_PATH}`;
	
	export async function getProducts(): Promise<IProduct[]> {
		const { data } = await axios.get<IProduct[]>(`${host}/products`);
		return data || [];
		
	}