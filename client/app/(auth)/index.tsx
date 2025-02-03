import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useSignIn } from '@clerk/clerk-expo'

const SignIn = () => {
  const {signIn, setActive, isLoaded}= useSignIn()
  return (
    <View className='flex-1 items-center justify-center'>
        <SafeAreaView>
        <Text className='text-2xl text-black text-center'>Sign In Hello hello</Text>
        </SafeAreaView>
     
    </View>
  )
}

export default SignIn