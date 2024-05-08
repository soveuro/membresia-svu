import { routeLoader$ } from "@builder.io/qwik-city"
import jwt from "jsonwebtoken";

export async function checkSession (requestEvent){
    const {cookie,cacheControl,redirect} = requestEvent
    cacheControl({
      public: false,
      maxAge: 0,
      sMaxAge: 0,
      staleWhileRevalidate: 0,
    })

    const token = cookie.get("jwt")
    console.log(!!token)
    if(!!token) throw redirect(302, "/app")
    
    
}