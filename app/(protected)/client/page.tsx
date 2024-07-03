"use client";
import UserInfo from "@/components/UserInfo";
import { useCurrentUser } from "@/hooks/use-current-user";
// import { useSession } from 'next-auth/react';
import React from "react";

const ClientPage = () => {
  const user = useCurrentUser();
  return <UserInfo label="📱 Client component" user={user} />;
};

export default ClientPage;
