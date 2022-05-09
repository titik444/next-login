import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../context";

const UserRoute = ({ children }) => {
  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) getCurrentUser();
  }, [state && state.token]);

  const getCurrentUser = async () => {
    try {
      await axios.get(`/current-user`);
    } catch (err) {
      router.push("/login");
    }
  };

  state === null &&
    setTimeout(() => {
      getCurrentUser();
    }, 1000);

  return <>{children}</>;
};

export default UserRoute;
