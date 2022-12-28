import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import React from "react";
import { REMOVE_ALERT } from "./reduxx/slice/alert";
import { useDispatch, useSelector } from "react-redux";
import PrimaryAlert from "./components/alerts/PrimaryAlert";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <>
      <RoutesApp />
      <ShowAlert />
    </>
  );
}

export default App;

export const ShowAlert = () => {
  const { alert } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  return (
    <div className="absolute top-10 m-auto sm:left-20 sm:right-20 md:left-20 md:right-20 lg:left-80 lg:right-2">
      {alert?.map((alert, i) => (
        <PrimaryAlert
          key={i}
          status={alert.status}
          message={alert.message}
          remove={() => dispatch(REMOVE_ALERT({ index: i }))}
          removeAll={() => dispatch(REMOVE_ALERT())}
        />
      ))}
    </div>
  );
};
