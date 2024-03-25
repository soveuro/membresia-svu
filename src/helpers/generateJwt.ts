//@ts-ignore
import jwt from "jsonwebtoken";

// deno-lint-ignore no-explicit-any
const generateJWT = (uid:any,device:any,secret:string) => {
    const token = jwt.sign(
        {uid, device},
        secret,
        {expiresIn: "9999999999999999999999999h"}
    );

    if(!token) return {ok:false,message:"Error generating token"}
    return token
};

export default generateJWT;