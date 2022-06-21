



export const stringifyProperties = (obj)=>{
    let string = "";
    for (let p in obj){
        string = string+obj[p]
    }
    return string
}