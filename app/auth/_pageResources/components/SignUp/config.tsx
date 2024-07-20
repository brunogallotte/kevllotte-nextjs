import {
  Email,
  Link,
  Locked,
  LogoInstagram,
  LogoLinkedin,
  LogoX,
} from "@carbon/icons-react";
import { z } from "zod";

import { GithubIcon } from "@/components/icons";

const nameSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
});

const usernameSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(4, "Username must be at least 4 characters"),
});

const emailSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
});

const socialLinksSchema = z.object({
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
});

const passwordSchema = z.object({
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});

const bioSchema = z.object({
  bio: z
    .string()
    .min(10, "Your bio must contain at least 10 characters")
    .optional(),
});

const acceptTermsSchema = z.object({
  acceptTerms: z.string().min(1),
});

const signupSchema = acceptTermsSchema
  .and(nameSchema)
  .and(emailSchema)
  .and(usernameSchema)
  .and(passwordSchema)
  .and(bioSchema)
  .and(socialLinksSchema);

export const signUpConfig = [
  {
    checkbox: {
      label: "Name",
      labelPlacement: "outside",
      placeholder: "Enter your name",
      size: "lg",
      variant: "bordered",
    },
    schema: acceptTermsSchema,
    name: "acceptTerms",
  },
  {
    input: {
      label: "Name",
      labelPlacement: "outside",
      placeholder: "Enter your name",
      size: "lg",
      variant: "bordered",
      isRequired: true,
    },
    schema: nameSchema,
    name: "name",
  },
  {
    input: {
      label: "Email address",
      labelPlacement: "outside",
      placeholder: "Enter your e-mail",
      size: "lg",
      startContent: <Email className="text-zinc-500 min-w-6 min-h-6" />,
      variant: "bordered",
      isRequired: true,
    },
    schema: emailSchema,
    name: "email",
  },
  {
    input: {
      label: "Username",
      labelPlacement: "outside",
      placeholder: "Enter your username",
      size: "lg",
      startContent: <Email className="text-zinc-500 min-w-6 min-h-6" />,
      variant: "bordered",
      isRequired: true,
    },
    schema: usernameSchema,
    name: "username",
  },
  {
    inputs: [
      {
        label: "Password",
        labelPlacement: "outside",
        placeholder: "Enter your password",
        size: "lg",
        isClearable: true,
        type: "password",
        startContent: <Locked className="text-zinc-500 min-w-6 min-h-6" />,
        variant: "bordered",
        isRequired: true,
      },
      {
        label: "Confirm Password",
        labelPlacement: "outside",
        placeholder: "Confirm your password",
        size: "lg",
        isClearable: true,
        type: "password",
        startContent: <Locked className="text-zinc-500 min-w-6 min-h-6" />,
        variant: "bordered",
        isRequired: true,
      },
    ],
    schema: passwordSchema,
    name: ["password", "confirmPassword"],
  },
  {
    textarea: {
      label: "Bio",
      labelPlacement: "outside",
      placeholder: "Tell us about yourself",
      size: "lg",
      variant: "bordered",
    },
    schema: bioSchema,
    name: "bio",
  },
  {
    inputs: [
      {
        label: "Linkedin",
        labelPlacement: "outside",
        placeholder: "Enter your linkedin url",
        size: "lg",
        startContent: (
          <LogoLinkedin className="text-zinc-500 min-w-6 min-h-6" />
        ),
        variant: "bordered",
      },
      {
        label: "Github",
        labelPlacement: "outside",
        placeholder: "@your_username",
        size: "lg",
        startContent: <GithubIcon className="text-zinc-500 min-w-6 min-h-6" />,
        variant: "bordered",
      },
      {
        label: "Twitter",
        labelPlacement: "outside",
        placeholder: "@your_username",
        size: "lg",
        startContent: <LogoX className="text-zinc-500 min-w-6 min-h-6" />,
        variant: "bordered",
      },
      {
        label: "Instagram",
        labelPlacement: "outside",
        placeholder: "@your_username",
        size: "lg",
        startContent: (
          <LogoInstagram className="text-zinc-500 min-w-6 min-h-6" />
        ),
        variant: "bordered",
      },
      {
        label: "Website",
        labelPlacement: "outside",
        placeholder: "https://yourwebsite.com",
        size: "lg",
        startContent: <Link className="text-zinc-500 min-w-6 min-h-6" />,
        variant: "bordered",
      },
    ],
    schema: signupSchema,
    name: [
      "linkedinUrl",
      "githubUrl",
      "twitterUrl",
      "instagramUrl",
      "websiteUrl",
    ],
  },
];

export type TSignUpSchema = z.infer<typeof signupSchema>;
