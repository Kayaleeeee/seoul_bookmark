import jwt, { JwtPayload } from "jsonwebtoken";

type SignOption = {
  expiresIn?: string | number;
};

export const MAX_AGE = 1209600;

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: MAX_AGE,
};

export const signJwtAccessToken = (
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) => {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
};

export const verifyJwt = (token: string): null | JwtPayload => {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);

    return decoded as JwtPayload;
  } catch (e) {
    console.log("error to verify token", e);
    return null;
  }
};

export const issueJwtAccessToken = (payload: JwtPayload) => {
  try {
    const accessToken = signJwtAccessToken(payload);
    const refreshToken = signJwtAccessToken(payload, { expiresIn: "1y" });

    return {
      accessToken,
      refreshToken,
    };
  } catch (e) {
    console.log("ERROR on issuing access token", e);
    return null;
  }
};
