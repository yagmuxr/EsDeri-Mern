import "./Orders.css";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const apiUrl = "https://esderi-mern.onrender.com"; // 🔁 backend API URL

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = user?.id; // 🔧 Fixed this
      if (!userId) {
        console.warn("User ID could not be retrieved");
        return;
      }

      try {
        const res = await fetch(`${apiUrl}/api/orders/user/${userId}`);
        if (!res.ok) throw new Error("Data could not be retrieved");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error while fetching order data:", error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="orders-container">
      <h2 style={{ fontWeight: "bold", marginBottom: 20 }}>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>
                  <ul>
                    {order.products.map((p, i) => (
                      <li key={i}>
                        {p.name} x{p.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.total?.toFixed(2)}</td>
                <td>{order.isPaid ? "Paid ✅" : "Not Paid ❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
