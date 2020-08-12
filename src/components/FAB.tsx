import React from 'react'
import {TouchableOpacity} from 'react-native'
import QRScanIcon from '../images/qr-scan.svg'
import {colors} from '../lib/colors'

interface Props {
  onPress: () => void
  backgroundColor?: string
}
const FAB: React.FC<Props> = ({onPress, backgroundColor = colors.primary}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        elevation: 5,
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 70,
        height: 70,
        backgroundColor: backgroundColor,
        borderRadius: 9999,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        zIndex: 100,
      }}
    >
      <QRScanIcon />
    </TouchableOpacity>
  )
}

export default FAB
