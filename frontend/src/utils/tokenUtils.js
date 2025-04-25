export const saveToken = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  };
  
  export const getToken = () => localStorage.getItem('token');
  export const getRole = () => localStorage.getItem('role');
  export const removeAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };
  export const isLoggedIn = () => !!getToken();

  export function getTokenPayload() {
    const token = getToken();
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      return null;
    }
  }