import { selectCustomerId } from "@/features/authSlice";
import { getOrderByIdQueryFn, getOrdersByCustomerQueryFn } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSelector } from "react-redux";
import { statusText } from "../components/StatusText";
import { ORANGE, st } from "../constants/styles";
import { ORDER_STATUSES } from "../constants/profileData";
import { Badge } from "../components/Badge";
// eslint-disable-next-line no-unused-vars
import SectionTitle from "../components/SectionTitle";
// eslint-disable-next-line no-unused-vars
import EmptyState from "../components/EmptyState";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";

const SectionOrders = () => {
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [filter, setFilter] = useState("All");
    const { cart } = useSelector((state) => state.itemCart);
    const customerId = useSelector(selectCustomerId);
    const username = useSelector((state) => state.auth.user?.username);


    const {
        data: ordersData,
        isLoading,
        isError,
    } = useQuery({
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

    const visible = filter === "All"
        ? orders
        : orders.filter((o) => statusText(o.status) === filter);



    const {
        data: orderData,
        isLoading: isOrderLoading,
        isError: isOrderError,
    } = useQuery({
        queryKey: ["order", selectedOrderId],
        queryFn: () => getOrderByIdQueryFn(selectedOrderId),
        enabled: !!selectedOrderId,
    });

    const order = orderData?.order;

    if (isLoading) return <p>Loading orders...</p>;
    if (isError) return <p>Failed to load orders</p>;

    const onBack = () => setSelectedOrderId(null);

    const statusBadge = (status) => {
        switch (status) {
            case "Delivered": return Badge.green(status);
            case "Pending": return Badge.orange(status);
            case "Cancelled": return Badge.red(status);
            default: return Badge.blue(status);
        }
    };

    return (
        <>
            {selectedOrderId ? (
                // Show selected order details
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

                    {isOrderLoading ? (
                        <p>Loading order details...</p>
                    ) : isOrderError ? (
                        <p>Failed to load order details</p>
                    ) : (
                        <>
                            {/* HEADER */}
                            <h6 className="mb-2  fw-bold" >Order History</h6>
                            <div className="border rounded p-3 mb-4">
                                <p className="mb-0 ">Order No: {order.orderNumber}</p>
                                <p className="mb-0 ">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p className="mb-0 ">Total KES {order.totalPrice}</p>
                            </div>

                            {/* ITEMS */}
                            <div className="border rounded p-3 mb-4">
                                <h6 className="mb-2  fw-bold" >Items</h6>

                                {order.items.map((item) => (
                                    <div
                                        key={item.productId}
                                        className="d-flex align-items-center justify-content-between mb-2"
                                    >
                                        {/* IMAGE */}
                                        <div style={{ width: 100, height: 60, borderRadius: 8, overflow: "hidden", border: "1px solid #eee", marginRight: 12 }}>
                                            <img
                                                src={item.image || "https://via.placeholder.com/60"}
                                                alt={item.productName}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        </div>

                                        {/* PRODUCT INFO */}
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: 0, fontWeight: 600 }}>{item.productName}</p>
                                            <p style={{ margin: 0, fontSize: 13, color: "#555" }}>
                                                Qty: {item.quantity}
                                            </p>
                                            <div style={{ fontWeight: 600 }}>
                                                KES {item.price * item.quantity}
                                            </div>
                                        </div>

                                        {/* SUBTOTAL */}

                                    </div>
                                ))}
                            </div>

                            {/* DELIVERY + PAYMENT SIDE BY SIDE */}
                            <div className="d-flex gap-3 mb-4">
                                {/* DELIVERY */}
                                <div className="border rounded p-3 flex-1">
                                    <h6 className="mb-2  fw-bold">Delivery Information</h6>
                                    <p className="mb-0 ">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                                    <p className="mb-0 ">{order.shippingAddress.phoneNumber}</p>
                                    <p className="mb-0 ">
                                        {order.shippingAddress.addressLine} next to {order.shippingAddress.landmark}
                                    </p>
                                </div>

                                {/* PAYMENT */}
                                <div className="border rounded p-3 flex-1">
                                    <h6 className="mb-2  fw-bold">Payment Information</h6>
                                    <p>{order.payment.method === 1 ? "M-PESA" : "Card"}</p>

                                    <h6 className="mb-2  fw-bold">Payment Details</h6>
                                    <div className="d-flex justify-content-between">
                                        <span>Subtotal</span>
                                        <span> </span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Delivery</span>
                                        <span> </span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Discount</span>
                                        <span> </span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span>Total</span>
                                        <span> Kes {order.totalPrice} </span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                //  Show orders list
                <div>
                    <SectionTitle title="My Orders" subtitle="Track and manage your purchases" />

                    <div className="d-flex gap-2 mb-24 flex-wrap">
                        {ORDER_STATUSES.map(t => (
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
                                    color: filter === t ? "#fff" : "#555"
                                }}
                            >{t}</button>
                        ))}
                    </div>

                    {visible.length === 0 ? (
                        <EmptyState
                            emoji="🛒"
                            message="No orders! Would you like to place your first order?"
                            action={
                                <Link to="/shop" style={{ ...st.btnMain, textDecoration: "none", display: "inline-block", marginTop: 12, padding: "10px 24px" }}>
                                    Browse Products
                                </Link>
                            }
                        />
                    ) : (
                        visible.map((order) => {
                            const orderStatusText = statusText(order.status);

                            return (
                                <div key={order.id} className="border rounded p-3 mb-3 position-relative" style={{ background: "#fff" }}>
                                    {/* 🔗 SEE DETAILS (TOP RIGHT) */}
                                    <span
                                        onClick={() => setSelectedOrderId(order.id)}
                                        style={{
                                            position: "absolute",
                                            top: 12,
                                            right: 16,
                                            fontSize: 13,
                                            color: ORANGE,
                                            fontWeight: 600,
                                            cursor: "pointer",
                                        }}
                                    >
                                        See Details
                                    </span>

                                    <div className="d-flex gap-3 align-items-start">
                                        {/* 🖼️ IMAGE LEFT */}
                                        <div style={{ width: 70, height: 70, borderRadius: 8, overflow: "hidden", border: "1px solid #eee" }}>
                                            <img
                                                src="https://via.placeholder.com/70"
                                                alt={order.items[0]?.productName}
                                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            />
                                        </div>

                                        {/* 📦 RIGHT CONTENT */}
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: 600, marginBottom: 4 }}>
                                                {order.items.map(item => item.productName).join(", ")}
                                            </p>
                                            <p style={{ fontSize: 13, color: "#777", marginBottom: 6 }}>
                                                Kes {order.totalPrice} · {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                            <div style={{ marginBottom: 8 }}>
                                                {statusBadge(orderStatusText)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </>
    );
};

export default SectionOrders;