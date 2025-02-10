import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { emojies } from '~/constants/Colors'
import { useListCreation } from '~/context/ListCreationContext'
import { router } from 'expo-router'

const EmojiPickerScreen = () => {
    const {setSelectedEmoji}= useListCreation()
    const handleEmojiSelect=(emoji:string)=>{
        setSelectedEmoji(emoji)
        router.back()
    }
  return (
   <FlatList 
   data={emojies}
   renderItem={({item})=>(
    <Pressable className='flex-1 justify-center items-center'
    onPress={()=>handleEmojiSelect(item)}>
        <Text className='text-6xl'>{item}</Text>
    </Pressable>
   )}
   numColumns={5}
   keyExtractor={(item)=>item}
   automaticallyAdjustContentInsets
   contentInsetAdjustmentBehavior='automatic'
   className='p-8 pb-7'
   />
  )
}

export default EmojiPickerScreen