import { Link } from "react-router";
import { SearchBoxLinkOut } from "../components/searchBox/SearchBoxLinkOut";

export const Dashboard = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>MLOps Platform Score Dashboard</h1>

      {/* Search box */}
      <SearchBoxLinkOut />
      <br />
      <p>If you have used an MLOps platform before, you can give it a score.</p>
      <br />

      {/* Add your evaluation button */}
      <Link to={"/evaluation"}>
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
          Start Evaluation
        </button>
      </Link>
    </div>
  );
};
