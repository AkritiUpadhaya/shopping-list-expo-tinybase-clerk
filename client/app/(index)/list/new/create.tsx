import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";
import TextInput from "~/components/text-input";
import Button from "~/components/Button";

export default function CreateList(){
    const [listName, setListName]= useState("")
    const [listDescription, setListDescription]= useState("")
    const handleCreateList=()=>{}
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
                        <Text className="text-2xl">🥹</Text>
                    </Link>

                    <Link href={'/'}>
                        <View className="h-6 w-6 rounded-full bg-blue-500"/>
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