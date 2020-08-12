import React from 'react'
import {Dimensions, StyleSheet, Text, View} from 'react-native'
import QRCodeScanner, {Event} from 'react-native-qrcode-scanner'

type Props = {
  onScanLink: (url: string) => void
}

const ScannerScreen: React.FC<Props> = ({onScanLink}) => {
  const handleRead = (event: Event) => {
    onScanLink(event.data)
  }

  return (
    <QRCodeScanner
      onRead={handleRead}
      topViewStyle={styles.zeroContainer}
      bottomViewStyle={styles.zeroContainer}
      cameraStyle={styles.cameraContainer}
      showMarker
      customMarker={
        <View style={styles.fullContainer}>
          <View style={[styles.borderContainer, styles.flexCenter]}>
            <Text style={styles.centerText}>Scan the QR code.</Text>
          </View>
          <View style={styles.centerWrapper}>
            <View style={styles.borderContainer} />
            <View style={styles.centerContainer} />
            <View style={styles.borderContainer} />
          </View>
          <View style={styles.borderContainer} />
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  fullContainer: {
    height: '100%',
    width: '100%',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  centerWrapper: {
    flex: 1.4,
    flexDirection: 'row',
  },
  borderContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  centerContainer: {
    flex: 10,
  },
  cameraContainer: {
    height: Dimensions.get('window').height,
  },
  centerText: {
    fontSize: 18,
    color: '#eee',
  },
})

export default ScannerScreen
