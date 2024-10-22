import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import Concert from "./pages/Concert.tsx";
import ConcertList from "./pages/ConcertList";
import FansSupport from "./pages/FansSupport/index.tsx";
import Home from "./pages/Home";
import Keep from "./pages/Keep.tsx";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import TransportationDriving from "./pages/TransportationDriving.tsx";
import TransportationPublic from "./pages/TransportationPublic.tsx";
import View from "./pages/View";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="view" element={<View />} />
          <Route path="transportation-public" element={<TransportationPublic />} />
          <Route path="transportation-driving" element={<TransportationDriving />} />
          <Route path="concertlist" element={<ConcertList />} />
          <Route path="concert" element={<Concert />} />
          <Route path="fanssupport" element={<FansSupport />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="keep" element={<Keep />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
