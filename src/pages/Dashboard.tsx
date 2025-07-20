export const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>MLOps Platform Score Dashboard</h1>
      <p>Welcome! You are now authenticated with Slack.</p>
      
      <div style={{ marginTop: "40px" }}>
        <h2>What would you like to do?</h2>
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <button
            style={{
              padding: "12px 24px",
              backgroundColor: "#36c5f0",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Score Platforms
          </button>
          <button
            style={{
              padding: "12px 24px",
              backgroundColor: "#2eb67d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            View Scores
          </button>
        </div>
      </div>
    </div>
  );
};
