import '../global.css';

import { Slot, Stack } from 'expo-router';
import { ClerkProvider, ClerkLoaded} from '@clerk/clerk-expo';
import { tokenCache } from '../cache';
// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
if(!publishableKey){
  console.error("Please add a key")
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
      <Slot/>
      </ClerkLoaded>
    </ClerkProvider>
  
  );
}

