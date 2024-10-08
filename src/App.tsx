import { Outlet } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";
import Header from "./components/Header";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AuthContextProvider } from "./utils/AuthContextProvider";
import { ComponentContextProvider } from "./utils/ComponentContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConcertContextProvider } from "./utils/ConcertContextProvider";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

const queryClient = new QueryClient();

function App() {
  const [loaded, setLoaded] = useState(false);
  const onLoad = () => {
    setLoaded(true);
  };

  useEffect(() => {
    // 假设在一开始或某个资源加载完成后我们设置 loaded 状态
    setTimeout(() => {
      onLoad();
    }, 5000);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
