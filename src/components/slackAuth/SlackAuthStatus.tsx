import React from "react";
import { useSlackAuth } from "../../hooks/useSlackAuth";

export const SlackAuthStatus: React.FC = () => {
  const { authState, isLoading, error, refetchAuth } = useSlackAuth();

  if (isLoading) {
    return (
      <div className="d-flex align-items-center">
        <div className="spinner-border spinner-border-sm me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Checking authentication...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="alert alert-danger d-flex align-items-center"
        role="alert"
      >
        <div className="me-2">
          <strong>Authentication Error:</strong> {error}
        </div>
        <button
          className="btn btn-sm btn-outline-danger ms-auto"
          onClick={refetchAuth}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!authState?.ok) {
    return (
      <div className="alert alert-warning" role="alert">
        <strong>Not authenticated</strong> - Please log in to Slack
      </div>
    );
  }

  return (
    <div className="alert alert-success" role="alert">
      <strong>Authenticated</strong> - Welcome {authState.user || "User"}
      {authState.team && (
        <small className="d-block text-muted">Team: {authState.team}</small>
      )}
    </div>
  );
};
