import * as React from 'react'
import { useLocalSearchParams } from "expo-router"
import { FlatList, Text } from 'react-native'

export default function ListScreen(){
    const {listId}= useLocalSearchParams() as {listId: string}
    return(
        <>
        <FlatList 
        data={[listId]}
        renderItem={({item})=>
        <Text>
            {item}
        </Text>}/>
        </>
    )
}