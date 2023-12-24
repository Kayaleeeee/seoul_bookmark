"use client";

import { useEffect } from "react";

const KakaoOauthCallbackPage = () => {
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (!!code) {
      window.opener.postMessage(
        { source: "LoginKakaoOAuthCallback", payload: code },
        window.location.origin
      );
      window.close();
    }
  }, []);

  return null;
};

export default KakaoOauthCallbackPage;
