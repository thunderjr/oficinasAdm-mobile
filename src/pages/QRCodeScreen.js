import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Layout, Button } from '@ui-kitten/components'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner'

export default function QRCodeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      const { ip, port } = JSON.parse(data)
      if (!!ip && !!port) {
        await AsyncStorage.setItem('serverData', JSON.stringify({ ip, port }))
        setScanned(true)
        navigation.navigate('Home')
      } else {
        throw new Error()
      }
    } catch(e) {
      alert('QR Code Inválido')
      console.log(e)
      setScanned(true)
      setTimeout(() => {
        setScanned(false)
      }, 3000)
    }
  }

  if (hasPermission === null) { return <Text>Requesting for camera permission</Text> }
  if (hasPermission === false) { return <Text>No access to camera</Text> }

  return (
    <Layout
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </Layout>
  )
}