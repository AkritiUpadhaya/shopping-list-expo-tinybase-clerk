import {Redirect, Stack} from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
export default function AuthLayout(){
    const {isLoaded, isSignedIn}= useAuth()
    if(!isLoaded) return null
    if(isSignedIn) return <Redirect href="./(index)" />
    return(
        <Stack screenOptions={{headerLargeTitle: true, headerTransparent: true}}>
            <Stack.Screen name='index' options={{headerShown:false}} />
            <Stack.Screen name='sign-up' options={{headerShown:true, headerTitle:"Sign Up"}} />
            <Stack.Screen name='reset-password' options={{headerShown:true, headerTitle:"Reset Password"}} />
        </Stack>
    )
}