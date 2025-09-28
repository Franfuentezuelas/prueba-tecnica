"use client";
import { useState, useEffect, useRef } from "react";
import { getRequest, postRequest } from "../../services/api";
import styles from "./ProductList.module.css";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

const account = process.env.NEXT_PUBLIC_USER;
const urlProduct = "products";
const urlCart = "cart";


export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    getRequest<Product[]>(urlProduct)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const addToCart = (productId: string) => {
    

    postRequest<Product>(urlCart, {
      account: account,
      product: productId,
      qty: qty
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading && products.length===0) return <h1 className={styles.Cargando}>Cargando productos...</h1>;

  return (
    <main className={styles.main}>
      <ul className={styles.menu}>
        {products.map((product) => (
            <li key={product.id} className={styles.product}>
                <img src="/descarga.jfif" alt="product" />

                <div className={styles.detalle}>
                    <h2 className={styles.titulo}>{product.title}</h2>
                    <p className={styles.descripcion}>{product.description}</p>
                </div>

                <div className={styles.acciones}>
                    <p className={styles.precio}>{product.price.toFixed(2)}€</p>
                    <input type="number"min="1" max="99" defaultValue="1" className={styles.cantidad}  onChange={(e) => setQty(Number(e.target.value))} />
                    <button className={styles.botonAgregar} onClick={() => addToCart(product.id)}>Añadir al carrito</button>
                </div>
            </li>
        ))}
      </ul>
    </main>
  );
}

