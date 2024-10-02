import { Outlet } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AuthContextProvider } from "./utils/AuthContextProvider";
import { ComponentContextProvider } from "./utils/ComponentContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ComponentContextProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <GlobalStyle />
            <Header />
            <Outlet />
          </LocalizationProvider>
        </ComponentContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
