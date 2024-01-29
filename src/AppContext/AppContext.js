import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const setProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <AppContext.Provider value={{ selectedProduct, setProduct }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
