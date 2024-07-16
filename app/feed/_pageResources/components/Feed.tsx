import { verifyJwtAction } from "@/app/_actions/verify-jwt-action";

export const Feed = async () => {
  await verifyJwtAction();

  return (
    <div>
      <h1>Feed</h1>
    </div>
  );
};
