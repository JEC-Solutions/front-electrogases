import ThemeProvider from "@/theme/ThemeProvider";
import { Private, Public } from "@/routes/PrivatizationRoutes";
import { Route, Routes } from "react-router-dom";
import { Login } from "@/features/public/login/pages";
import { NotFound } from "@/features/public/404/page";
import { Dashboard } from "@/features/private/dashboard/page";

const App = () => {
  return (
    <div>
      <ThemeProvider>
        <Routes>
          {/* Public route */}
          <Route
            path="/"
            index
            element={
              <Public>
                <Login />
              </Public>
            }
          />
          <Route
            path="*"
            element={
              <Public>
                <NotFound />
              </Public>
            }
          />

          {/* Private route */}
          <Route
            path="/dashboard/*"
            element={
              <Private>
                <Dashboard />
              </Private>
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
