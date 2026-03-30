/* eslint-disable no-unused-vars */
import { useState } from "react";
import SectionTitle from "../components/SectionTitle";
import { ADDRESS_FIELDS, INITIAL_ADDRESSES } from "../constants/profileData";
import { DARK_RED, ORANGE, st } from "../constants/styles";
import { Badge } from "../components/Badge";

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

export default SectionAddressBook;