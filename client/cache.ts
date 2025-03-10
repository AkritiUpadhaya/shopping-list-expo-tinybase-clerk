import { Platform } from "react-native";
import {TokenCache} from "@clerk/clerk-expo/dist/cache"
import * as SecureStore from "expo-secure-store"
const createTokenCache=():TokenCache=>{
    return {
        getToken:async(key: string)=>{
        try {
            const item = await SecureStore.getItemAsync(key)
            if(item){
                console.log(`${key} was used`);
            }
            else{
                console.log("no values tored under key:"+ key)
            }
            return item
        } catch(e){
            console.log(e)
        }
    },
    saveToken:(key:string, token:string)=>{
        return SecureStore.setItemAsync(key, token)
    }
    }
}
export const tokenCache = Platform.OS !=="web"?createTokenCache(): undefined