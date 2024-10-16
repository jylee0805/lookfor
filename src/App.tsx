import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header";
import Loading from "./components/Loading";
import { AuthContextProvider } from "./utils/AuthContextProvider";
import { ComponentContextProvider } from "./utils/ComponentContextProvider";
import { ConcertContextProvider } from "./utils/ConcertContextProvider";

function App() {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    setTimeout(() => {
      onLoad();
    }, 8000);
  }, []);

  return (
    <AuthContextProvider>
      <ConcertContextProvider>
        <ComponentContextProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <GlobalStyle />
            {!loaded && <Loading />}
            <Header />
            <Outlet />
          </LocalizationProvider>
        </ComponentContextProvider>
      </ConcertContextProvider>
    </AuthContextProvider>
  );
}

export default App;
