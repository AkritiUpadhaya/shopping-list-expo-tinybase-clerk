import {Stack} from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
export default function AuthLayout(){
    const {isLoaded, isSignedIn}= useAuth()
    if(!isLoaded) return null
    if(isSignedIn) return <Redirect href={"/index"} />
    return(
        <Stack>
            <Stack.Screen name='index' options={{headerShown:false}} />
            <Stack.Screen name='sign-up' options={{headerShown:true, title:"Sign Up"}} />
            <Stack.Screen name='reset-password' options={{headerShown:true, title:"Reset Password"}} />
        </Stack>
    )
}