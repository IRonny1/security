import { useRecoilValue } from "recoil";

import Auth from "../pages/Auth/Auth";
import userState from "../state/userState";

export default function withAuthorizedAccess(Component) {
  return function () {
    const user = useRecoilValue(userState);

    if (!user) {
      return <Auth />;
    }

    return <Component />;
  };
}
