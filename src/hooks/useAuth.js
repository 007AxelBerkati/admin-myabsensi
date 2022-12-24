import { forgetPass, login } from "@/plugins";
import { SET_ALERT } from "@/reduxx/slice/alert";
import { LOGIN_SUCCESS } from "@/reduxx/slice/auth";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useError from "./useError";

const useAuth = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const errorHandler = useError();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState({ login: false, forgotPass: false });

  async function signIn(email, password) {
    setLoading({ ...loading, login: true });
    login(email, password)
      .then((res) => {
        setLoading({ ...loading, login: false });
        if (errorHandler(res)) return;
        dispatch(SET_ALERT([{ status: "success", message: "Login success!" }]));
        dispatch(LOGIN_SUCCESS({ user: { email, password } }));
        navigate("/dashboard/home");
      })
      .catch((error) => {
        setLoading({ ...loading, login: false });
        errorHandler(error);
      });
  }

  function signOut() {
    localStorage.removeItem("token");
    dispatch(LOGIN_SUCCESS({ token: null }));
    navigate("/login");
  }

  async function forgotPass(email) {
    setLoading({ ...loading, forgotPass: true });
    forgetPass(email).then((res) => {
      setLoading({ ...loading, forgotPass: false });
      if (errorHandler(res)) return;
      dispatch(
        SET_ALERT({ status: "success", message: "Reset password success!" })
      );
      navigate("/login");
    });
  }

  return { isAuthenticated, loading, signIn, signOut, forgetPass };
};

export default useAuth;
