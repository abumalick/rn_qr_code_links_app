import React from 'react'
import {Dimensions, StyleSheet, View} from 'react-native'
import Animated, {
  abs,
  add,
  call,
  clockRunning,
  cond,
  eq,
  not,
  set,
  useCode,
} from 'react-native-reanimated'
import {
  PanGestureHandler,
  State,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import {
  snapPoint,
  timing,
  useClock,
  usePanGestureHandler,
  useValue,
  minus,
  clamp,
} from 'react-native-redash'

import ItemLayout, {HEIGHT} from './LinkItemLayout'
import Action from './DeleteAction'
import {LinkModel} from '../lib/db'

const {width} = Dimensions.get('window')
const snapPoints = [-width, -100, 0]
const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E1E2E3',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
})

interface ItemProps extends LinkModel {
  onPress: () => void
  onDelete: () => void
}

const Item = ({id, url, onDelete, onPress}: ItemProps) => {
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler()
  const translateX = useValue(0)
  const offsetX = useValue(0)
  const height = useValue(HEIGHT)
  const deleteOpacity = useValue(1)
  const clock = useClock()
  const to = snapPoint(translateX, velocity.x, snapPoints)
  const shouldRemove = useValue<number>(0)
  useCode(
    () => [
      cond(
        eq(state, State.ACTIVE),
        set(
          translateX,
          add(offsetX, clamp(translation.x, -9999, minus(offsetX))),
        ),
      ),
      cond(eq(state, State.END), [
        set(translateX, timing({clock, from: translateX, to})),
        set(offsetX, translateX),
        cond(eq(to, -width), set(shouldRemove, 1)),
      ]),
      cond(shouldRemove, [
        set(height, timing({from: HEIGHT, to: 0})),
        set(deleteOpacity, 0),
        cond(not(clockRunning(clock)), call([], onDelete)),
      ]),
    ],
    [onDelete],
  )
  return (
    <Animated.View>
      <View style={styles.background}>
        <TouchableWithoutFeedback onPress={() => shouldRemove.setValue(1)}>
          <Action x={abs(translateX)} {...{deleteOpacity}} />
        </TouchableWithoutFeedback>
      </View>
      <TouchableOpacity onPress={onPress}>
        <PanGestureHandler {...gestureHandler}>
          <Animated.View style={{height, transform: [{translateX}]}}>
            <ItemLayout id={id} url={url} />
          </Animated.View>
        </PanGestureHandler>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default Item
