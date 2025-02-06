import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { BodyScrollView } from '~/components/BodyScrollView'
import { Button } from '~/components/Button'
import { router } from 'expo-router'
import { useSignIn, useSignUp } from '@clerk/clerk-expo'
import TextInput from '~/components/text-input'
import { ClerkAPIError } from '@clerk/types'

const SignUp = () => {
    const {signUp, setActive, isLoaded}= useSignUp()
  const [emailAddress, setEmailAddress]= useState('')
  const [password, setPassword]= useState("")
  const [isLoading, setIsLoading]= useState(false)
  const[error, setError]= useState<ClerkAPIError[]>([])
  const[pendingVerification, setPendingVerification]= useState(false)
  const [code, setCode] = useState("")

  const onSignUpPress=async()=>{
    
      if(!isLoaded) return
      setIsLoading(true)
      setError([])
      try {
        await signUp.create({
          emailAddress,
          password
        })
        await signUp.prepareEmailAddressVerification({
          strategy:"email_code"
        })
        setPendingVerification(true)
    }
    catch(e){
      console.log(e)
    }
    finally{
      setIsLoading(false)
    }
  }
  const onVerifyPress= async()=>{
    if(!isLoaded) return
      setIsLoading(true)
      setError([])
      try{
        const signUpAttempt= await signUp.attemptEmailAddressVerification({
            code,
          })
          if(signUpAttempt.status==="complete"){
            await setActive({session:signUpAttempt.createdSessionId})
            router.replace('./')
          }else{
            console.log(signUpAttempt)
          }
      }
      catch(e){
        console.log(e)
      }
      finally{
        setIsLoading(false)
      }
  }
  
    if(pendingVerification){
      return(
        <BodyScrollView contentContainerStyle={{padding: 16}}>
          <TextInput value={code} label={`Enter the verification code we sent tp ${emailAddress}`}
          placeholder='Enter your verification code'
          onChangeText={(code)=> setCode(code)}/>
          <Button onPress={onVerifyPress}>Verify</Button>
          {error.map((error)=>(
            <Text key={error.longMessage} style={{color:'red'}}>{error.longMessage}</Text>
          ))}
        </BodyScrollView>
      )
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
            onChangeText={(email)=> setEmailAddress(email)} />
    
            <TextInput label='Password' placeholder='Enter your password'
            autoCapitalize='none'
            secureTextEntry={true}
            onChangeText={(password)=> setPassword(password)} />
            <Button onPress={onSignUpPress}
            loading={isLoading}
            disabled={!emailAddress || !password || isLoading}>Continue</Button>
            {error.map((error)=>(
                <Text key={error.longMessage} style={{color: "red"}}>{error.longMessage}</Text>
            ))}
            </SafeAreaView>
         
        </BodyScrollView>
      )
    }

export default SignUp