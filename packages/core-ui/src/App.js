import React from "react";
import ErrorBoundary from "./components/ErrorBoundry";
const PcsUser = React.lazy(() => import("pcs_user/App"));

const App = ({ title }) => (
  <div>
    {title}
    <ErrorBoundary>
      <React.Suspense fallback="Loading Button">
        <PcsUser />
      </React.Suspense>
    </ErrorBoundary>
  </div>
);

export default App;
