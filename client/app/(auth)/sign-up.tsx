import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { BodyScrollView } from '~/components/BodyScrollView'
import { Button } from '~/components/Button'
import { router } from 'expo-router'
import { useSignIn } from '@clerk/clerk-expo'
import TextInput from '~/components/text-input'
import { ClerkAPIError } from '@clerk/types'

const SignUp = () => {
    const {signIn, setActive, isLoaded}= useSignIn()
  const [email, setEmail]= useState('')
  const [password, setPassword]= useState("")
  const [isLoading, setIsLoading]= useState(false)
  const[error, setError]= useState<ClerkAPIError[]>([])
  const onSignUpPress=()=>{

  }
    return (
        <BodyScrollView 
        contentContainerStyle={{
          padding: 16,
          marginTop:50
        }}>
            <SafeAreaView>
            <TextInput label='Email' placeholder='Enter your email'
            autoCapitalize='none'
            keyboardType='email-address'
            onChangeText={(email)=> setEmail(email)} />
    
            <TextInput label='Password' placeholder='Enter your password'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(password)=> setPassword} />
            <Button onPress={onSignUpPress}
            loading={isLoading}
            disabled={!email || !password || isLoading}>Continue</Button>
            {error.map((error)=>(
                <Text key={error.longMessage} style={{color: "red"}}>{error.longMessage}</Text>
            ))}
            </SafeAreaView>
         
        </BodyScrollView>
      )
    }

export default SignUp