import React, { useEffect, useState } from "react";
import { Link, router, Stack } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";
import TextInput from "~/components/text-input";
import Button from "~/components/Button";
import { useListCreation } from "~/context/ListCreationContext";
import { backgroundColors, emojies } from "~/constants/Colors";
import { useAddShoppingListCallback } from "~/stores/ShoppingListsStore";

export default function CreateList(){
    const [listName, setListName]= useState("")
    const [listDescription, setListDescription]= useState("")
    const {selectedColor, selectedEmoji, setSelectedColor, setSelectedEmoji}= useListCreation()
    const useAddShoppingList= useAddShoppingListCallback()

    useEffect(()=>{
        setSelectedColor(backgroundColors[Math.floor(Math.random()*backgroundColors.length)])
        setSelectedEmoji(emojies[Math.floor(Math.random()*emojies.length)])

        return()=>{
            setSelectedColor("")
            setSelectedEmoji("")
        }
    }, [])

    const handleCreateList=()=>{
        if(!listName){
            return
        }
        const listId = useAddShoppingList(listName, listDescription, selectedColor, selectedEmoji)
        router.replace(`/list/${listId}`)
    }
    return (
        <>
        <Stack.Screen
        options={{
            headerTitle: "New List"
        }}
        />
        <BodyScrollView contentContainerStyle={{padding:30}}>
            <View className="flex-row items-center justify-between space-x-2">
                <View className="flex-1">
                    <TextInput 
                    placeholder="Grocery Essentials" 
                    variant="ghost"
                    value={listName}
                    onChangeText={setListName}
                    onSubmitEditing={()=>{handleCreateList}}
                    returnKeyType="done"
                    autoFocus
                    />
                </View>
                <View className="flex-row items-center space-x-2">
                    <Link href={'/(index)/list/new/emoji-picker'}>
                        <Text className="text-2xl">{selectedEmoji}</Text>
                    </Link>

                    <Link href={'/(index)/list/new/color-picker'}>
                        <View style={{
                            width:24,
                            height:24,
                            borderRadius:100,
                            backgroundColor: selectedColor
                        }}/>
                    </Link>
                </View>
            </View>

            <TextInput
                placeholder="description (optional)"
                value={listDescription}
                onChangeText={setListDescription}
                onSubmitEditing={handleCreateList}
                returnKeyType="done"
                variant="ghost"
                inputStyle={{
                    fontSize:16,
                    fontWeight:"500"
                }}
            />
            <Button
                onPress={handleCreateList}
                disabled={!listName}
                variant="ghost">Create list</Button>
        </BodyScrollView>
        </>
    )
}