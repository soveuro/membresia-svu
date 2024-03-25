export const objToInsertSql = (table:string,obj:any)=>{
    return `INSERT INTO ${table} (
        ${Object.keys(obj).join(', ')}
      )
      VALUES
        (${Object.values(obj).map(e=>isNaN(Number(e))?`"${e}"`:e===""?"":Number(e)).join(', ')})`
}