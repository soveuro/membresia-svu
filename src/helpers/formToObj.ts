export const formToObj = (form:any)=> Object.values(form.elements)
    .filter((i:any)=>i.type!="submit")
    .reduce((acc,input) => 
    {
            const {id,value} = input as any
            acc[id] = value
        return acc
    }
,{})