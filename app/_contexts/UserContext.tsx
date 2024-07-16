"use client";

import { createContext, useState } from "react";

export const UserContext = createContext({} as TUserContextType);

export function UserContextProvider({ children }: TUserContextProviderProps) {
  const [user, setUser] = useState<TUser["author"] | null>(null);

  const handleSetUser = (user: TUser["author"]) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
}

type TUserContextType = {
  user: TUser["author"] | null;
  handleSetUser: (user: TUser["author"]) => void;
};

export type TUser = {
  author: {
    id: string;
    name: string;
    email: string;
    bio?: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt?: string;
  };
};

type TUserContextProviderProps = {
  children: React.ReactNode;
};
