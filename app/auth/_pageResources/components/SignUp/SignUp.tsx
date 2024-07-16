"use client";

import { Email, Locked } from "@carbon/icons-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const SignUp = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { register, handleSubmit, formState } = useForm<TSignUpSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: TSignUpSchema) => {
    console.log(data);
  };

  return (
    <>
      <span className="cursor-pointer" onClick={onOpen}>
        Sign up
      </span>
      <Modal
        className="bg-zinc-950 border border-zinc-900"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign up</ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    classNames={{
                      mainWrapper: "mt-6",
                      label: "!text-zinc-300",
                    }}
                    errorMessage={formState.errors.email?.message}
                    isInvalid={formState.errors.email?.message ? true : false}
                    label="Email address"
                    labelPlacement="outside"
                    placeholder="Enter your e-mail"
                    size="lg"
                    startContent={
                      <Email className="text-zinc-500 min-w-6 min-h-6" />
                    }
                    variant="bordered"
                    {...register("email")}
                  />
                  <Input
                    classNames={{
                      mainWrapper: "mt-6",
                      label: "!text-zinc-300",
                    }}
                    errorMessage={formState.errors.email?.message}
                    isInvalid={formState.errors.email?.message ? true : false}
                    label="Email address"
                    labelPlacement="outside"
                    placeholder="Enter your e-mail"
                    size="lg"
                    startContent={
                      <Email className="text-zinc-500 min-w-6 min-h-6" />
                    }
                    variant="bordered"
                    {...register("email")}
                  />
                  <Input
                    isClearable
                    classNames={{
                      mainWrapper: "mt-6",
                      label: "!text-zinc-300",
                    }}
                    errorMessage={formState.errors.password?.message}
                    isInvalid={
                      formState.errors.password?.message ? true : false
                    }
                    label="Password"
                    labelPlacement="outside"
                    placeholder="Enter your password"
                    size="lg"
                    startContent={
                      <Locked className="text-zinc-500 min-w-6 min-h-6" />
                    }
                    type="password"
                    variant="bordered"
                    {...register("password")}
                  />
                  <Input
                    isClearable
                    classNames={{
                      mainWrapper: "mt-6",
                      label: "!text-zinc-300",
                    }}
                    errorMessage={formState.errors.confirmPassword?.message}
                    isInvalid={
                      formState.errors.confirmPassword?.message ? true : false
                    }
                    label="Confirm Password"
                    labelPlacement="outside"
                    placeholder="Confirm your password"
                    size="lg"
                    startContent={
                      <Locked className="text-zinc-500 min-w-6 min-h-6" />
                    }
                    type="password"
                    variant="bordered"
                    {...register("confirmPassword")}
                  />
                  <Textarea
                    className="mt-6"
                    classNames={{
                      mainWrapper: "mt-6",
                      label: "!text-zinc-300",
                    }}
                    label="Bio"
                    labelPlacement="outside"
                    placeholder="Tell us about yourself"
                    size="lg"
                    variant="bordered"
                    {...register("bio")}
                  />
                  <div className="w-full flex justify-end gap-3 mt-6 pb-4">
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      color="primary"
                      isLoading={formState.isSubmitting}
                      type="submit"
                    >
                      Action
                    </Button>
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

type TSignUpSchema = z.infer<typeof signupSchema>;

export const signupSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must have at least 8 characters long"),
  confirmPassword: z
    .string({ message: "Please, confirm your password" })
    .min(8, "Password must have at least 8 characters long"),
  bio: z.string().min(10, "Bio must have at least 10 characters long"),
});
