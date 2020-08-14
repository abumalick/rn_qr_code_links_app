import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Svg, {Path} from 'react-native-svg'
import useComponentSize from '../hooks/useComponentSize'
type Props = {}

const LinkListEmpty: React.FC<Props> = () => {
  const [size, onLayout] = useComponentSize(true)
  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text style={styles.text}>Nothing here yet, please start scanning </Text>
      {size && (
        <Svg
          viewBox="0 0 375 667"
          height={size.height - 10}
          width={size.width - 30}
        >
          <Path
            d="M272.319,31.715c23.712,23.712 75.519,144.332 25.695,188.333c-50.91,44.96 -109.584,38.633 -152.111,24.509c-24.284,-8.065 -67.687,-45.601 -56.386,-75.545c2.443,-6.474 6.137,-13.032 13.08,-15.629c18.046,-6.751 93.829,10.353 124.078,66.665c48.87,90.976 -121.145,110.641 -124.078,192.746c-2.421,67.75 114.151,146.191 146.283,165.895"
            strokeDasharray="6.6, 3"
            fill="none"
            stroke="#231F20"
            strokeWidth={1}
          />
          <Path
            d="M236.601,580.056l17.444,1.522l-9.372,-14.645"
            strokeDasharray="6.6, 3"
            fill="none"
            stroke="#231F20"
            strokeWidth={1}
          />
        </Svg>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
  },
})
export default LinkListEmpty
