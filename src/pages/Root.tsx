import LinkToDashboard from "../components/linkButtons/LinkToDashboard";
import { SlackLogin } from "../components/slackLogin/SlackLogin";

const Root = () => {
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
      <h1>Welcome to MLOps Platform Score</h1>
      <p>A community-driven app for evaluating MLOps platforms.</p>

      <p>
        We request that you be a part of our community to contribute and improve
        the platform.
      </p>
      <SlackLogin />

      <p>Or you can jump right in and start exploring the platform.</p>
      <LinkToDashboard />
    </div>
  );
};

export default Root;
