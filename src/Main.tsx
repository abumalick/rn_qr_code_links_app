import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import React, {useEffect} from 'react'
import SplashScreen from 'react-native-splash-screen'
import Loading from './components/Loading'
import {colors} from './lib/colors'
import {dbSchema} from './lib/db'
import RealmProvider from './providers/RealmProvider'
import HomeScreen from './screens/HomeScreen'
import ScannerScreen from './screens/ScannerScreen'
import WebViewScreen from './screens/WebViewScreen'

export type RootStackParamList = {
  Home: {}
  Scanner: {}
  WebView: {
    uri: string
  }
}

const Stack = createStackNavigator<RootStackParamList>()

const Main = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <RealmProvider schema={dbSchema} loadingComponent={<Loading />}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'QR code scanner',
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
    </RealmProvider>
  )
}

export default Main
