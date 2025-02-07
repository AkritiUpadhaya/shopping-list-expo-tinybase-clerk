import { View, Text, SafeAreaView, Pressable } from 'react-native'
import React from 'react'
import Button from '~/components/Button'
import { BodyScrollView } from '~/components/BodyScrollView'
import { SignedOut, useClerk } from '@clerk/clerk-expo'
import { router, Stack } from 'expo-router'
import {AntDesign, FontAwesome} from '@expo/vector-icons';

const Home = () => {
  const {signOut}= useClerk()
  const renderHeaderRight=()=>{
    return(
      <Pressable
      onPress={()=>{router.push('/list/new')}}>
        <AntDesign name="plus" size={24} color="black" />
      </Pressable>
    )}

  return (
    <>
    <Stack.Screen options={{
      title:'Home',
      headerLeft:()=>(
        <Pressable onPress={()=>{router.push('/(index)/list/new/profile')}} >
          <FontAwesome name="gear" size={24} color="black" />
        </Pressable>
        ),
      headerRight: renderHeaderRight
    }}
    />
    <BodyScrollView contentContainerStyle={{padding:16}}>
    {/* <View className='flex-1'> */}
        <SafeAreaView>
        <Text className='text-2xl text-black text-center'>home screen </Text>
        <Button onPress={signOut}>Sign out</Button>
        </SafeAreaView>
    {/* </View> */}
    </BodyScrollView>
    </>
  )
}

export default Home