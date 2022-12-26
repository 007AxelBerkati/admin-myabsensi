import { databaseRef, forgetPass, login } from "@/plugins";
import { SET_ALERT } from "@/reduxx/slice/alert";
import { LOGIN_SUCCESS } from "@/reduxx/slice/auth";
import { onValue } from "firebase/database";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useError from "./useError";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorHandler = useError();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState({ login: false, forgotPass: false });

  async function signIn(email, password) {
    setLoading({ ...loading, login: true });
    login(email, password)
      .then((res) => {
        const queryUser = databaseRef(`users/${res.user.uid}`);
        return onValue(queryUser, (snapshot) => {
          if (snapshot.exists()) {
            setLoading({ ...loading, login: false });
            if (errorHandler(res)) return;
            dispatch(
              SET_ALERT([
                {
                  status: "warning",
                  message:
                    "Kamu menggunakan akun user, tolong login dengan menggunakan dengan akun Admin",
                },
              ])
            );
          } else {
            const queryAdmin = databaseRef(`admins/${res.user.uid}`);
            return onValue(queryAdmin, (snapshot) => {
              if (snapshot.exists()) {
                setLoading({ ...loading, login: false });
                if (errorHandler(res)) return;
                dispatch(
                  SET_ALERT([{ status: "success", message: "Login Success" }])
                );
                dispatch(LOGIN_SUCCESS({ user: { email, password } }));
                navigate("/dashboard/home");
              }
            });
          }
        });
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
    forgetPass(email)
      .then((res) => {
        setLoading({ ...loading, forgotPass: false });
        if (errorHandler(res)) return;
        dispatch(
          SET_ALERT([{ status: "success", message: "Check your email" }])
        );
        console.log(res);
        navigate("/login");
      })
      .catch((error) => {
        setLoading({ ...loading, forgotPass: false });
        console.log(error.code);
        errorHandler(error);
      });
  }

  return { isAuthenticated, loading, signIn, signOut, forgotPass };
};

export default useAuth;
