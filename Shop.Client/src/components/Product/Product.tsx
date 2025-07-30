import axios from "axios";
import { useEffect, useState} from "react";
import { useMatch } from "react-router-dom"
import placheholder from "../product-placeholder.png"
import { IProduct } from "@/types";
import style from "./product.module.scss"



export default function Product() {

	const [product, setProduct] = useState({} as IProduct);
	
	const match = useMatch("/:id");
	
	const productId = match ? match.params.id : "";
	

	async function getProductById (id: any) {
		try {
			const { data } = await axios
				.get(`http://localhost:3000/api/products/${id}`)
			console.log(data);
			setProduct(data);
        
		} catch (error) {
			console.log(error)
		}
	}

	const images = product.images ? product.images.map((item) => <img src={item.url} className={style.image} alt="фото товара" />) : "";
	
	const comments = product.comments ? product.comments.map((item) => <div className={style.comment}><h4 className={style.commentname}>{item.name}</h4><p className={style.mail}>{item.email}</p><p className={style.commenttext}>{item.body}</p></div>) : "";


	useEffect(() => {
	getProductById(productId);
		
	}, [])

	return (
		<main className={style.main}>
			<div className="container">
				<div className={style.items}>
				<h2 className={style.title}>{product.title}</h2>
				<div className={style.mainimg}><img src={product.thumbnail ? product.thumbnail.url : placheholder} alt="фото товара" /></div>
				<div className={style.images}>{images ? images : ""}</div>
					<div className={style.description}>{product.description}</div>
					<div className={style.price}>Цена <span>{product.price} руб.</span></div>
					<h3 className={style.commentstitle}>{product.comments && "Комметарии:"}</h3>
					<div className={style.comments}>{comments}</div>
				</div>
			</div>
		</main>
	)
}