import * as React from 'react'
import { useLocalSearchParams } from "expo-router"
import { FlatList, Text } from 'react-native'
import ShoppingListItem from '~/components/ShoppingListItem'

export default function ListScreen(){
    const {listId}= useLocalSearchParams() as {listId: string}
    return(
        <>
        <FlatList 
        data={shoppingListIds}
        renderItem={({item})=>
        <ShoppingListItem listId={listId}/>}/>
        </>
    )
}