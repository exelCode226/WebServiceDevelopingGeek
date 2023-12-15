import axios from './axios'


export const registerRequest = user => axios.post(`/register`, user)

export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get('/verify')

export const sendPasswordResetEmailRequest = email => axios.post('/send-password-reset-email', { email })

export const resetPasswordRequest = (email, password, token) => axios.post('/reset-password', { email, password, token })

export const getUsersRequest = async () => {
    try {
      const response = await axios.get("/users");
      return response.data; // Devuelve los datos obtenidos de la API
    } catch (error) {
      throw error; // Maneja los errores de la solicitud adecuadamente
    }
  };

  export const deleteUserRequest = async (id) => axios.delete(`/users/${id}`);
