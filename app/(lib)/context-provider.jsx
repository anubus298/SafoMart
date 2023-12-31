"use client";

import { useState } from "react";
import { createContext } from "react";
import PocketBase from "pocketbase";

export const AuthContext = createContext();

function IsValidProvider({ children }) {
  const pb = new PocketBase(process.env.pocketBaseUrl);

  const [isValid, setisValid] = useState(pb.authStore.isValid);
  const [color, setcolor] = useState("#22c55e");
  const [showbanner, setshowbanner] = useState(true);
  return (
    <AuthContext.Provider
      value={{
        isValid,
        setisValid,
        showbanner,
        setshowbanner,
        color,
        setcolor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default IsValidProvider;
