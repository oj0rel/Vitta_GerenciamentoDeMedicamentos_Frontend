import apiManager from "./apiManager";

type UsuarioLoginData = {
  usuario_email: string;
  usuario_senha: string;
}

export const usuarioLogin = async (data: UsuarioLoginData) => {
  try {
    const result = await apiManager('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });

    return result;
  } catch (error) {
    if (error && typeof error === 'object' && 'response' in error) {
      const apiError = error as { response: { data: unknown } };
      return apiError.response.data;
    }

    console.error("Erro inesperado no login: ", error);
    return { success: false, message: "Ocorreu um erro inesperado." };
  }
};