import { SafeAreaView, Text } from "react-native";
import { BodyScrollView } from "~/components/BodyScrollView";

export default function Scanlist(){
    return (
        <BodyScrollView>
            <SafeAreaView>
                <Text>
                    Scan list
                </Text>
            </SafeAreaView>
        </BodyScrollView>
    )
}