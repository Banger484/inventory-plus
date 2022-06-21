import {translations} from  "./translationLibrary"

export const t = (phrase)=>{

    if (translations?.[phrase]){
        return translations[phrase]
    }
    else{
        return phrase
    }
}
