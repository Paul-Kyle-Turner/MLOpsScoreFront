import { Link } from "react-router";
import { SearchBoxLinkOut } from "../components/searchBox/SearchBoxLinkOut";
import { Scroller } from "../components/dashboardScroller/Scroller";
import { CreateNewPlatform } from "../components/platform/CreateNewPlatform";
import { useSlackAuth } from "../hooks/useSlackAuth";

export const Dashboard = () => {
  const { authState } = useSlackAuth();

  return (
    <div>
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
        {/* Search box */}
        <SearchBoxLinkOut />
        <br />
        <p>
          If you have used an MLOps platform before, you can give it a score.
        </p>
        <br />

        {/* Action buttons */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Add your evaluation button */}
          <Link to={"/evaluation"}>
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "500",
                textDecoration: "none",
                display: "inline-block",
                transition: "background-color 0.2s ease",
              }}
            >
              Start Evaluation
            </button>
          </Link>

          {authState?.ok && <CreateNewPlatform size="lg" />}
        </div>
      </div>

      {/* Horizontal scrolling platforms section */}
      <div style={{ marginTop: "40px" }}>
        <Scroller title="Discover MLOps Platforms" pageSize={8} />
      </div>
    </div>
  );
};
