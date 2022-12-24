import { Alert } from "@material-tailwind/react";
import React, { useEffect } from "react";

export default function PrimaryAlert({ status, message, remove, removeAll }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      removeAll();
    }, 3000);
    return () => clearTimeout(timer);
  }, [alert]);

  function bgColor(status) {
    if (status === "success") {
      return "green";
    } else if (status === "danger") {
      return "red";
    } else if (status === "warning") {
      return "orange";
    } else if (status === "info") {
      return "blue";
    } else {
      return "green";
    }
  }

  return (
    <Alert
      color={bgColor(status)}
      dismissible={{
        onClose: () => remove(),
      }}
    >
      {message}
    </Alert>
  );
}
