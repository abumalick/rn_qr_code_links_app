import React, {useCallback, useEffect, useState} from 'react'
import {
  BackHandler,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import 'react-native-get-random-values'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import useForceUpdate from 'use-force-update'
import {v4 as uuidv4} from 'uuid'
import FAB from './components/FAB'
import LinkItem from './components/LinkItem'
import Loading from './components/Loading'
import useRealm from './hooks/useRealm'
import {colors} from './lib/colors'
import {dbSchema, LinkModel} from './lib/db'
import ScannerScreen from './screens/ScannerScreen'

const Main = () => {
  const {realm} = useRealm(dbSchema)
  const [isScanning, setScanning] = useState(false)
  const forceUpdate = useForceUpdate()
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setScanning((prevScanning) => {
          // We are scanning, return to main screen
          if (prevScanning) return false
          // We are not scanning, exist the app
          BackHandler.exitApp()
          return false
        })
        return true
      },
    )

    return () => backHandler.remove()
  }, [setScanning])
  const handleAddLink = useCallback(
    (url) => {
      if (!realm)
        throw new Error('Trying to write to DB while it does not exist')
      realm.write(() => {
        realm.create('Link', {
          id: uuidv4(),
          url,
        })
        setScanning(false)
      })
    },
    [realm],
  )
  const openLink = useCallback((url: string) => {
    Linking.openURL(url).catch((err) => console.error('An error occured', err))
  }, [])
  const deleteLink = useCallback(
    (id: string) => {
      if (!realm)
        throw new Error('Trying to write to DB while it does not exist')
      const link = realm.objects<LinkModel>('Link').filtered(`id = "${id}"`)
      realm.write(() => {
        realm.delete(link)
        forceUpdate()
      })
    },
    [realm, forceUpdate],
  )
  const openQRCamera = useCallback(() => {
    setScanning(true)
  }, [])

  if (!realm) {
    return <Loading />
  }
  const links = realm.objects<LinkModel>('Link')

  if (isScanning) {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <ScannerScreen onScanLink={handleAddLink} />
      </>
    )
  }
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            height: 60,
            backgroundColor: colors.primary,
            elevation: 10,
            justifyContent: 'center',
            paddingHorizontal: 30,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: 'white',
              fontWeight: '700',
            }}
          >
            Scanned links list
          </Text>
        </View>

        <FlatList
          data={links}
          renderItem={({item}) => {
            const {id, url} = item
            return (
              <LinkItem
                key={id}
                onPress={() => openLink(url)}
                onDelete={() => {
                  deleteLink(id)
                }}
                id={id}
                url={url}
              />
            )
          }}
        />
        <FAB onPress={openQRCamera} />
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

export default Main
