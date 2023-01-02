import { useRecoilValue } from "recoil";

import userState from "../../state/userState";

function General() {
  const user = useRecoilValue(userState);
  return <>Hello {user.userName}</>;
}

export default General;
