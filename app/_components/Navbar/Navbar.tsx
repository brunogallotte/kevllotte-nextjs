import { Home } from "@carbon/icons-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full z-20 flex max-w-[660px] fixed bottom-4 left-[50%] translate-x-[-50%] p-2 bg-zinc-950/75 border border-zinc-900 backdrop-blur-md rounded-3xl">
      <Link className="text-zinc-300 max-w-10 w-full" href="/">
        <div className="bg-zinc-800 rounded-full max-w-10 flex items-center justify-center min-h-10">
          <Home />
        </div>
      </Link>
    </nav>
  );
};
