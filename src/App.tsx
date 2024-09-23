import { Outlet } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <GlobalStyle />
      <Header />
      <Outlet />
    </LocalizationProvider>
  );
}

export default App;
