import jwtDecode from 'jwt-decode';

const getUserFromToken = () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  }
  return null;
};
