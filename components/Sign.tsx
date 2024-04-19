import { auth, signIn, signOut } from "@/auth";
import React from "react";

const Sign = async () => {
  const session = await auth();
  return (
    <>
      {session && session?.user ? (
        <>
          <p>{session.user.name}</p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Signin Out</button>
          </form>
        </>
      ) : (
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <button type="submit">Signin with Google</button>
        </form>
      )}
    </>
  );
};

export default Sign;
