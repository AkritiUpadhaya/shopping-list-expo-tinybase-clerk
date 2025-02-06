import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import Button from '~/components/Button'
import { BodyScrollView } from '~/components/BodyScrollView'
import { SignedOut, useClerk } from '@clerk/clerk-expo'


const Home = () => {
  const {signOut}= useClerk()
  return (
    <BodyScrollView contentContainerStyle={{padding:16}}>
    {/* <View className='flex-1'> */}
        <SafeAreaView>
        <Text className='text-2xl text-black text-center'>home screen </Text>
        <Button onPress={signOut}>Sign out</Button>
        </SafeAreaView>
      
    {/* </View> */}
    </BodyScrollView>
  )
}

export default Home