import { View, ViewStyle, Text } from "react-native";

interface IconCircleProps{
    emoji:string;
    backgroundColor?:string;
    size?: number
    style?:ViewStyle
}

export default function IconCircle({
    emoji,
    backgroundColor="#E0E0E0",
    size,
    style
}:IconCircleProps){
return(
    <View style={[
        {
            backgroundColor,
            width:size,
            height:size,
            borderRadius:12,
            alignItems:"center",
            justifyContent:"center",
        }, style
    ]}>
        <Text className="font-size-22">{emoji}</Text>
    </View>
)
}