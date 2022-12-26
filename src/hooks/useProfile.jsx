import { databaseRef } from "@/plugins";
import { onValue } from "firebase/database";
import { useEffect, useState } from "react";

const useProfile = () => {
  const [dataProfile, setdataProfile] = useState({});

  useEffect(() => {
    const dataUserLocal = JSON.parse(localStorage.getItem("user"));
    const queryAdmin = databaseRef(`admins/${dataUserLocal.uid}`);

    return onValue(queryAdmin, (snapshot) => {
      if (snapshot.exists()) {
        setdataProfile(snapshot.val());
      }
    });
  }, []);

  return { dataProfile };
};

export default useProfile;
