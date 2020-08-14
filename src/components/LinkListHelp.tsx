import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import ClickIcon from '../images/click.svg'
import SwipeLeft from '../images/swipe-left.svg'

type Props = {}

const LinkListHelp: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <ClickIcon style={styles.itemIcon} />
        <Text>Click to open</Text>
      </View>
      <View style={styles.item}>
        <SwipeLeft style={styles.itemIcon} />
        <Text>Swipe to delete</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    opacity: 0.5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    marginRight: 5,
  },
})
export default LinkListHelp
