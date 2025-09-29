"use client";
import { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import { getRequest, deleteRequest, putRequest } from "../../services/api";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

type CartProduct = {
  productId: string;
  qty: number;
};

type CartProductPrint = {
    id: string;
  title: string;
  price: number;
  qty: number;
};


const account = process.env.NEXT_PUBLIC_USER;
const urlProduct = "products";
const urlCartAcount = "cart?account="+account;

const pasos = ["inicio", "datos", "envio", "pago", "final"] as const;
export type Paso = typeof pasos[number];

type CartProps = {
  reload: boolean;
    pasoActual: Paso;
  setPasoActual: React.Dispatch<React.SetStateAction<Paso>>;
};

export default function Cart({ reload, pasoActual, setPasoActual }: CartProps) { 
    const [products, setProducts] = useState<Product[]>([]);
    const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

    
    useEffect(() => {
        getRequest<Product[]>(urlProduct)
        .then((data) => {
            setProducts(data);
        })
        .catch((err) => {
            console.error(err);
        });
        getRequest<CartProduct[]>(urlCartAcount)    
        .then((data) => {
            setCartProducts(data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, [reload]);


    const printCartProducts = () => {
        let cartProductsPrint: CartProductPrint[] = [];
        cartProducts.forEach((cartProduct) => {
            const product = products.find((product) => product.id === cartProduct.productId);
            if (product) {
                cartProductsPrint.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    qty: cartProduct.qty
                });
            }
        });
        return cartProductsPrint;
    };

    const handleUpdate = (productId: string, qty: number) => {
        const cartProduct = cartProducts.find((cartProduct) => cartProduct.productId === productId);
        if (cartProduct) {
            putRequest<CartProduct>(urlCartAcount, {
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
        }
    };

    const handleRemove = (productId: string) => {
        const cartProduct = cartProducts.find((cartProduct) => cartProduct.productId === productId);
        if (cartProduct) {
            deleteRequest<CartProduct>(urlCartAcount, {
                account: account,
                product: productId
            })
            .then((data) => {
                console.log(data);
                setCartProducts((prev) =>
                    prev.filter((product) => product.productId !== productId)
                );
            })
            .catch((err) => {
                console.error(err);
            });
        }
    };

    const handleQtyChange = (productId: string, qty: number) => {
        const cartProduct = cartProducts.find((cartProduct) => cartProduct.productId === productId);
        if (cartProduct) {
            cartProduct.qty = qty;
            setCartProducts([...cartProducts]);
        }
    };


    const handleContinuar = (number: number) => {
        const pasos = ["inicio", "datos", "envio", "pago", "final"] as const;
        type Paso = typeof pasos[number];

        const index = pasos.indexOf(pasoActual);
        const nuevoIndex = Math.min(Math.max(index + number, 0), pasos.length - 1);
        setPasoActual(pasos[nuevoIndex]);
    };

if (cartProducts.length==0) return <aside className={styles.aside}><h2 className={styles.title}>Carrito</h2><p>No hay productos en el carrito</p></aside>;

return (
    <aside className={styles.aside}>
  <h2 className={styles.title}>Carrito</h2>
  <div className={styles.list}>
    {printCartProducts().map((cartProduct) => (
      <div key={cartProduct.id} className={styles.cartItem}>
        <img src="/descarga.jfif" alt={cartProduct.title} />

        <div className={styles.detalle}>
          <h3>{cartProduct.title}</h3>
          <p>{cartProduct.price.toFixed(2)}€</p>
        </div>
        
            <input
            type="number"
            min="1"
            max="99"
            value={cartProduct.qty}
            className={styles.cantidad}
            disabled={pasoActual !== "inicio"}
            onChange={(e) => {
                let value = Number(e.target.value);
                if (value < 1) value = 1;
                if (value > 99) value = 99;
                handleQtyChange(cartProduct.id, value);
            }}
            onClick={() => handleUpdate(cartProduct.id, cartProduct.qty)}
          />
       

        <div className={styles.acciones}>
          
          <p className={styles.total}>
            {(cartProduct.qty * cartProduct.price).toFixed(2)}€
          </p>
          <button
            className={styles.botonBorrar}
            disabled={pasoActual !== "inicio"}
            onClick={() => handleRemove(cartProduct.id)}>
            Quitar
          </button>
        </div>
      </div>
    ))}
  </div>

  <h2 className={styles.totalCarrito}>
    Total:{" "}
    {printCartProducts().reduce((total, cartProduct) => total + cartProduct.qty * cartProduct.price, 0).toFixed(2)}€
  </h2>
  <div className={styles.botones}>
    <button className={styles.botonAnterior} 
    disabled={pasoActual === "inicio"}
    onClick={() => handleContinuar(-1)}>Anterior</button>
    <button className={styles.botonSiguiente} 
    disabled={pasoActual === "final"}
    onClick={() => handleContinuar(1)}>Siguiente</button>
  </div>
</aside>
  );
}
