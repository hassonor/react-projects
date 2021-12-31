import { useState, useCallback, useEffect } from 'react';

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDateState, setTokenExpirationDateState] = useState();
  const [permissions, setPermissions] = useState(null);
  const [name, setName] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  const login = useCallback((token,isAdmin,name,permissions, expirationDate) => {
    setToken(token);
    setIsAdmin(isAdmin);
    setName(name);
    setPermissions(permissions);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDateState(tokenExpirationDate);
    localStorage.setItem('userData',JSON.stringify({
      token:token,
      isAdmin: isAdmin,
      name:name,
      expiration: tokenExpirationDate.toISOString()}))
    localStorage.setItem("permissions",JSON.stringify({
      permissions: permissions
    }))
  }, [])

  const logout = useCallback(() => {
    setName(null);
    setTokenExpirationDateState(null);
    setToken(null);
    setIsAdmin(null);
    setPermissions(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('permissions');
  }, []);

  useEffect(()=>{
    if(token && tokenExpirationDateState){
      const remainingTime = tokenExpirationDateState.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout,remainingTime)
    }
    else{
      clearTimeout(logoutTimer);
    }
  },[token,logout, tokenExpirationDateState])

  useEffect(()=> {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    const storedPermissions = JSON.parse(localStorage.getItem('permissions'));
    if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
      login(storedData.token, storedData.isAdmin, storedData.name,storedPermissions.permissions, new Date(storedData.expiration));
    }

  },[login])

  return {login, logout,token,isAdmin, name, permissions };
};

