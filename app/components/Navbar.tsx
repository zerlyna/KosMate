export default function Navbar() {
  return (
    <nav style={{
      backgroundColor: "#0F172A",
      borderBottom: "2px solid #F59E0B",
      padding: "0 40px",
      height: "64px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 50,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          backgroundColor: "#F59E0B",
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
        }}>🏠</div>
        <span style={{ fontSize: "20px", fontWeight: 700 }}>
          <span style={{ color: "white" }}>Kos</span>
          <span style={{ color: "#F59E0B" }}>Mate</span>
        </span>
      </div>
      <div style={{
        backgroundColor: "rgba(245,158,11,0.15)",
        border: "1px solid rgba(245,158,11,0.3)",
        padding: "4px 14px",
        borderRadius: "20px",
        color: "#F59E0B",
        fontSize: "12px",
        fontWeight: 500,
      }}>
        Sekitar PENS
      </div>
    </nav>
  );
}