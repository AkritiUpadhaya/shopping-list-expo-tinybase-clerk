import { View, Text, SafeAreaView, Pressable, FlatList } from 'react-native'
import React from 'react'
import Button from '~/components/Button'
import { BodyScrollView } from '~/components/BodyScrollView'
import { SignedOut, useClerk } from '@clerk/clerk-expo'
import { Link, router, Stack } from 'expo-router'
import {AntDesign, FontAwesome} from '@expo/vector-icons';
import { useShoppingListIds } from '~/stores/ShoppingListsStore'
import IconCircle from '~/components/IconCircle'

const Home = () => {
  const {signOut}= useClerk()
  const shoppingListIds= useShoppingListIds()
  const renderHeaderRight=()=>{
    return(
      <Pressable
      onPress={()=>{router.push('/list/new')}}>
        <AntDesign name="plus" size={24} color="black" />
      </Pressable>
    )}
    const renderEmptyList=()=>{
      return(
      <BodyScrollView>
        <IconCircle 
        emoji='🛒'
        backgroundColor='blue'/>
        <Button onPress={()=> router.push("/list/new")}>create your first list</Button>
      </BodyScrollView>
      )
    }

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
    <FlatList 
    data={shoppingListIds}
    renderItem={({item:listId})=>
      <Link href={`/list/${listId}`}>{listId}</Link>
    }
    contentInsetAdjustmentBehavior='automatic'
    ListEmptyComponent={renderEmptyList}
    />
    </>
  )
}

export default Home