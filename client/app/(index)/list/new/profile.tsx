import { SafeAreaView, Text } from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";

export default function ProfileList(){
    return (
        <BodyScrollView>
            <SafeAreaView>
                <Text>
                    Profile list
                </Text>
            </SafeAreaView>
        </BodyScrollView>
    )
}