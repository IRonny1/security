import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import Container from "./root/Container";

import "./App.scss";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <RecoilRoot>
          <Container />
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
