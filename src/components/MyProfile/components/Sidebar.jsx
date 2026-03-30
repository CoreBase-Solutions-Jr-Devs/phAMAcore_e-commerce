import { st } from "../constants/styles";
import { NAV_ITEMS } from "../constants/navItems";

const Sidebar = ({ active, setActive, user, onSignOut, loading }) => {
    if (!user) return null;

    return (
        <div style={st.sidebar}>
            <div style={st.sidebarHeader}>
                <div style={st.avatarCircle}>{user.initials}</div>
                <div>
                    <p style={st.sidebarName}>{user.name}</p>
                    <p style={st.sidebarEmail}>{user.email}</p>
                </div>
            </div>

            {NAV_ITEMS.map(item => (
                <div
                    key={item.key}
                    style={st.navItem(active === item.key)}
                    onClick={() => setActive(item.key)}
                >
                    {item.icon} {item.label}
                </div>
            ))}

            <button onClick={onSignOut} style={st.signOutBtn(loading)} disabled={loading}>
                {loading ? "Signing out..." : "Sign Out"}
            </button>
        </div>
    );
};

export default Sidebar;