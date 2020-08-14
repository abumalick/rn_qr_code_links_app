import * as React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen'
import ScannerScreen from './screens/ScannerScreen'
import WebViewScreen from './screens/WebViewScreen'
import {colors} from './lib/colors'

export type RootStackParamList = {
  Home: {}
  Scanner: {}
  WebView: {
    uri: string
  }
}

const Stack = createStackNavigator<RootStackParamList>()

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Scanned links list',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        />
        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{
            title: 'Scan the QR code',
          }}
        />
        <Stack.Screen
          name="WebView"
          component={WebViewScreen}
          options={{
            title: 'Browser',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Main
