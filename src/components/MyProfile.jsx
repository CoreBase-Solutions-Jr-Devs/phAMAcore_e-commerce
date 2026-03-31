/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { signOutMutationFn, getOrdersByCustomerQueryFn, getOrderByIdQueryFn } from "@/lib/api";
import { useSelector, useDispatch } from "react-redux";
import { selectCustomerId, selectCurrentUser, logout } from "../features/authSlice";
import { clearCart } from "../features/cartSlice";

const decodeJwt = (token) => {
    try {
        const payload = token.split(".")[1];
        return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    } catch {
        return null;
    }
};

const buildUserFromStorage = () => {
    let stored = null;
    try {
        const raw = localStorage.getItem("user");
        if (raw) stored = JSON.parse(raw);
    } catch { /* ignore */ }

    const claim = decodeJwt(localStorage.getItem("accessToken") || "");
    const email       = stored?.email       ?? claim?.email ?? "";
    const phone       = stored?.phoneNumber ?? claim?.phone ?? "";
    const userName    = stored?.userName    ?? claim?.unique_name  ?? "";

    const displayName = userName
        ? userName.charAt(0).toUpperCase() + userName.slice(1)
        : "User";

    const initials = displayName
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? "")
        .join("");

    return {
        id:          stored?.id    ?? claim?.sub ?? "",
        userName,
        name:        displayName,
        email,
        phone,
        initials:    initials || "U",
        roles:       stored?.roles ?? (claim?.role ? [claim.role] : []),
        dob:         "",
        gender:      "",
    };
};

const USER = buildUserFromStorage();



const ORDERS = [
    { id: "#KE-00421", item: "Wireless Headphones",  emoji: "🎧", date: "12 Mar 2025", status: "Delivered",  price: "KES 4,500"  },
    { id: "#KE-00389", item: "Men's Running Shoes",  emoji: "👟", date: "28 Feb 2025", status: "In Transit", price: "KES 6,200"  },
    { id: "#KE-00301", item: "Smart Watch Series 8", emoji: "⌚", date: "10 Feb 2025", status: "Delivered",  price: "KES 18,000" },
    { id: "#KE-00277", item: "Blender 1.5L",         emoji: "🫙", date: "20 Jan 2025", status: "Cancelled",  price: "KES 2,800"  },
];

const INITIAL_WISHLIST = [
    { id: 1, name: "iPhone 15 Pro",    emoji: "📱", price: "KES 185,000", oldPrice: "KES 199,000" },
    { id: 2, name: "Air Fryer 5L",     emoji: "🍳", price: "KES 8,500",   oldPrice: null          },
    { id: 3, name: "Gaming Chair",     emoji: "🪑", price: "KES 22,000",  oldPrice: "KES 28,000"  },
    { id: 4, name: "Portable Speaker", emoji: "🔊", price: "KES 3,200",   oldPrice: null          },
];

const INITIAL_ADDRESSES = [
    { id: 1, tag: "Shipping Address", name: USER.name, line1: "Apt 4B, Westlands Plaza",       line2: "Westlands, Nairobi", phone: USER.email, isDefault: true  },
    { id: 2, tag: "Billing Address", name: USER.name, line1: "2nd Floor, Delta Corner Towers", line2: "Westlands, Nairobi", phone: USER.email, isDefault: false },
];

const ADDRESS_FIELDS  = ["Full Name", "Phone Number", "County", "Town / City", "Street Address", "Nearest Landmark"];

const ORDER_STATUSES = ["All", "Pending", "Processing", "Completed", "Cancelled"];
const PERSONAL_FIELDS = [
    { label: "Username",      value: USER.userName,  readOnly: true  },
    { label: "Email Address", value: USER.email,     readOnly: true  },
    { label: "Phone Number",  value: USER.phone                      },
    { label: "Date of Birth", value: USER.dob,       type: "date"    },
    { label: "Gender",        value: USER.gender,    type: "select", options: ["", "Male", "Female", "Prefer not to say"] },
];

const ORANGE = "#FA6400";
const DARK_RED = "#c62828";

const st = {
    sidebar:       { background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, overflow: "hidden" },
    sidebarHeader: { background: ORANGE, padding: "20px 24px", display: "flex", alignItems: "center", gap: 14 },
    avatarCircle:  { width: 52, height: 52, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 22, color: ORANGE, flexShrink: 0 },
    sidebarName:   { color: "#fff", fontWeight: 700, fontSize: 16, margin: 0, lineHeight: 1.3 },
    sidebarEmail:  { color: "rgba(255,255,255,0.82)", fontSize: 13, margin: 0 },
    card:          { background: "#fff", border: "1px solid #e8e8e8", borderRadius: 8, padding: "28px 32px" },
    divider:       { borderTop: "1px solid #f0f0f0", margin: "20px 0" },
    addressCard:   { border: "1px solid #e8e8e8", borderRadius: 8, padding: "18px 20px", position: "relative", height: "100%" },
    summaryBox:    { background: "#fff8f3", border: "1px solid #fde8d5", borderRadius: 8, padding: "18px 22px", textAlign: "center" },
    summaryNum:    { fontSize: 28, fontWeight: 800, color: ORANGE, lineHeight: 1 },
    summaryLabel:  { fontSize: 12, color: "#888", marginTop: 4, fontWeight: 500 },
    orderRow:      { display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: "1px solid #f0f0f0" },
    orderImg:      { width: 64, height: 64, borderRadius: 6, background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 26 },
    wishCard:      { border: "1px solid #eee", borderRadius: 8, overflow: "hidden", position: "relative" },
    wishImg:       { width: "100%", height: 140, background: "#f9f9f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40 },
    wishRemove:    { position: "absolute", top: 8, right: 8, background: "#fff", border: "1px solid #eee", borderRadius: "50%", width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14, color: "#999" },

    sectionTitle:    { fontSize: 18, fontWeight: 700, color: "#222", marginBottom: 4 },
    sectionSubtitle: { fontSize: 13, color: "#888", marginBottom: 24 },
    labelText:       { fontSize: 13, color: "#888", marginBottom: 4, fontWeight: 500 },
    valueText:       { fontSize: 15, color: "#222", fontWeight: 500 },

    btnMain:    { background: ORANGE, color: "#fff", border: "none", borderRadius: 6, padding: "10px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" },
    btnOutline: { background: "transparent", color: ORANGE, border: `1.5px solid ${ORANGE}`, borderRadius: 6, padding: "9px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer" },

    badge: (color, bg) => ({ background: bg, color, borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 600, display: "inline-block" }),

    inputLabel: { display: "block", fontSize: 13, color: "#555", fontWeight: 600, marginBottom: 6 },
    input:      { width: "100%", border: "1px solid #ddd", borderRadius: 6, padding: "10px 14px", fontSize: 14, color: "#222", outline: "none", boxSizing: "border-box" },

    navItem: (active) => ({ display: "flex", alignItems: "center", gap: 12, padding: "13px 24px", cursor: "pointer", borderLeft: active ? `3px solid ${ORANGE}` : "3px solid transparent", background: active ? "#fff5ee" : "transparent", color: active ? ORANGE : "#444", fontWeight: active ? 600 : 400, fontSize: 14.5, transition: "all 0.15s", userSelect: "none" }),
    navIcon: (active) => ({ fontSize: 18, color: active ? ORANGE : "#888", width: 22, textAlign: "center" }),
    signOutBtn: (pending) => ({ display: "flex", alignItems: "center", gap: 12, padding: "13px 24px", cursor: pending ? "not-allowed" : "pointer", borderLeft: "3px solid transparent", background: "transparent", color: pending ? "#e57373" : DARK_RED, fontWeight: 400, fontSize: 14.5, transition: "all 0.15s", userSelect: "none", opacity: pending ? 0.7 : 1, width: "100%", border: "none", textAlign: "left" }),
};

const Badge = {
    orange: (t) => <span style={st.badge(ORANGE,    "#fff3e8")}>{t}</span>,
    green:  (t) => <span style={st.badge("#2e7d32", "#e8f5e9")}>{t}</span>,
    blue:   (t) => <span style={st.badge("#1565c0", "#e3f2fd")}>{t}</span>,
    red:    (t) => <span style={st.badge(DARK_RED,  "#ffebee")}>{t}</span>,
    gray:   (t) => <span style={st.badge("#555",    "#f5f5f5")}>{t}</span>,
};

const statusBadge = (s) => {
    if (s === "Completed")  return Badge.green(s);
    if (s === "Processing") return Badge.blue(s);
    if (s === "Cancelled")  return Badge.red(s);
     if (s === "Pending")  return Badge.red(s);
    return Badge.orange(s);
};

const getStatusText = (status) => {
  switch (status) {
    case 0: return "Pending";
    case 1: return "Processing";
    case 2: return "Completed";
    case 3: return "Cancelled";
    default: return "Unknown";
  }
};

const SectionTitle = ({ title, subtitle }) => (
    <>
        <p style={st.sectionTitle}>{title}</p>
        {subtitle && <p style={st.sectionSubtitle}>{subtitle}</p>}
    </>
);

const FormInput = ({ label, type = "text", defaultValue, options, readOnly = false }) => (
    <div className="col-sm-6">
        <label style={st.inputLabel}>{label}</label>
        {type === "select" ? (
            <select style={st.input} defaultValue={defaultValue}>
                {options.map(o => <option key={o}>{o}</option>)}
            </select>
        ) : (
            <input
                style={{ ...st.input, ...(readOnly ? { background: "#f9f9f9", color: "#aaa" } : {}) }}
                type={type}
                defaultValue={defaultValue}
                readOnly={readOnly}
            />
        )}
    </div>
);

const EmptyState = ({ emoji, message, action }) => (
    <div style={{ textAlign: "center", padding: "48px 0", color: "#aaa" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{emoji}</div>
        <p>{message}</p>
        {action}
    </div>
);


const SectionMyAccount = () => (
    <div>
        <SectionTitle
            title="Account Overview"
            subtitle={`Welcome back, ${USER.name}! Here's a summary of your account.`}
        />

        <div className="row g-3 mb-28">
            {[
                { num: ORDERS.length,                                       label: "Total Orders"    },
                { num: ORDERS.filter(o => o.status === "Delivered").length, label: "Delivered"       },
                { num: INITIAL_WISHLIST.length,                             label: "Wishlist Items"  },
                { num: INITIAL_ADDRESSES.length,                            label: "Saved Addresses" },
            ].map(({ num, label }) => (
                <div className="col-6 col-md-3" key={label}>
                    <div style={st.summaryBox}>
                        <div style={st.summaryNum}>{num}</div>
                        <div style={st.summaryLabel}>{label}</div>
                    </div>
                </div>
            ))}
        </div>

        <div style={st.divider} />

        <p style={{ ...st.sectionTitle, fontSize: 15, marginBottom: 16 }}>Personal Information</p>
        <div className="row g-3">
            {[
                { label: "Username",      value: USER.userName || "—" },
                { label: "Email Address", value: USER.email    || "—" },
                { label: "Phone Number",  value: USER.phone    || "—" },
                { label: "Role",        value: USER.roles?.join(", ") || "—" },
            ].map(({ label, value }) => (
                <div className="col-sm-6" key={label}>
                    <p style={st.labelText}>{label}</p>
                    <p style={st.valueText}>{value}</p>
                </div>
            ))}
        </div>
    </div>
);

const SectionAddressBook = () => {
    const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
    const [showForm,  setShowForm]  = useState(false);

    const removeAddress = (id) => setAddresses(prev => prev.filter(a => a.id !== id));
    const setDefault    = (id) => setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <SectionTitle title="Address Book" subtitle="Manage your delivery addresses" />
                <button style={st.btnMain} onClick={() => setShowForm(f => !f)}>
                    {showForm ? "Cancel" : "+ Add New Address"}
                </button>
            </div>

            {showForm && (
                <div style={{ ...st.card, marginBottom: 24, background: "#fffaf6", border: "1.5px solid #fde8d5" }}>
                    <p style={{ fontWeight: 700, marginBottom: 18, color: ORANGE }}>New Address</p>
                    <div className="row g-3">
                        {ADDRESS_FIELDS.map(f => (
                            <div className="col-sm-6" key={f}>
                                <label style={st.inputLabel}>{f}</label>
                                <input style={st.input} placeholder={f} />
                            </div>
                        ))}
                    </div>
                    <button style={{ ...st.btnMain, marginTop: 16 }}>Save Address</button>
                </div>
            )}

            <div className="row g-3">
                {addresses.map(addr => (
                    <div className="col-md-6" key={addr.id}>
                        <div style={st.addressCard}>
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div className="d-flex align-items-center gap-2">
                                    {Badge.orange(addr.tag)}
                                    {addr.isDefault && Badge.green("Default")}
                                </div>
                                <div className="d-flex gap-2">
                                    <button style={{ ...st.btnOutline, padding: "5px 14px", fontSize: 12 }}>Edit</button>
                                    {!addr.isDefault && (
                                        <button
                                            style={{ ...st.btnOutline, padding: "5px 14px", fontSize: 12, color: DARK_RED, borderColor: DARK_RED }}
                                            onClick={() => removeAddress(addr.id)}
                                        >Remove</button>
                                    )}
                                </div>
                            </div>
                            <p style={{ fontWeight: 600, marginBottom: 4, color: "#222" }}>{addr.name}</p>
                            <p style={{ color: "#555", fontSize: 14, marginBottom: 2 }}>{addr.line1}</p>
                            <p style={{ color: "#555", fontSize: 14, marginBottom: 2 }}>{addr.line2}</p>
                            <p style={{ color: "#888", fontSize: 13 }}>{addr.phone}</p>
                            {!addr.isDefault && (
                                <button
                                    style={{ ...st.btnOutline, marginTop: 12, padding: "6px 14px", fontSize: 12 }}
                                    onClick={() => setDefault(addr.id)}
                                >Set as Default</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

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
    : orders.filter((o) => getStatusText(o.status) === filter);



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

  return (
    <>
      {selectedOrderId ? (
        // ✅ Show selected order details
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
                <p  className="mb-0 ">Order No: {order.orderNumber}</p>
                <p  className="mb-0 ">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                <p  className="mb-0 ">Total KES {order.totalPrice}</p>
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
        // ✅ Show orders list
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
            <p>No orders found</p>
          ) : (
            visible.map((order) => {
              const statusText = getStatusText(order.status);

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
                        {statusBadge(statusText)}
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

const SectionWishlist = () => {
    const [items, setItems] = useState(INITIAL_WISHLIST);
    const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));
    const navigate = useNavigate();

    return (
        <div>
            <SectionTitle title="My Wishlist" subtitle={`${items.length} saved item${items.length !== 1 ? "s" : ""}`} />

            {items.length === 0 ? (
                <EmptyState
                    emoji="❤️"
                    message="Your wishlist is empty. Start saving items you love!"
                    action={
                        <Link to="/shop" style={{ ...st.btnMain, textDecoration: "none", display: "inline-block", marginTop: 12, padding: "10px 24px" }}>
                            Browse Products
                        </Link>
                    }
                />
            ) : (
                <div>
                    {items.map(item => (
                        <div key={item.id} style={st.orderRow}>
                            <div style={st.orderImg}>{item.emoji}</div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: 600, color: "#222", marginBottom: 2, fontSize: 15 }}>{item.name}</p>
                                <p style={{ fontWeight: 700, color: ORANGE, fontSize: 14, marginBottom: 2 }}>{item.price}</p>
                                {item.oldPrice && (
                                    <p style={{ color: "#bbb", fontSize: 12, textDecoration: "line-through" }}>{item.oldPrice}</p>
                                )}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                                <button
                                    style={{ ...st.btnMain, padding: "6px 14px", fontSize: 12 }}
                                    onClick={() => navigate("/cart")}
                                >Add to Cart</button>
                                <button
                                    style={{ ...st.btnOutline, padding: "6px 14px", fontSize: 12, color: DARK_RED, borderColor: DARK_RED }}
                                    onClick={() => remove(item.id)}
                                >Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const SectionAccountManagement = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const TABS = [["personal", "Personal Details"], ["password", "Change Password"]];

    return (
        <div>
            <SectionTitle title="Account Management" subtitle="Update your personal details and security settings" />

            <div className="d-flex gap-3 mb-28 border-bottom pb-2">
                {TABS.map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        style={{ background: "none", border: "none", borderBottom: activeTab === key ? `2.5px solid ${ORANGE}` : "2.5px solid transparent", color: activeTab === key ? ORANGE : "#666", fontWeight: activeTab === key ? 700 : 500, fontSize: 14, padding: "6px 4px 10px", cursor: "pointer", marginBottom: -2 }}
                    >{label}</button>
                ))}
            </div>

            {activeTab === "personal" && (
                <div className="row g-3">
                    {PERSONAL_FIELDS.map(f => (
                        <FormInput
                            key={f.label}
                            label={f.label}
                            type={f.type}
                            defaultValue={f.value}
                            options={f.options}
                            readOnly={f.readOnly}
                        />
                    ))}
                    <div className="col-12 mt-2">
                        <button style={st.btnMain}>Save Changes</button>
                    </div>
                </div>
            )}

            {activeTab === "password" && (
                <div>
                    {["Current Password", "New Password", "Confirm New Password"].map(f => (
                        <div key={f} style={{ marginBottom: 20 }}>
                            <label style={st.inputLabel}>{f}</label>
                            <input style={st.input} type="password" placeholder={f} />
                        </div>
                    ))}
                    <button style={st.btnMain}>Update Password</button>
                </div>
            )}
        </div>
    );
};

const NAV_ITEMS = [
    { key: "account",    label: "My Account",         icon: "👤" },
    { key: "orders",     label: "Orders",             icon: "📦" },
    { key: "wishlist",   label: "Wishlist",           icon: "❤️" },
    { key: "addresses",  label: "Address Book",       icon: "📍" },
    { key: "management", label: "Account Management", icon: "⚙️" },
];

const SECTION_MAP = {
    account:    <SectionMyAccount />,
    orders:     <SectionOrders />,
    wishlist:   <SectionWishlist />,
    addresses:  <SectionAddressBook />,
    management: <SectionAccountManagement />,
};

const MyProfile = () => {
    const navigate = useNavigate();
     const dispatch = useDispatch();
    const [active, setActive] = useState("account");

    // const clearTokens = () => {
    //     localStorage.removeItem("accessToken");
    //     localStorage.removeItem("refreshToken");
    //     localStorage.removeItem("user");
    // };

const signOutMutation = useMutation({
        mutationFn: signOutMutationFn,
        onSuccess: () => {
            dispatch(logout());
             dispatch(clearCart());  // ✅ clear auth from Redux and localStorage
            navigate("/shop");
        },
        onError: () => {
            dispatch(logout());  // ✅ same on error
            navigate("/account");
        },
    });


    return (
        <section className="py-60">
            <div className="container container-lg">
                <div className="row g-4">

                    {/* ── Sidebar ── */}
                    <div className="col-lg-3">
                        <div style={st.sidebar}>
                            <div style={st.sidebarHeader}>
                                <div style={st.avatarCircle}>{USER.initials}</div>
                                <div>
                                    <p style={st.sidebarName}>{USER.name}</p>
                                    <p style={st.sidebarEmail}>{USER.email}</p>
                                </div>
                            </div>

                            <nav>
                                {NAV_ITEMS.map(({ key, label, icon }) => (
                                    <div key={key} style={st.navItem(active === key)} onClick={() => setActive(key)}>
                                        <span style={st.navIcon(active === key)}>{icon}</span>
                                        {label}
                                    </div>
                                ))}

                                <div style={st.divider} />

                                <button
                                    style={st.signOutBtn(signOutMutation.isPending)}
    onClick={() => signOutMutation.mutate()}
                                        disabled={signOutMutation.isPending}
                                >
                                    <span style={{ fontSize: 18, width: 22, textAlign: "center" }}>
                                        {signOutMutation.isPending ? "⏳" : "🚪"}
                                    </span>
                                    {signOutMutation.isPending ? "Signing out…" : "Sign Out"}
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* ── Content ── */}
                    <div className="col-lg-9">
                        <div style={st.card}>
                            {SECTION_MAP[active]}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MyProfile;