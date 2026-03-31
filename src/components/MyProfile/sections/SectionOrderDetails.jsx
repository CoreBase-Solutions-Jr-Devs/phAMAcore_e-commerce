import React from "react";
import { Badge } from "../components/Badge";
import { ORANGE } from "../constants/styles";

// Props: order (object), onBack (function), isLoading (boolean), isError (boolean)
const SectionOrderDetails = ({ order, onBack, isLoading, isError, orderId }) => {
  if (isLoading) return <p>Loading order details...</p>;
  if (isError) return <p>Failed to load order details</p>;
  if (!order) return null;

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

  return (
    <div className="container py-2">
      <button
        onClick={onBack}
        style={{
          marginBottom: 10,
          background: "none",
          border: "none",
          color: ORANGE,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        ← Back to Orders
      </button>

      {/* HEADER */}
      <h6 className="mb-2 fw-bold">Order History</h6>
      <div className="border rounded p-3 mb-4">
        <p className="mb-0">Order No: {order.orderNumber}</p>
        <p className="mb-0">
          Placed on {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p className="mb-0">Total KES {order.totalPrice}</p>
      </div>

      {/* ITEMS */}
      <div className="border rounded p-3 mb-4">
        <h6 className="mb-2 fw-bold">Items</h6>
        {order.items.map((item) => (
          <div
            key={item.productId}
            className="d-flex align-items-center justify-content-between mb-2"
          >
            <div
              style={{
                width: 100,
                height: 60,
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid #eee",
                marginRight: 12,
              }}
            >
              <img
                src={item.image || "https://via.placeholder.com/60"}
                alt={item.productName}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{item.productName}</p>
              <p style={{ margin: 0, fontSize: 13, color: "#555" }}>
                Qty: {item.quantity}
              </p>
              <div style={{ fontWeight: 600 }}>
                KES {item.price * item.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DELIVERY + PAYMENT */}
      <div className="d-flex gap-3 mb-4">
        <div className="border rounded p-3 flex-1">
          <h6 className="mb-2 fw-bold">Delivery Information</h6>
          <p className="mb-0">
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          </p>
          <p className="mb-0">{order.shippingAddress.phoneNumber}</p>
          <p className="mb-0">
            {order.shippingAddress.addressLine} next to{" "}
            {order.shippingAddress.landmark}
          </p>
        </div>

        <div className="border rounded p-3 flex-1">
          <h6 className="mb-2 fw-bold">Payment Information</h6>
          <p>{order.payment.method === 1 ? "M-PESA" : "Card"}</p>

          <h6 className="mb-2 fw-bold">Payment Details</h6>
          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>
              KES{" "}
              {order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              )}
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Delivery</span>
            <span>KES {order.deliveryFee || 0}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Discount</span>
            <span>KES {order.discount || 0}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Total</span>
            <span>KES {order.totalPrice}</span>
          </div>
        </div>
      </div>

      {/* STATUS */}
      <div style={{ marginTop: 12 }}>{statusBadge(order.status)}</div>
    </div>
  );
};

export default SectionOrderDetails;