import { View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import { backgroundColors, Colors, emojies } from '~/constants/Colors'
import { useListCreation } from '~/context/ListCreationContext'
import { router } from 'expo-router'

const ColorPickerScreen = () => {
    const {setSelectedColor}= useListCreation()
    const handleColorSelect=(color:string)=>{
        setSelectedColor(color)
        router.back()
    }
  return (
   <FlatList 
   data={backgroundColors}
   renderItem={({item})=>(
    <Pressable className='flex-1 justify-center items-center'
    onPress={()=>handleColorSelect(item)}>
        <View style={{
            width: 40,
            height:40,
            borderRadius:100,
            backgroundColor: item
        }}
        />
    </Pressable>
   )}
   numColumns={5}
   keyExtractor={(item)=>item}
   automaticallyAdjustContentInsets
   contentInsetAdjustmentBehavior='automatic'
   scrollIndicatorInsets={{bottom:0}}
   className='p-8 pb-7'
   />
  )
}

export default ColorPickerScreen