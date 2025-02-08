import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import { SafeAreaView, Text, View } from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";
import TextInput from "~/components/text-input";

export default function CreateList(){
    const [listName, setListName]= useState("")
    const handleCreateList=()=>{}
    return (
        <>
        <Stack.Screen
        options={{
            headerTitle: "New List"
        }}
        />
        <BodyScrollView contentContainerStyle={{padding:16}}>
            <SafeAreaView>
                <View>
                    <TextInput 
                    placeholder="Grocery Essentials" 
                    variant="ghost"
                    value={listName}
                    onChangeText={setListName}
                    onSubmitEditing={()=>{handleCreateList}}
                    returnKeyType="done"
                    autoFocus
                    className="flex-1 text-2xl mb-0  "/>
                    <Link href={'/'} asChild>
                    <View className=" justify-center  border-2 border-gray-500 rounded-lg">
                        <Text>{"🥹"}</Text>
                    </View>
                    </Link>
                </View>
                <Text>
                    Create list
                </Text>
            </SafeAreaView>
        </BodyScrollView>
        </>
    )
}