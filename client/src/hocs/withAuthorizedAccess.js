import { useRecoilValue } from "recoil";

import Login from "../pages/Login/Login";
import userState from "../state/userState";

export default function withAuthorizedAccess(Component) {
  return function () {
    const user = useRecoilValue(userState);

    if (!user) {
      return <Login />;
    }

    return <Component />;
  };
}
