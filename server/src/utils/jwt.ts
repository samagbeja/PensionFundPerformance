// import config from "config";
import jwt from "jsonwebtoken";
import fs from "fs";
// const publicKeyStr = process.env.PUBLIC_KEY as string;
// const privateKeyStr = process.env.PRIVATE_KEY as string;

// const publicKey = Buffer.from(publicKeyStr, "base64").toString("ascii");
// const privateKey = Buffer.from(privateKeyStr, "base64").toString("ascii");
// const publicKey = fs.readFileSync("pem/public.pem");
const privateKey = fs.readFileSync("pem/private.pem");
// const privateKey = process.env.PRIVATE_KEY as string;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt<T>(token: string): T | null {
  try {
    const decoded = jwt.verify(token, privateKey) as T; //publickey
    return decoded;
  } catch (e) {
    return null;
  }
}
