import { Outlet } from "react-router";
import CartOverview from "../features/cart/CartOverview";
import Header from "./Header";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
