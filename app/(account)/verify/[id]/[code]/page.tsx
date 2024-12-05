"use client";

import { useParams } from "next/navigation";
import { createClient, PostgrestSingleResponse } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

export default function VerifyPage() {
  const { id, code } = useParams();
  const [message, setMessage] = useState("Loading...");
  const supabase = createClient(
    "https://fbewajkbzwqrhapfxdpj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZXdhamtiendxcmhhcGZ4ZHBqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDQyNzI3NywiZXhwIjoyMDQ2MDAzMjc3fQ.tF4Qpke91H_mSMrAXXCDgKY5N-TBmG9eLWV1Mq1gzkw"
  );

  useEffect(() => {
    async function fetch() {
      let company = true;
      let res = await supabase
        .from("company_access_codes")
        .select("*")
        .eq("access_code", code)
        .eq("operation", "verify")
        .gt("valid_until", new Date(Date.now()).toUTCString())
        .eq("company_id", id);
      if (res.error || res.data.length === 0) {
        company = false;
        res = await supabase
          .from("user_access_codes")
          .select("*")
          .eq("access_code", code)
          .eq("operation", "verify")
          .gt("valid_until", new Date(Date.now()).toUTCString())
          .eq("user_id", id);
      }

      if (
        res.error ||
        !res.data ||
        res.data.length === 0 ||
        Math.floor(res.status / 100) !== 2
      )
        setMessage("Could not verify email!");
      else {
        res = (await supabase
          .from(company ? "companies" : "users")
          .update({ verified: true })
          .eq(
            `${company ? "company" : "user"}_id`,
            id
          )) as PostgrestSingleResponse<any[]>;
        if (Math.floor(res.status / 100) === 2)
          setMessage(
            "Email has been verified. This page can be closed safely now."
          );
        else setMessage("Could not verify email!");
      }
    }

    fetch();
  });

  return <h1>{message}</h1>;
}
