import { databaseRef, usersRef } from "@/plugins";
import { data } from "autoprefixer";
import { onValue } from "firebase/database";
import { getDocs } from "firebase/firestore";
import React, { useState } from "react";

const useStatistic = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalGuru, setTotalGuru] = useState(0);
  const [totalStaff, setTotalStaff] = useState(0);
  const [totalAdmin, setTotalAdmin] = useState(0);
  const [loading, setLoading] = useState(false);

  const getTotalUsers = async () => {
    setTotalUsers(0);
    setTotalGuru(0);
    setTotalStaff(0);
    setTotalAdmin(0);

    setLoading(true);

    const queryUsers = databaseRef("users");
    await onValue(queryUsers, (snapshot) => {
      setTotalUsers(snapshot.size);
      snapshot.forEach((childSnapshot) => {
        const childData = childSnapshot.val();
        if (childData.pekerjaan === "guru") {
          setTotalGuru((prev) => prev + 1);
        } else if (childData.pekerjaan === "staf") {
          setTotalStaff((prev) => prev + 1);
        }
      });
    });

    const queryAdmin = databaseRef("admins");
    await onValue(queryAdmin, (snapshot) => {
      setTotalAdmin(snapshot.size);
      setLoading(false);
    });
  };

  return {
    totalUsers,
    totalGuru,
    totalStaff,
    totalAdmin,
    getTotalUsers,
    loading,
  };
};

export default useStatistic;
