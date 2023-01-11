import { databaseRef, forgetPass, login, register } from "@/plugins";
import { SET_ALERT } from "@/reduxx/slice/alert";
import { LOGIN_SUCCESS } from "@/reduxx/slice/auth";
import { rdb } from "@/services";
import { onValue, ref, remove, set, update } from "firebase/database";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useError from "./useError";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorHandler = useError();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState({
    login: false,
    forgotPass: false,
    register: false,
    updateUser: false,
    delete: false,
  });

  async function signUp({
    name,
    email,
    password,
    role,
    pekerjaan,
    noHp,
    alamat,
    tempat_lahir,
    tanggal_lahir,
  }) {
    setLoading({ ...loading, register: true });
    register(email, password)
      .then(async (res) => {
        setLoading({ ...loading, register: false });
        const data = {
          fullname: name,
          email: email,
          role: role,
          uid: res.user.uid,
          photo: null,
          pekerjaan: pekerjaan,
          phone_number: noHp,
          address: alamat,
          tempat_lahir: tempat_lahir,
          birth_date: moment(tanggal_lahir).format("DD-MM-YYYY"),
        };

        if (role === "admin") {
          await set(ref(rdb, `admins/${res.user.uid}`), data);
        } else {
          await set(ref(rdb, `users/${res.user.uid}`), data);
        }
        dispatch(
          SET_ALERT([
            { status: "success", message: "User Berhasil Ditambahkan" },
          ])
        );
      })
      .catch((error) => {
        setLoading({ ...loading, register: false });
        errorHandler(error);
      });
  }

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
                dispatch(LOGIN_SUCCESS({ user: snapshot.val() }));
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
      })
      .catch((error) => {
        setLoading({ ...loading, forgotPass: false });
        errorHandler(error);
      });
  }

  async function updateUser(
    { name, pekerjaan, noHp, alamat, tempat_lahir, tanggal_lahir },
    uid
  ) {
    try {
      setLoading({ ...loading, updateUser: true });
      const data = {
        fullname: name,
        pekerjaan: pekerjaan,
        phone_number: noHp,
        address: alamat,
        tempat_lahir: tempat_lahir,
        birth_date: moment(tanggal_lahir).format("DD/MM/YYYY"),
      };
      update(ref(rdb, `users/${uid}`), data);
      setLoading({ ...loading, updateUser: false });
      dispatch(
        SET_ALERT([{ status: "success", message: "Update Data Berhasil" }])
      );
    } catch (error) {
      setLoading({ ...loading, updateUser: false });
      errorHandler(error);
    }
  }

  async function deleteUser(uid) {
    try {
      setLoading({ ...loading, delete: true });
      remove(ref(rdb, `users/${uid}`));
      setLoading({ ...loading, delete: false });
      dispatch(
        SET_ALERT([{ status: "success", message: "Delete Data Berhasil" }])
      );
    } catch (error) {
      setLoading({ ...loading, delete: false });
      errorHandler(error);
    }
  }

  return {
    isAuthenticated,
    loading,
    signIn,
    signOut,
    forgotPass,
    signUp,
    updateUser,
    deleteUser,
  };
};

export default useAuth;
