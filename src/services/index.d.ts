export type NativeSignupForm = {
  name: string;
  email: string;
  password: string;
};

export type EggSignupReturn = {
  status: boolean;
  msg: string;
};

export type SignUpReturn = {
  responseBody: EggSignupReturn;
  status: number;
};

export type UserData = {
  id: number;
  email: string;
  name: string;
  token: string;
};

export type EggLoginReturn = {
  status: boolean;
  msg: string;
  data: undefined | userData;
};

export type JwtDecodedTokenType = {
  id: number;
  email: string;
  iat: number; // Timestamp in millsecond
  exp: number; // Timestamp in millsecond
};
