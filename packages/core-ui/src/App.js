import React from "react";
import ErrorBoundary from "./components/ErrorBoundry";
const PcsUser = React.lazy(() => import("pcs_user/App"));
const PcsAdmin = React.lazy(() => import("pcs_admin/App"));

const App = ({ title }) => (
  <div>
    {title}
    <ErrorBoundary appName="Pcs User">
      <React.Suspense fallback="Loading PcsUser">
        <PcsUser />
      </React.Suspense>
    </ErrorBoundary>
    <ErrorBoundary appName="Pcs Admin">
      <React.Suspense fallback="Loading PcsAdmin">
        <PcsAdmin />
      </React.Suspense>
    </ErrorBoundary>
  </div>
);

export default App;
