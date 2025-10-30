import { UsuarioCadastroData, UsuarioLoginData } from "@/src/types/authTypes";
import React, { useEffect, useState } from "react";
import { usuarioCadastro, usuarioLogin } from "../api/usuarioApi";
import { useStorageState } from "../hooks/useStorageState";
import { UsuarioResponse } from "../types/usuarioTypes";

type AuthContextData = {
  signUp: (data: UsuarioCadastroData) => Promise<void>;
  signIn: (data: UsuarioLoginData) => Promise<void>;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
  usuario: UsuarioResponse | null;
}

export const AuthContext = React.createContext<AuthContextData>({
  signUp: async () => {},
  signIn: async () => {},
  signOut: () => null,
  session: null,
  isLoading: false,
  usuario: null,
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
  const [[isLoading, session], setSession] = useStorageState("session"); // -> essa linha salva o token no disco
  const [usuario, setUsuario] = useState<UsuarioResponse | null>(null);

  useEffect(() => {
    if(!session) {
      setUsuario(null);
    }
  }, [session])

  return (
    <AuthContext.Provider
      value={{
        signUp: async(data: UsuarioCadastroData) => {
          try {
            const response = await usuarioCadastro(data);

            if (response.token && response.usuario) {
              setUsuario(response.usuario);
              setSession(response.token);
            }
          } catch (error) {
            console.error("Erro no signUp:", error);
            throw error;
          }
        },
        signIn: async (data: UsuarioLoginData) => {
          try {
            const response = await usuarioLogin(data);

            if (response.token && response.usuario) {
              setUsuario(response.usuario);
              setSession(response.token);
            }
          } catch (error) {
            console.error("Erro no signIn:", error);
            throw error;
          }
        },
        signOut: () => {
          setSession(null);
          setUsuario(null);
        },
        session,
        isLoading,
        usuario
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}