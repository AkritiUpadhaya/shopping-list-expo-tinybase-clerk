import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import Button from '~/components/Button'
import TextInput from '~/components/text-input'
import { BodyScrollView } from '~/components/BodyScrollView'

const SignIn = () => {
  const {signIn, setActive, isLoaded}= useSignIn()
  const router = useRouter();
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState("")
  const [isSignIn, setIsSignIn]= useState(false)
  return (
    <BodyScrollView>
        <SafeAreaView>
        <Text>Sign In</Text>
        <Link href={"/sign-up"}> go to sign up</Link>
        <Button>Hello</Button>
        <TextInput label='Hello' placeholder='Hi Hi' inputStyle={{backgroundColor: "blue"}}/>

        </SafeAreaView>
     
    </BodyScrollView>
  )
}

export default SignIn