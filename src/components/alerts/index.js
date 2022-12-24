import { useEffect } from "react";

export default function PrimaryAlert({ status, children, remove, removeAll }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAll();
    }, 3000);
    return () => clearTimeout(timer);
  }, [alert]);

  function bgColor(status) {
    if (status === "success") {
      return "bg-success";
    } else if (status === "danger") {
      return "bg-danger";
    } else if (status === "warning") {
      return "bg-warning";
    } else if (status === "info") {
      return "bg-info";
    } else {
      return "bg-primary";
    }
  }

  return (
    <div className="alert alert-primary" role="alert">
      {alert}
    </div>
  );
}
