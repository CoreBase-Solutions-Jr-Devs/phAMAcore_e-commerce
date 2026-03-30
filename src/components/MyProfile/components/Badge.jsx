import { st, ORANGE, DARK_RED } from "../constants/styles";

export const Badge = {
    orange: (t) => <span style={st.badge(ORANGE, "#fff3e8")}>{t}</span>,
    green: (t) => <span style={st.badge("#2e7d32", "#e8f5e9")}>{t}</span>,
    blue: (t) => <span style={st.badge("#1565c0", "#e3f2fd")}>{t}</span>,
    red: (t) => <span style={st.badge(DARK_RED, "#ffebee")}>{t}</span>,
};