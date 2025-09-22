import Product from "../component/Product";
import Sidebar from "../component/Sidebar";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <Product />
    </div>
  );
}
