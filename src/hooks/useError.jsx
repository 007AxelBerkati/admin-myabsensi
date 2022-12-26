import { ADD_ALERT } from "@/reduxx/slice/alert";
import { useDispatch } from "react-redux";

const useError = () => {
  const dispatch = useDispatch();

  function errorHandler(response) {
    if (typeof response === "string") {
      dispatch(ADD_ALERT({ status: "danger", message: response }));
      return true;
    }

    if (response.errors) {
      response.errors.forEach((error) => {
        dispatch(ADD_ALERT({ status: "danger", message: error.msg }));
      });
      return true;
    }

    if (response.code === "auth/invalid-email") {
      dispatch(ADD_ALERT({ status: "error", message: "Invalid E-mail!" }));
      return true;
    }

    if (response.code === "auth/user-not-found") {
      dispatch(ADD_ALERT({ status: "danger", message: "User not found!" }));
      return true;
    }

    if (response.code === "auth/wrong-password") {
      dispatch(ADD_ALERT({ status: "danger", message: "Wrong password!" }));
      return true;
    }

    if (response.code === "auth/too-many-requests") {
      dispatch(
        ADD_ALERT({
          status: "danger",
          message: "Too many requests, try again later!",
        })
      );

      return true;
    }

    return false;
  }

  return errorHandler;
};

export default useError;
