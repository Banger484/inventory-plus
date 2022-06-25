import {translations,conversions} from  "./translationLibrary"

const convert = (value,property)=>{
    console.log(conversions)
    let res = value
    for (let i = 0;i<conversions.length;i++){
        res = conversions[i].convertValue(property,value);
        if (res!==value){
            console.log("converted",value,"to",res)
            return res
        }
    }
    return res
}
export const t = (phrase,property)=>{
    console.log("translating",phrase,property)
    let res
    if (!property&&translations?.[phrase]){
        res = translations[phrase]
    }
    else{
        res = phrase
    }
    if(property){
        res = convert(phrase,property)
    }




return res.toString()
}



