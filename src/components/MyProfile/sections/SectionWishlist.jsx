/* eslint-disable no-unused-vars */
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { INITIAL_WISHLIST } from "../constants/profileData";
import { Link, useNavigate } from "react-router-dom";
import { DARK_RED, ORANGE, st } from "../constants/styles";
import EmptyState from "../components/EmptyState";

const SectionWishlist = () => {
    const [items, setItems] = useState("");
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

export default SectionWishlist;