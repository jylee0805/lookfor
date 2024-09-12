import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import Concert from "./pages/Concert";
import ConcertList from "./pages/ConcertList";
import FansSupport from "./pages/FansSupport";
import Login from "./pages/Login";
import View from "./pages/View";
import TransportationDriving from "./pages/TransportationDriving.tsx";
import TransportationPublic from "./pages/TransportationPublic.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
