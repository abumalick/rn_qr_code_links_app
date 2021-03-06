import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback} from 'react'
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native'
import QRCodeScanner, {Event} from 'react-native-qrcode-scanner'
import {v4 as uuidv4} from 'uuid'
import type {RootStackParamList} from '../Main'
import {useRealmOrThrow} from '../providers/RealmProvider'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Scanner'>
}

const ScannerScreen: React.FC<Props> = ({navigation}) => {
  const realm = useRealmOrThrow()
  const handleAddLink = useCallback(
    (url) => {
      realm.write(() => {
        realm.create('Link', {
          id: uuidv4(),
          url,
          createdAt: new Date(),
        })
      })
      navigation.navigate('Home', {})
    },
    [realm, navigation],
  )
  const handleRead = (event: Event) => {
    handleAddLink(event.data)
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <QRCodeScanner
        onRead={handleRead}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
        cameraStyle={styles.cameraContainer}
        showMarker
        customMarker={
          <View style={styles.fullContainer}>
            <View style={styles.borderTopContainer}></View>
            <View style={styles.centerWrapper}>
              <View style={styles.borderContainer} />
              <View style={styles.centerContainer} />
              <View style={styles.borderContainer} />
            </View>
            <View style={styles.borderContainer} />
          </View>
        }
      />
    </>
  )
}

const styles = StyleSheet.create({
  fullContainer: {
    height: '100%',
    width: '100%',
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  centerWrapper: {
    flex: 1.4,
    flexDirection: 'row',
  },
  borderContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  borderTopContainer: {
    flex: 0.5,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  centerContainer: {
    flex: 10,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
  },
  centerText: {
    fontSize: 18,
    color: '#eee',
  },
})

export default ScannerScreen
