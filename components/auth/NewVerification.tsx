"use client";
import React, { useCallback, useEffect } from "react";
import CardWrapper from "./CardWrapper";
import { FadeLoader } from "react-spinners";
import { useState, CSSProperties } from "react";
import { useSearchParams } from "next/navigation";
import { Verification } from "@/actions/new-verification";
import FormSuccess from "../FormSuccess";
import FormError from "../FormError";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const NewVerification = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#000000");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = useCallback(() => {
    // if (success || error) {
    //   return;
    // }
    if (!token) {
      setError("Missing token!");
      return;
    }

    Verification(token)
      .then((data) => {
       if (data.success) {
        setSuccess(data.success);
       }
       if (data.error) {
        setError(data.error);  
       }
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div>
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonHref="/auth/login"
        backButtonLabel="Back to login"
      >
        <div className="flex items-center w-ful justify-center">
          {!success && !error && (
            <FadeLoader
              color={color}
              loading={loading}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}

          <FormSuccess message={success} />
          {!success && <FormError message={error} />}
        </div>
      </CardWrapper>
    </div>
  );
};

export default NewVerification;
