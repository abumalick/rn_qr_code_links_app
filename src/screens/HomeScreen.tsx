import {StackNavigationProp} from '@react-navigation/stack'
import React, {useCallback} from 'react'
import {Alert, SafeAreaView, StatusBar, StyleSheet} from 'react-native'
import {FlatList} from 'react-native-gesture-handler'
import 'react-native-get-random-values'
import useForceUpdate from 'use-force-update'
import FAB from '../components/FAB'
import LinkItem from '../components/LinkItem'
import LinkListEmpty from '../components/LinkListEmpty'
import LinkListHelp from '../components/LinkListHelp'
import Loading from '../components/Loading'
import useRealm from '../hooks/useRealm'
import {dbSchema, LinkModel} from '../lib/db'
import type {RootStackParamList} from '../Main'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Scanner'>
}

const urlRegex = /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/

const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {realm} = useRealm(dbSchema)
  const forceUpdate = useForceUpdate()

  const openLink = useCallback(
    (url: string) => {
      const matches = url.match(urlRegex)
      if (!matches) {
        Alert.alert(
          "The text selected doesn't contain an url",
          'Are you sure you want to open it in the browser?',
          [
            {
              text: 'Open anyway',
              onPress: () => navigation.navigate('WebView', {uri: url}),
            },
            {
              text: 'Cancel',
            },
          ],
        )
      } else {
        navigation.navigate('WebView', {uri: matches[0]})
      }
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
      <SafeAreaView style={styles.safeArea}>
        <FlatList
          contentContainerStyle={{height: '100%'}}
          data={links}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={LinkListEmpty}
          ListFooterComponent={links.length > 0 ? LinkListHelp : undefined}
          renderItem={({item}) => {
            const {id, url} = item
            return (
              <LinkItem
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
  safeArea: {
    flex: 1,
  },
})

export default HomeScreen
