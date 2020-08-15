/**
 * MIT License

Copyright (c) 2019 William Candillon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
 */

import React from 'react'
import {StyleSheet, Text} from 'react-native'
import Animated, {
  divide,
  interpolate,
  Extrapolate,
  sub,
  cond,
  add,
  lessThan,
  multiply,
} from 'react-native-reanimated'

import {HEIGHT} from './LinkItemLayout'

const styles = StyleSheet.create({
  remove: {
    color: 'white',
    fontFamily: 'UberMoveMedium',
    fontSize: 14,
  },
})

interface DeleteActionProps {
  x: Animated.Node<number>
  deleteOpacity: Animated.Node<number>
}

const DeleteAction = ({x, deleteOpacity}: DeleteActionProps) => {
  const size = cond(lessThan(x, HEIGHT), x, add(x, sub(x, HEIGHT)))
  const translateX = cond(lessThan(x, HEIGHT), 0, divide(sub(x, HEIGHT), 2))
  const borderRadius = divide(size, 2)
  const scale = interpolate(size, {
    inputRange: [20, 30],
    outputRange: [0.01, 1],
    extrapolate: Extrapolate.CLAMP,
  })
  const iconOpacity = interpolate(size, {
    inputRange: [HEIGHT - 10, HEIGHT + 10],
    outputRange: [1, 0],
  })
  const textOpacity = sub(1, iconOpacity)
  return (
    <Animated.View
      style={{
        backgroundColor: '#D93F12',
        borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        height: size,
        width: size,
        transform: [{translateX}],
      }}
    >
      <Animated.View
        style={{
          height: 5,
          width: 20,
          backgroundColor: 'white',
          opacity: iconOpacity,
          transform: [{scale}],
        }}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: multiply(textOpacity, deleteOpacity),
        }}
      >
        <Text style={styles.remove}>Remove</Text>
      </Animated.View>
    </Animated.View>
  )
}

export default DeleteAction
