import { createClient } from "@libsql/client";

export const db = (url:string,authToken:string,sql:string) => createClient({
  url,
  authToken
}).execute(sql);
