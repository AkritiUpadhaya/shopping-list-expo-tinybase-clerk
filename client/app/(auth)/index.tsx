import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import Button from '~/components/Button'

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
        <Link href={"/sign-up"}> go to sign up</Link>
        <Button>Hello</Button>

        </SafeAreaView>
     
    </View>
  )
}

export default SignIn