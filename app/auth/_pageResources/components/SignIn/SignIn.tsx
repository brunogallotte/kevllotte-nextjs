"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Email, Locked } from "@carbon/icons-react";
import { Toaster, toast } from "sonner";

import { AuthAction } from "../../../../_actions/auth-action";
import { UserContext } from "../../../../_contexts/UserContext";
import { SignUp } from "../SignUp/SignUp";

export const SignIn = () => {
  const { register, handleSubmit, formState } = useForm<TAuthenticateSchema>({
    resolver: zodResolver(authenticateSchema),
  });

  const router = useRouter();

  const { handleSetUser } = useContext(UserContext);

  const onSubmit = async (data: TAuthenticateSchema) => {
    const userAuthResponse = await AuthAction(data);

    if (userAuthResponse && "author" in userAuthResponse) {
      handleSetUser(userAuthResponse?.author);
      router.push("/feed");
    } else if ("title" in userAuthResponse) {
      toast.error(userAuthResponse.title, {
        description: userAuthResponse.description,
      });
    }
  };

  return (
    <form
      className="p-6 mx-auto min-h-screen justify-center w-full flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Toaster theme="dark" />
      <Image
        alt="Kevllotte"
        height={100}
        src="/kevllotte-logo.png"
        width={90}
      />
      <h1 className="text-3xl font-bold mt-8">Sign in to Kevllotte</h1>
      <p className="text-zinc-300 mt-2">
        Don’t have an account?{" "}
        <b className="text-sky-600">
          <SignUp />
        </b>
      </p>

      <Input
        classNames={{ mainWrapper: "mt-12", label: "!text-zinc-300" }}
        errorMessage={formState.errors.email?.message}
        isInvalid={formState.errors.email?.message ? true : false}
        label="Email address"
        labelPlacement="outside"
        placeholder="Enter your e-mail"
        size="lg"
        startContent={<Email className="text-zinc-500 min-w-6 min-h-6" />}
        variant="bordered"
        {...register("email")}
      />

      <Input
        isClearable
        classNames={{ mainWrapper: "mt-6", label: "!text-zinc-300" }}
        errorMessage={formState.errors.password?.message}
        isInvalid={formState.errors.password?.message ? true : false}
        label="Password"
        labelPlacement="outside"
        placeholder="Enter your password"
        size="lg"
        startContent={<Locked className="text-zinc-500 min-w-6 min-h-6" />}
        type="password"
        variant="bordered"
        {...register("password")}
      />
      <span className="text-sky-600 mt-2 mr-auto">Forget you password?</span>

      <Button
        className="w-full mt-8"
        color="primary"
        disabled={formState.isSubmitting}
        isLoading={formState.isSubmitting}
        size="lg"
        type="submit"
        variant="shadow"
      >
        Login
      </Button>
    </form>
  );
};

export const authenticateSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must have at least 8 characters long"),
});

export type TAuthenticateSchema = z.infer<typeof authenticateSchema>;
