"use client";

import { createContext, useContext, useState, useMemo } from "react";

const ReservationContext = createContext();

const initialState = { from: null, to: null };

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);
  
  // Memoizar el valor del contexto para optimizar rendimiento
  const value = useMemo(() => ({
    range,
    setRange,
    resetRange: () => setRange(initialState)
  }), [range]);

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  
  // Verificación más explícita
  if (context === undefined) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  
  return context;
}

export { ReservationProvider, useReservation };