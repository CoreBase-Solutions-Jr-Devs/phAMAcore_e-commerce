export const ORANGE = "#FA6400";
export const DARK_RED = "#c62828";

export const st = {
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
    btnGreen:    { background: "#008000", color: "#fff", border: "none", borderRadius: 6, padding: "10px 22px", fontWeight: 600, fontSize: 14, cursor: "pointer" },
    btnOutline: { background: "transparent", color: ORANGE, border: `1.5px solid ${ORANGE}`, borderRadius: 6, padding: "9px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer" },

    badge: (color, bg) => ({ background: bg, color, borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 600, display: "inline-block" }),

    inputLabel: { display: "block", fontSize: 13, color: "#555", fontWeight: 600, marginBottom: 6 },
    input:      { width: "100%", border: "1px solid #ddd", borderRadius: 6, padding: "10px 14px", fontSize: 14, color: "#222", outline: "none", boxSizing: "border-box" },

    navItem: (active) => ({ display: "flex", alignItems: "center", gap: 12, padding: "13px 24px", cursor: "pointer", borderLeft: active ? `3px solid ${ORANGE}` : "3px solid transparent", background: active ? "#fff5ee" : "transparent", color: active ? ORANGE : "#444", fontWeight: active ? 600 : 400, fontSize: 14.5, transition: "all 0.15s", userSelect: "none" }),
    navIcon: (active) => ({ fontSize: 18, color: active ? ORANGE : "#888", width: 22, textAlign: "center" }),
    signOutBtn: (pending) => ({ display: "flex", alignItems: "center", gap: 12, padding: "13px 24px", cursor: pending ? "not-allowed" : "pointer", borderLeft: "3px solid transparent", background: "transparent", color: pending ? "#e57373" : DARK_RED, fontWeight: 400, fontSize: 14.5, transition: "all 0.15s", userSelect: "none", opacity: pending ? 0.7 : 1, width: "100%", border: "none", textAlign: "left" }),
};

