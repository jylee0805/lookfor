import { createContext, useEffect, useState } from "react";
import api from "./api";
import { Concerts } from "../pages/ConcertList";
import { useNavigate } from "react-router-dom";

export interface ConcertContextType {
  concertData: Concerts;
  setConcertData: React.Dispatch<React.SetStateAction<Concerts>>;
  concertId: string;
  setConcertId: React.Dispatch<React.SetStateAction<string>>;
}

export const ConcertContext = createContext<ConcertContextType | null>(null);

export function ConcertContextProvider({ children }: { children: React.ReactNode }) {
  const [concertData, setConcertData] = useState<Concerts>({} as Concerts);
  const [concertId, setConcertId] = useState<string>("");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(concertId);

    const getConcert = async (concertId: string) => {
      const concert = await api.getConcert(concertId);
      if (!concert.date) {
        navigate("/");
      }
      setConcertData(concert as Concerts);
    };

    getConcert(concertId);

    console.log(concertData.concertName);
  }, [concertId]);

  return <ConcertContext.Provider value={{ concertData, setConcertData, concertId, setConcertId }}>{children}</ConcertContext.Provider>;
}