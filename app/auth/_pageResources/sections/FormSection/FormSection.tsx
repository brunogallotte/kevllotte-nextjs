import { twMerge } from "tailwind-merge";

import { SignIn } from "../../components/SignIn/SignIn";

import GridPattern from "@/app/_components/AnimatedGridPattern/AnimatedGridPattern";
import { ContentWrapper } from "@/app/_components/ContentWrapper";

export const FormSection = () => {
  return (
    <ContentWrapper className="flex w-full" element="section">
      <GridPattern
        className={twMerge(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-y-0 opacity-40 lg:opacity-100 lg:relative h-[800px] skew-y-12"
        )}
        duration={3}
        maxOpacity={0.1}
        numSquares={30}
        repeatDelay={1}
      />
      <div className="relative z-20 mx-auto lg:mx-0 lg:ml-auto w-full max-w-[350px] lg:bg-zinc-950">
        <SignIn />
      </div>
    </ContentWrapper>
  );
};
