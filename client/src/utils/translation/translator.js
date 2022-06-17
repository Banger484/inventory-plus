import {translations} from  "./translationLibrary"

export const t = (phrase)=>{
    console.log(phrase)
    console.log(translations)
    if (translations?.[phrase]){
        return translations[phrase]
    }
    else{
        return phrase
    }
}