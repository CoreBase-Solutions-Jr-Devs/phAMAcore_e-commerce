const EmptyState = ({ emoji, message, action }) => (
    <div style={{ textAlign: "center", padding: "48px 0", color: "#aaa" }}>
        <div style={{ fontSize: 48 }}>{emoji}</div>
        <p>{message}</p>
        {action}
    </div>
);

export default EmptyState;