import { databaseRef } from "@/plugins";
import { onValue } from "firebase/database";
import React, { useEffect, useState } from "react";

const useAllUser = () => {
  const [dataAllUser, setDataAllUser] = useState([]);

  async function getAllUser() {
    const queryUser = databaseRef(`users`);
    return onValue(queryUser, (snapshot) => {
      if (snapshot.exists()) {
        const oldData = snapshot.val();
        const data = [];
        Object.keys(oldData).map((key) => {
          data.push({ ...oldData[key], uid: key });
        });
        setDataAllUser(data);
      }
    });
  }

  return { dataAllUser, getAllUser };
};

export default useAllUser;
