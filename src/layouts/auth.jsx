import routes from "@/routes";
import { Footer } from "@/widgets/layout";

import { Route, Routes } from "react-router-dom";

export function Auth() {
  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
      <div className="container absolute bottom-8 left-2/4 z-10 mx-auto -translate-x-2/4 text-white">
        <Footer />
      </div>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
