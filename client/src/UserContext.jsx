import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext({});

// Create and export the provider component
export function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState({});
    return (
        <UserContext.Provider value={{userInfo,setUserInfo}}>
            {children}
        </UserContext.Provider>
    );
}
