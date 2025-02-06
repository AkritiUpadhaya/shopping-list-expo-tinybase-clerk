import { View, Text, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { BodyScrollView } from '~/components/BodyScrollView'
import { Button } from '~/components/Button'
import { router } from 'expo-router'
import { useSignIn, useSignUp } from '@clerk/clerk-expo'
import TextInput from '~/components/text-input'
import { ClerkAPIError } from '@clerk/types'

const ResetPassword = () => {
    const {signIn , setActive, isLoaded}= useSignIn()
  const [emailAddress, setEmailAddress]= useState('')
  const [password, setPassword]= useState("")
  const [isLoading, setIsLoading]= useState(false)
  const[error, setError]= useState<ClerkAPIError[]>([])
  const[pendingVerification, setPendingVerification]= useState(false)
  const [code, setCode] = useState("")

  const onResetPasswordPress=React.useCallback(async()=>{
    
      if(!isLoaded) return
      setError([])
      try {
        await signIn.create({
          strategy:"reset_password_email_code",
          identifier: emailAddress
        })
        setPendingVerification(true)
    }
    catch(e){
      console.log(e)
    }
  }, [isLoaded, emailAddress, signIn])
  const onVerifyPress= React.useCallback(async()=>{
    if(!isLoaded) return
      try{
        const signInAttempt= await signIn.attemptFirstFactor({
            strategy:"reset_password_email_code",
            code,
            password
          })
          if(signInAttempt.status==="complete"){
            await setActive({session:signInAttempt.createdSessionId})
            router.replace('./')
          }else{
            console.log(signInAttempt)
          }
      }
      catch(e){
        console.log(e)
      }
      finally{
        setIsLoading(false)
      }
  }, [isLoaded, code, password, signIn, router, setActive]) 
  
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
    
            
            <Button onPress={onResetPasswordPress}
            loading={isLoading}
            disabled={!emailAddress }>Continue</Button>
            {error.map((error)=>(
                <Text key={error.longMessage} style={{color: "red"}}>{error.longMessage}</Text>
            ))}
            </SafeAreaView>
         
        </BodyScrollView>
      )
    }

export default ResetPassword