import { Outlet } from "react-router-dom";
import GlobalStyle from "./GlobalStyle.js";

function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;
