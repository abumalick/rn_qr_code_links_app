import React, {useMemo} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import type {LinkModel} from '../lib/db'

export const HEIGHT = 64
const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    height: HEIGHT,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e2e3e4',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
  },
})

interface ItemLayoutProps extends LinkModel {}

const MAX_LENGTH = 100

const ItemLayout = ({url}: ItemLayoutProps) => {
  const displayedUrl = useMemo(() => {
    if (!url) return ''
    return url.length > MAX_LENGTH
      ? url.substring(0, MAX_LENGTH - 3) + '...'
      : url
  }, [url])
  return (
    <View style={styles.content}>
      <View style={styles.info}>
        <Text style={styles.title}>{displayedUrl}</Text>
      </View>
    </View>
  )
}

export default ItemLayout
