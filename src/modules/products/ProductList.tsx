"use client";
import { useState, useEffect, useRef } from "react";
import { getRequest, postRequest} from "../../services/api";
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

type ProductListProps = {
  setReloadCart: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductList({ setReloadCart }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

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

  const addToCart = (productId: string, qty: number) => {
    
    postRequest<Product>(urlCart, {
      account: account,
      product: productId,
      qty: qty
    })
      .then((data) => {
        console.log(data);
        setReloadCart(prev => !prev);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading && products.length===0) return <main className={styles.main}><h1 className={styles.Cargando}>Cargando productos...</h1></main>;

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
                    <input type="number"
                        min={1}
                        max={99}
                        value={quantities[product.id] || 1}                     // <- valor controlado por el estado
                        className={styles.cantidad}
                        onChange={(e) => {
                          let value = Number(e.target.value);
                          if (value < 1) value = 1;
                          if (value > 99) value = 99;
                          setQuantities((prev) => ({ ...prev, [product.id]: value }));
                        }}
                      />
                    <button className={styles.botonAgregar} onClick={() => addToCart(product.id, quantities[product.id] || 1)}>Añadir al carrito</button>
                </div>
            </li>
        ))}
      </ul>
    </main>
  );
}

