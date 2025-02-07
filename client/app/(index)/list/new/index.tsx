import { SafeAreaView, Text } from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";

export default function NewList(){
    return (
        <BodyScrollView contentContainerStyle={{padding:16}}>
            <SafeAreaView>
                <Text className="font-bold text-2xl mx-3 my-3">
                    Better Together
                </Text>
                <Text className="text-sm mx-3">Create shared shopping list and collaborate real-time with your friends</Text>
            </SafeAreaView>
        </BodyScrollView>
    )
}
