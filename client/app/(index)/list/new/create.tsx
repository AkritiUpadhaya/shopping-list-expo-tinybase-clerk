import { SafeAreaView, Text } from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";

export default function CreateList(){
    return (
        <BodyScrollView>
            <SafeAreaView>
                <Text>
                    Create list
                </Text>
            </SafeAreaView>
        </BodyScrollView>
    )
}