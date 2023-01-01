import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";

import UserApi from "../api/UserApi";
import RoutesProvider from "../config/Routes/RoutesProvider";
import { removeJwtToken, useJwtToken } from "../services/jwtTokenService";
import jwtTokenState from "../state/jwtTokenState";
import userState from "../state/userState";

function Container() {
  const [userLoading, setUserLoading] = useState(true);
  const [jwtToken, setJwtToken] = useRecoilState(jwtTokenState);
  const setUser = useSetRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const [localStorageToken] = useJwtToken();

  useEffect(() => {
    setJwtToken(localStorageToken);
  }, [setJwtToken, localStorageToken]);

  useEffect(() => {
    if (jwtToken) {
      setUserLoading(true);
      (async function getUser() {
        try {
          const user = await UserApi.getCurrentUser();
          const { data } = user;
          if (data) {
            setUser(data);
          }
        } catch (e) {
          resetUser();
          removeJwtToken();
        } finally {
          setUserLoading(false);
        }
      })();
    } else {
      resetUser();
      setUserLoading(false);
    }
  }, [jwtToken, resetUser, setUser]);
  return !userLoading && <RoutesProvider />;
}

export default Container;
