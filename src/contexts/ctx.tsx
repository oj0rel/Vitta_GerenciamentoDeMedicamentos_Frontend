import { UsuarioCadastroData, UsuarioLoginData } from "@/src/types/authTypes";
import React from "react";
import { usuarioCadastro, usuarioLogin } from "../api/usuarioApi";
import { useStorageState } from "../hooks/useStorageState";

type AuthContextData = {
  signUp: (data: UsuarioCadastroData) => Promise<void>;
  signIn: (data: UsuarioLoginData) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextData>({
  signUp: async () => {},
  signIn: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
});

export function useSession() {
  const value = React.useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />")
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signUp: async(data: UsuarioCadastroData) => {
          const response = await usuarioCadastro(data);

          if (response.token) {
            setSession(response.token);
          }
        },
        signIn: async (data: UsuarioLoginData) => {
          const response = await usuarioLogin(data);

          if (response.token) {
            setSession(response.token);
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}