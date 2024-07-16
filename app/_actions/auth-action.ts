"use server";

import { cookies } from "next/headers";

import { TAuthenticateSchema } from "../auth/_pageResources/components/SignIn/SignIn";
import { TUser } from "../_contexts/UserContext";

type TToastError = {
  title: string;
  description: string;
};

export const AuthAction = async (
  props: TAuthenticateSchema,
): Promise<TUser | TToastError> => {
  const responseData = await fetch(
    "https://kevllotte-api.onrender.com/sessions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(props),
    },
  );

  if (responseData.status === 200) {
    const responseAuth = await responseData.json();

    cookies().set("tokenAccess", responseAuth.accessToken);

    const responseInfoUser = await fetch(
      "https://kevllotte-api.onrender.com/me",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${responseAuth.accessToken}`,
        },
      },
    );

    return responseInfoUser.json();
  } else if (responseData.status === 401) {
    return {
      title: "Error",
      description: "Invalid credentials, please try again.",
    };
  } else {
    return {
      title: "Error",
      description: "Service temporarily unavailable, please try later.",
    };
  }
};
