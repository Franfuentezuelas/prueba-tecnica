"use client";
import { useState, useEffect } from "react";
import { getRequest } from "../../services/api";
import styles from "./ProductList.module.css";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

const urlProduct = "/products";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequest<Product[]>(urlProduct)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
                    <button className={styles.botonAgregar}>Añadir al carrito</button>
                </div>
            </li>
        ))}
      </ul>
    </main>
  );
}

