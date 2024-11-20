import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header";
import Loading from "./components/Loading";
import VenueHeader from "./components/VenueHeader";
import { AuthContextProvider } from "./utils/AuthContextProvider";
import { ComponentContextProvider } from "./utils/ComponentContextProvider";
import { ConcertContextProvider } from "./utils/ConcertContextProvider";

function App() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const showVenueHeader = location.pathname === "/transportation-public" || location.pathname === "/transportation-driving" || location.pathname === "/view";
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
            {showVenueHeader && <VenueHeader />}
            <Outlet />
          </LocalizationProvider>
        </ComponentContextProvider>
      </ConcertContextProvider>
    </AuthContextProvider>
  );
}

export default App;
