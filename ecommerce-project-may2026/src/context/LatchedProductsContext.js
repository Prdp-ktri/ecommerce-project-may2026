import React, { createContext, useState } from "react";

export const LatchedProductsContext = createContext();

export function LatchedProductsProvider({ children }) {
  const [latchedProducts, setLatchedProducts] = useState([]);
  return (
    <div>
      <LatchedProductsContext.Provider
        value={{ latchedProducts, setLatchedProducts }}
      >
        {children}
      </LatchedProductsContext.Provider>
    </div>
  );
}

export default LatchedProductsProvider;
