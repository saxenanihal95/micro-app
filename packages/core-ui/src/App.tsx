import * as React from 'react';
import ErrorBoundary from "./components/ErrorBoundry";
// @ts-ignore
const PcsUser = React.lazy(() => import("pcs_user/App"));
// @ts-ignore
const PcsAdmin = React.lazy(() => import("pcs_admin/App"));

interface AppProps {
  title: string
}

const App: React.FC<AppProps> = ({ title }) => (
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
