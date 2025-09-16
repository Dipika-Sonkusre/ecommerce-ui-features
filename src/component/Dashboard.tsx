import Sidebar from "./Sidebar";
import Product from "./Product";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Product />
    </div>
  );
}
