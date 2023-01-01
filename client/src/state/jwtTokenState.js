import { atom } from "recoil";

const jwtTokenState = atom({
  key: "jwtTokenState",
  default: null,
});

export default jwtTokenState;
