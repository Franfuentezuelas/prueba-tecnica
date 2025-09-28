import styles from "./Main.module.css";
import ProductList from "../products/ProductList";

export default function Main() {
  return (
    <main className={styles.container}>
      <div className={styles.secondRow}>
        <ProductList />
      </div>
    </main>
  );
}
