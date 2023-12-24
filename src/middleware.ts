import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const authToken = request.cookies.get("accessToken")?.value;

  if (request.url.includes("/login") && !!authToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

// //middleware 거치도록 설정
export const config = {
  matcher: ["/login"],
};
