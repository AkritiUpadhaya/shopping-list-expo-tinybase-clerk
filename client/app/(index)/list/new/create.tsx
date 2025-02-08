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
            {/* <SafeAreaView className=""> */}
                <View className="flex-row items-center ">
                    <TextInput 
                    placeholder="Grocery Essentials" 
                    variant="ghost"
                    value={listName}
                    onChangeText={setListName}
                    onSubmitEditing={()=>{handleCreateList}}
                    returnKeyType="done"
                    autoFocus
                    />
                    <Link href={'/'}>
                    {/* <View className="h-10 w-10 items-center justify-center p-3 border-2 border-gray-500 rounded-full"> */}
                        <Text className="text-xl">{"🥹"}</Text>
                    {/* </View> */}
                    </Link>

                    <Link href={'/'}>
                    {/* <View className="h-10 w-10 items-center justify-center p-3 border-2 border-gray-500 rounded-full"> */}
                        <View style={{
                            width:24,
                            height:24,
                            borderRadius:100,
                            backgroundColor:"blue"
                        }}/>
                    {/* </View> */}
                    </Link>

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
            {/* </SafeAreaView> */}
        </BodyScrollView>
        </>
    )
}