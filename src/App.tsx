import { Outlet } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AuthContextProvider } from "./utils/AuthContextProvider";

function App() {
  return (
    <AuthContextProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GlobalStyle />
        <Header />
        <Outlet />
      </LocalizationProvider>
    </AuthContextProvider>
  );
}

export default App;
