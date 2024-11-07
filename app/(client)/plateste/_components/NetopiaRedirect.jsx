"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const NetopiaRedirect = ({ error, payment }) => {
  const router = useRouter();
  const ref = useRef();

  useEffect(() => {
    if (error?.code === "101" && payment?.paymentURL) {
      ref.current.click();
    }
  }, [error, payment]);

  if (!error?.code === "101" || !payment?.paymentURL) {
    return null;
  }

  return (
    <button
      className="hidden"
      onClick={() => router.push(payment.paymentURL)}
      ref={ref}
      type="button"
    />
  );
};

export default NetopiaRedirect;
