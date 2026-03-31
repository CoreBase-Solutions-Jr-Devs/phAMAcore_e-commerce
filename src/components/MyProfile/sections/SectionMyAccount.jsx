/* eslint-disable no-unused-vars */

import SectionTitle from "../components/SectionTitle";
import { INITIAL_ADDRESSES, INITIAL_WISHLIST, ORDERS } from "../constants/profileData";
import { st } from "../constants/styles";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { useUser } from "../hooks/useUser";

const SectionMyAccount = () => {
    const { user: USER, isLoading, isError } = useCurrentUser();
    if (isLoading) return <p>Loading...</p>;
    if (isError || !USER) return <p>Please log in.</p>;

    return (
        <div>
            <SectionTitle
                title="Account Overview"
                subtitle={`Welcome back, ${USER.name}!`}
            />

            {/* content */}
            <div className="row g-3 mb-28">
                {[
                    { num: 0, label: "Total Orders" },
                    { num: 0, label: "Delivered" },
                    { num: 0, label: "Wishlist Items" },
                    { num: 0, label: "Saved Addresses" },
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
                    { label: "Username", value: USER.userName || "—" },
                    { label: "Email Address", value: USER.email || "—" },
                    { label: "Phone Number", value: USER.phoneNumber || "—" },
                    { label: "Role", value: USER.roles?.join(", ") || "—" },
                    { label: "Address Line 1", value: USER.address?.addressLine1 || "—" },
                    { label: "Address Line 2", value: USER.address?.addressLine2 || "—" },
                ].map(({ label, value }) => (
                    <div className="col-sm-6" key={label}>
                        <p style={st.labelText}>{label}</p>
                        <p style={st.valueText}>{value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionMyAccount;