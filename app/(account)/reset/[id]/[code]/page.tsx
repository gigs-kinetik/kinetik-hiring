"use client";

import { createClient } from "@supabase/supabase-js";
import { sha256 } from "js-sha256";
import { useParams } from "next/navigation";
import React, { useState } from "react";

export default function ResetPage() {
  const { id, code } = useParams();
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const supabase = createClient(
    "https://fbewajkbzwqrhapfxdpj.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZiZXdhamtiendxcmhhcGZ4ZHBqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDQyNzI3NywiZXhwIjoyMDQ2MDAzMjc3fQ.tF4Qpke91H_mSMrAXXCDgKY5N-TBmG9eLWV1Mq1gzkw"
  );

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (verify !== password) {
      alert("Passwords don't match");
      return;
    }

    async function fetch() {
      let company = true;
      let res = await supabase
        .from("company_access_codes")
        .select()
        .eq("access_code", code)
        .eq("operation", "reset_password")
        .gt("valid_until", new Date(Date.now()).toUTCString())
        .eq("company_id", id);
      if (res.error) {
        company = false;
        res = await supabase
          .from("user_access_codes")
          .select()
          .eq("access_code", code)
          .eq("operation", "reset_password")
          .gt("valid_until", new Date(Date.now()).toUTCString())
          .eq("user_id", id);
      }

      if (res.error) {
        alert("Password reset failed!");
        return;
      }

      function salt() {
        function generateCryptoRandomString(length = 64) {
          const charset =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          const randomValues = new Uint32Array(length);
          crypto.getRandomValues(randomValues);

          return Array.from(randomValues)
            .map((x) => charset[x % charset.length])
            .join("");
        }
        const s = generateCryptoRandomString();
        return [
          s.substring(0, Math.floor(s.length / 2)) +
            password +
            s.substring(Math.ceil(s.length / 2)),
          s,
        ];
      }

      const [h, s] = salt();
      const r = await supabase
        .from(company ? "companies" : "users")
        .update({
          hashed_password: sha256(h),
          salt: s,
        })
        .eq(company ? "company_id" : "user_id", id);

      if (r.error) alert("Password reset failed!");
      else alert(`Success! ${sha256(h)}`);
    }

    fetch();
  }

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={password}
        placeholder="Enter password here"
        onChange={(v) => setPassword(v.target.value)}
      />
      <input
        type="text"
        value={verify}
        placeholder="Verify password here"
        onChange={(v) => setVerify(v.target.value)}
      />
      <input type="submit" />
    </form>
  );
}
