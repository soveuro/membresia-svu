import jwt from "jsonwebtoken";

export function checkSession (requestEvent){
    const {cookie,redirect,request,cacheControl,env} = requestEvent
    cacheControl({
      public: false,
      maxAge: 0,
      sMaxAge: 0,
      staleWhileRevalidate: 0,
    })
    const token = cookie.get("jwt")
    console.log(!!token)
    if(!!token) throw redirect(302,"/app/user")
    try{
      const {uid,device} = jwt.verify(token?.value, env.get("SECRETORPRIVATEKEY"))
      
      console.log(uid,device)
      /*if(device!=request.headers.get("user-agent")) {
        cookie.delete("jwt")
        throw redirect(302,"/ingresar")
      }*/

      return {ok:false, message:'Not logged'}
  
    }catch(e){
  
  
    }
}