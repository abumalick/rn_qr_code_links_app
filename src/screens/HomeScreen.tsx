import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback} from 'react'
import {Linking, SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import 'react-native-get-random-values'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import useForceUpdate from 'use-force-update'
import FAB from '../components/FAB'
import LinkItem from '../components/LinkItem'
import Loading from '../components/Loading'
import useRealm from '../hooks/useRealm'
import {dbSchema, LinkModel} from '../lib/db'
import type {RootStackParamList} from '../Main'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Scanner'>
}

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {realm} = useRealm(dbSchema)
  const forceUpdate = useForceUpdate()

  const openLink = useCallback(
    (url: string) => {
      navigation.navigate('WebView', {uri: url})
    },
    [navigation],
  )
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
    navigation.navigate('Scanner', {})
  }, [navigation])

  if (!realm) {
    return <Loading />
  }
  const links = realm.objects<LinkModel>('Link')

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
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

export default HomeScreen
