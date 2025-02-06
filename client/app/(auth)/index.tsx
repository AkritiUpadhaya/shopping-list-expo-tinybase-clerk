import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import Button from '~/components/Button'
import TextInput from '~/components/text-input'
import { BodyScrollView } from '~/components/BodyScrollView'
import { useColorScheme } from 'react-native'
import { router } from 'expo-router'
import { ClerkAPIError } from '@clerk/types'
const SignIn = () => {
  const {signIn, setActive, isLoaded}= useSignIn()
  // const router = useRouter();
  const [emailAddress, setEmailAddress]= useState('')
  const [password, setPassword]= useState("")
  const [isSignIn, setIsSignIn]= useState(false)
  const colorScheme = useColorScheme()
  const[error, setError]= useState<ClerkAPIError[]>([])
  
  const onSignPress=React.useCallback(async()=>{
    if(!isLoaded) return

    try{
      const signInAttempt= await signIn.create({
        identifier:emailAddress,
        password
      })
      if(signInAttempt.status==="complete"){
        await setActive({session:signInAttempt.createdSessionId})
        router.replace("./(index)")
      }
      else{
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
     
    }
    catch(error){
      console.error(JSON.stringify(error, null, 2))
    }
    finally{
      setIsSignIn(false)
    }
  }, [isLoaded, emailAddress, password, signIn, router, setActive])
  return (
    <BodyScrollView 
    contentContainerStyle={{
      padding: 16,
      marginTop:50
    }}>
        <SafeAreaView>
        <Text className='text-3xl text-black font-bold mb-5'>Sign in</Text>
        <TextInput label='Email' placeholder='Enter your email'
        autoCapitalize='none'
        keyboardType='email-address'
        onChangeText={setEmailAddress} />

        <TextInput label='Password' placeholder='Enter your password'
        autoCapitalize='none'
        secureTextEntry={true}
        onChangeText={setPassword} />
        <Button onPress={onSignPress}
        loading={isSignIn}
        disabled={!emailAddress || !password}>Sign in</Button>
        {error.map((error)=>(
            <Text key={error.longMessage} style={{color:'red'}}>{error.longMessage}</Text>
          ))}

        <View className='mt-4'>
          <Text className='text-center'>Dont have an account?</Text>
          <Button onPress={() => router.push('./sign-up')} variant='ghost'>Sign up</Button>
        </View>

        <View className='mt-4'>
          <Text className='text-center'>Forgot your password?</Text>
          <Button onPress={() => router.push('./reset-password')} variant='ghost'>Reset password</Button>
        </View>
        </SafeAreaView>
     
    </BodyScrollView>
  )
}

export default SignIn