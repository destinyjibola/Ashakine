"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./BackButton";
import Header from "./Header";
import { Button } from "../ui/button";
// import Social from "./Social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="flex flex-col space-y-1">
        <BackButton label={backButtonLabel} href={backButtonHref} />
        <Button variant="link" className="font-normal w-full text-primarycolor" size="sm" asChild>
          <Link href={"/"}>{"<<"}Go to homepage</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
