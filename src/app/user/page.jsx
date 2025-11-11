import React from "react";
import { auth } from "@/auth.js";
import Image from "next/image";

const UserInfo = async () => {
  const session = await auth();
  return (
    <div>
      <h1>next-auth v5 + Next 15</h1>
      <p>User signed in with name: {session?.user?.name} </p>
      <p>User signed in with Email: {session?.user?.email} </p>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          width={48}
          height={48}
          alt={session.user.name ?? "Avatar"}
          className="rounded-[50%]"
        />
      )}
    </div>
  );
};

export default UserInfo;
