import styles from "./Main.module.css";
import ProductList from "../products/ProductList";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
};

export default function Main( {setReloadCart}: {setReloadCart: React.Dispatch<React.SetStateAction<boolean>>}) {
  return (
    <main className={styles.container}>
      <div className={styles.secondRow}>
        <ProductList setReloadCart={setReloadCart} />
      </div>
    </main>
  );
}
