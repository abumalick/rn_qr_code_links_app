import React, {useMemo} from 'react'
import {StyleSheet, Text, View} from 'react-native'

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

interface ItemLayoutProps {
  text: string
}

const MAX_LENGTH = 100

const ItemLayout = ({text}: ItemLayoutProps) => {
  const displayedText = useMemo(() => {
    if (!text) return ''
    return text.length > MAX_LENGTH
      ? text.substring(0, MAX_LENGTH - 3) + '...'
      : text
  }, [text])
  return (
    <View style={styles.content}>
      <View style={styles.info}>
        <Text style={styles.title}>{displayedText}</Text>
      </View>
    </View>
  )
}

export default ItemLayout
