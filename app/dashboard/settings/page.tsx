"use client";
// import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession, signOut } from "next-auth/react";

const SettingsPage = () => {
  //server component
  // const session = await auth();
  // const {name,email, role} = session?.user

  //client compnent
  // const session = useSession();
  //from hook
  const { name, email, role } = useCurrentUser();

  const onClick = () => {
    signOut();
  };
  return (
    <div className="bg-white p-10 rounded-xl">
      {/* <p>{name}</p>
      <p>{email}</p>
      <p>{role}</p> */}

      <p>{name}</p>

      <Button onClick={onClick} variant="default">
        Log out
      </Button>
    </div>
  );
};

export default SettingsPage;
