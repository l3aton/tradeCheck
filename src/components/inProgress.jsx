import "../css/inProgress.css";

function InProgress({ section }) {
  return (
    <main className="in-progress">
      <div className="in-progress-card">
        <span className="in-progress-icon">⚙</span>
        <p className="eyebrow">TRADECHECK</p>
        <h1>{section}</h1>
        <p className="in-progress-message">
          This section is currently in progress. We are working on it for you.
        </p>
        <span className="in-progress-status">Coming soon</span>
      </div>
    </main>
  );
}

export default InProgress;
