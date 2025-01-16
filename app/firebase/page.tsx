"use client";
import generateEnhancedFingerprint from '../../lib/fingerPrint';

import { Button } from "@/components/ui/button";
import useFcmToken from "@/hooks/useFcmToken";
import { useEffect, useState } from 'react';

export default function Home() {
  const [fingerprint, setFingerprint] = useState<string | null>();

  const { token, notificationPermissionStatus } = useFcmToken();


  useEffect(() => {
    const fetchFingerprint = async () => {
      const fingerprintResult = await generateEnhancedFingerprint();
      setFingerprint(fingerprintResult);
      console.log("Browser Fingerprint:", fingerprintResult);
    };

    fetchFingerprint();
  }, []);

  const handleTestNotification = async () => {
    const response = await fetch("http://localhost:7000/api/firebase", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: "Test Notification",
        message: "This is a test notification",
        link: "/socket",
      }),
    });

    const data = await response.json();
    console.log(data);


    if (!response.ok) {
      throw new Error(data.error || "Failed to send notification");
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Firebase Cloud Messaging Demo</h1>

      {notificationPermissionStatus === "granted" ? (
        <>
          <p>Permission to receive notifications has been granted. token is {token}</p>
          <p>fingerprint is {fingerprint}</p>
        </>
      ) : notificationPermissionStatus !== null ? (
        <p>
          You have not granted permission to receive notifications. Please
          enable notifications in your browser settings.
        </p>



      ) : (<>
        <p>fingerprint is {fingerprint}</p>
      </>)}

      <Button
        disabled={!token}
        className="mt-5"
        // onClick={handleTestNotification}
        onClick={handleTestNotification}
      >
        Send Test Notification
      </Button>
    </main>
  );
}
