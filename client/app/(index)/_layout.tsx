import { useUser } from '@clerk/clerk-expo'
import {Redirect, router, Stack} from 'expo-router'
import Button from '~/components/Button'
import { ListCreationProvider } from '~/context/ListCreationContext'
export default function HomeLayout(){
    const {user}= useUser()
    if(!user){
        return <Redirect href={"/(auth)"}/>
    }
    return(
        <ListCreationProvider>
        <Stack>
            <Stack.Screen name='index' options={{headerTitle:'shopping list', headerLargeTitle:true}}/>
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
            <Stack.Screen name='list/new/emoji-picker' options={{
                headerTitle:"choose an emoji",
                presentation:'formSheet',
                sheetGrabberVisible:true,
                headerShown:false,
                sheetAllowedDetents:[0.5, 0.75, 1]
            }
            }/>
        </Stack>
        </ListCreationProvider>
    )
}