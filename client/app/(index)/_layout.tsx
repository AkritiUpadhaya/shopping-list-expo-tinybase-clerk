import {router, Stack} from 'expo-router'
import Button from '~/components/Button'
export default function HomeLayout(){
    return(
        <Stack>
            <Stack.Screen name='index' options={{headerTitle:'shopping list'}}/>
            <Stack.Screen name='list/new/index' options={{
                presentation:'formSheet',
                sheetGrabberVisible:true,
                headerShown:false
            }
            }/>
            <Stack.Screen name='list/new/profile' options={{
                presentation:'formSheet',
                sheetGrabberVisible:true,
                headerShown:false,
                sheetAllowedDetents:[0.75, 1]
            }
            }/>
            <Stack.Screen name='list/new/scan' options={{
                headerTitle:'Scan the QR code',
                presentation:'fullScreenModal',
                headerLargeTitle:false,
               headerLeft:()=>(
                <Button variant='ghost' onPress={()=>router.back() }>Cancel</Button>
               )
            }
            }/>
        </Stack>
    )
}