import * as React from 'react'
import { Text, View } from 'react-native'
import { useShoppingListProductCount, useShoppingListUserNicknames, useShoppingListValue } from '~/stores/ShoppingListStore'
export default function ShoppingListItem({listId}:{listId:string}){
    const [name]= useShoppingListValue(listId, "name")
    const [emoji]= useShoppingListValue(listId, "emoji")
    const productCount= useShoppingListProductCount(listId)
    const userNicknames= useShoppingListUserNicknames(listId)
    return(
        <>
        <View>
            <Text>{emoji}{name}</Text>
        </View>
        </>
    )
}