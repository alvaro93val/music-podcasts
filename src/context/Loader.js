import React, { createContext, useState } from 'react';

const LoaderContext = createContext({
  showLoader: true,
  setShowLoader: null
});

export const LoaderProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <LoaderContext.Provider value={{ showLoader, setShowLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
export default LoaderContext;
