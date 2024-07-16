import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const verifyJwtAction = async () => {
  const tokenJwt = cookies().get("tokenAccess");

  if (!tokenJwt) {
    redirect("/");
  }

  const user = await fetch("https://kevllotte-api.onrender.com/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenJwt.value}`,
    },
  });

  if (!user) {
    redirect("/");
  }
};
