import { router } from "expo-router";
import { useMemo, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";
import Button from "~/components/Button";
import IconCircle from "~/components/IconCircle";
import TextInput from "~/components/text-input";
import { emojies,backgroundColors } from "~/constants/Colors";


const isValidId=(id:string | null)=>{
    if(!id) return false

    const idRegex=
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return idRegex.test(id);
}

export default function NewList(){
    const randomEmoji= useMemo(()=>emojies[Math.floor(Math.random()*emojies.length)],[]) 
    const randomColor= useMemo(()=>backgroundColors[Math.floor(Math.random()* backgroundColors.length)],[])
    const [listId, setListId] = useState("")
    const isValidListId= useMemo(()=>isValidId(listId),[listId])
    
    const joinShoppingListCallback=(listId:string)=>{
    }

    const handleJoinList=()=>{

    }
    return (
        <BodyScrollView contentContainerStyle={{padding:16, marginLeft:3, marginRight:3, gap:34}}>
            
                <View className="flex-1 items-center gap-y-5 mt-6">
                <IconCircle emoji={randomEmoji} backgroundColor={randomColor}size={60} />
                <Text className="font-bold text-4xl">
                    Better Together
                </Text>
                <Text className="text-xl font-bold">Create shared shopping list and collaborate real-time with your friends</Text>
                </View>
                
                <View className="gap-13">
                <Button className="mt-4 rounded-lg text-xl"
                onPress={()=>router.dismissTo("/list/new/create")}>Create new list</Button>
                <View className="flex-row items-center gap-x-2 mt-5">
                    <View className="line-through flex-1 h-px bg-gray-300"/>
                    <Text className="text-gray-500">or join existing</Text>
                    <View className="line-through flex-1 h-px bg-gray-300"/>
                </View>
                </View>

                <View className="gap-13">
                <TextInput 
                placeholder="Enter a list code"
                value={listId}
                onChangeText={setListId}
                onSubmitEditing={(e)=>{
                    joinShoppingListCallback(e.nativeEvent.text)
                }} />
                <Button className="mt-4 rounded-lg text-xl"
                onPress={handleJoinList} 
                disabled={!isValidListId}>
                    Join list</Button>
                <Button 
                className="mt-4 text-xl"
                variant="ghost"
                onPress={()=>router.dismissTo("/list/new/scan")}>Scan QR code</Button>
                
                </View>
            
        </BodyScrollView>
    )
}
