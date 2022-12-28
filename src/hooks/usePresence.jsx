import { usersRef } from "@/plugins";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
import useError from "./useError";

const usePresence = () => {
  const errorHandle = useError();
  const [presenceAllUser, setPresencAllUser] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getPresenceAllUser(date) {
    setLoading(true);
    await getDocs(usersRef())
      .then(async (querySnapshot) => {
        const list = [];
        const data = [];

        await querySnapshot.forEach((doc) => {
          list.push({ ...doc.data(), uid: doc.id });
        });

        list.map(async (item) => {
          const docRef = doc(usersRef(), item.uid);
          const subcollectionRef = collection(docRef, "presence");
          const subDocRef = doc(
            subcollectionRef,
            `${moment(date).format("YYYY")}`
          );
          const subCollectionRef2 = collection(
            subDocRef,
            `${moment(date).format("MM")}`
          );
          const subDocRef2 = doc(
            subCollectionRef2,
            `${moment(date).format("DD")}`
          );

          await getDoc(subDocRef2)
            .then((doc) => {
              if (doc.exists()) {
                data.push({ ...item, ...doc.data() });
              } else {
                data.push({
                  ...item,
                });
              }
              setPresencAllUser(data);
            })
            .catch((error) => {
              errorHandle(error);
            });
        });

        setLoading(false);
      })
      .catch((error) => {
        errorHandle(error);
      });
  }

  return { presenceAllUser, getPresenceAllUser, loading };
};

export default usePresence;
