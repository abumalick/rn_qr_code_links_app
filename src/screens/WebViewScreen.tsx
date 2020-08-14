import React from 'react'
import {WebView} from 'react-native-webview'
import {StackNavigationProp} from '@react-navigation/stack'
import {RootStackParamList} from '../Main'
import type {RouteProp} from '@react-navigation/native'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'WebView'>
  route: RouteProp<RootStackParamList, 'WebView'>
}

const WebViewScreen: React.FC<Props> = ({route}) => {
  return <WebView source={{uri: route.params.uri}} />
}

export default WebViewScreen
