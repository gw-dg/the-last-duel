import React from "react";
import WakaTimeComparison from "./WakaTimeComparison";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WakaTime Stats Comparison</h1>
      </header>
      <main>
        <WakaTimeComparison />
      </main>
      <footer>
        <p>Powered by WakaTime API</p>
      </footer>
    </div>
  );
}

export default App;
