import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

const SignIn = () => {
  const {signIn, setActive, isLoaded}= useSignIn()
  const router = useRouter();
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState("")
  const [isSignIn, setIsSignIn]= useState(false)
  return (
    <View className='flex-1 items-center justify-center'>
        <SafeAreaView>
        <Text className='text-2xl text-black text-center'>Sign In Hello hello</Text>
        </SafeAreaView>
     
    </View>
  )
}

export default SignIn