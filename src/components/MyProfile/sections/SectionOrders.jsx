import { selectCustomerId } from "@/features/authSlice";
import { getOrdersByCustomerQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { statusText } from "../components/StatusText";
import { ORANGE } from "../constants/styles";
import { ORDER_STATUSES } from "../constants/profileData";
import { Badge } from "../components/Badge";
import SectionTitle from "../components/SectionTitle";
import { Link, useNavigate } from "react-router-dom";
import loader from "../../../assets/images/illustration/19.svg";
const SectionOrders = ({ onSelectOrder }) => {
  const [filter, setFilter] = useState("All");
  const customerId = useSelector(selectCustomerId);
  const navigate = useNavigate();
  const { data: ordersData, isLoading, isError } = useQuery({
    queryKey: ["orders", customerId],
    queryFn: () =>
      getOrdersByCustomerQueryFn({
        customerId,
        pageIndex: 0,
        pageSize: 10,
      }),
    enabled: !!customerId,
  });

  const orders = ordersData?.orders?.data || [];

  // Filter orders by selected status
  const visibleOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => statusText(o.status) === filter);

  // Filter orders that have items
  const ordersWithItems = visibleOrders.filter((order) => order.items?.length > 0);

  const statusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return Badge.green(status);
      case "Pending":
        return Badge.orange(status);
      case "Cancelled":
        return Badge.red(status);
      default:
        return Badge.blue(status);
    }
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Failed to load orders</p>;

  return (
    <div>
      <SectionTitle title="My Orders" subtitle="Track and manage your purchases" />

      {/* Status Filters */}
      <div className="d-flex gap-2 mb-24 flex-wrap">
        {ORDER_STATUSES.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: "7px 18px",
              borderRadius: 20,
              border: "1.5px solid",
              fontWeight: 600,
              fontSize: 13,
              cursor: "pointer",
              borderColor: filter === t ? ORANGE : "#ddd",
              background: filter === t ? ORANGE : "#fff",
              color: filter === t ? "#fff" : "#555",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Empty State if no orders with items */}
      {!ordersWithItems.length && (
        <div
          className="container-fluid d-flex flex-column align-items-center justify-content-center text-center"
          style={{ minHeight: "50vh" }}
        >
          <img src={loader} width={300} alt="No orders" className="img-fluid mb-16" />
          <h6 className="mb-16">You have no orders yet</h6>
          <Link
            to="/shop"
            className="link text-line-2 bg-main-50 hover-bg-main-100 transition-2 text-black rounded-5 py-10 px-20 d-inline-flex align-items-center gap-8"
          >
            <i className="ph ph-shopping-cart" /> Shop today's deals
          </Link>
        </div>
      )}

      {/* Orders List */}
      {ordersWithItems.length > 0 &&
        ordersWithItems.map((order) => {
          const orderStatusText = statusText(order.status);
          return (
            <div
              key={order.id}
              className="border rounded p-3 mb-3 position-relative"
              style={{ background: "#fff" }}
            >
                <Link
          onClick={() => onSelectOrder(order.id)}
        style={{
          position: "absolute",
          top: 12,
          right: 16,
          fontSize: 13,
          color: ORANGE,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        See More Details
      </Link>

              <div className="d-flex gap-3 align-items-start">
                {/* Product Image */}
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 8,
                    overflow: "hidden",
                    border: "1px solid #eee",
                  }}
                >
                  <img
                    src={order.items?.[0]?.image || "https://via.placeholder.com/70"}
                    alt={order.items?.[0]?.productName || "No product"}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Product Info */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, marginBottom: 4 }}>
                    {order.items.map((item) => item.productName).join(", ")}
                  </p>
                  <p style={{ fontSize: 13, color: "#777", marginBottom: 6 }}>
                    KES {order.totalPrice} · {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <div style={{ marginBottom: 8 }}>{statusBadge(orderStatusText)}</div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SectionOrders;