import Header from "../modules/header/Header";
import Main from "../modules/main/Main";
import Cart from "../modules/cart/Cart";

export default function Home() {
  return (
    <div className="dashboard">
      <Header />
      <div className="body">
        <Main />
        <Cart />
      </div>
    </div>
  );
}
