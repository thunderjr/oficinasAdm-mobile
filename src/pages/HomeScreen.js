import React, { useState, useEffect } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { Layout, Text, useTheme } from '@ui-kitten/components'
import qrCodeIcon from './../../assets/qrcode.png'
import useServerData from './../hooks/useServerData'

const QrCodeButton = props => {
    const theme = useTheme()
    return (
        <TouchableOpacity {...props} style={{ position: 'absolute', bottom: 20, right: 20 }}>
            <Layout style={{ backgroundColor: theme['color-primary-100'], width: 75, height: 75, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                <Image source={qrCodeIcon} style={{ width: 55, height: 55 }} />
            </Layout>
        </TouchableOpacity>
    )
}

export default function HomeScreen({ navigation }) {
    const [serverData, setServerData] = useState({})

    useEffect(() => {(async () => {
        const { ip, port } = await useServerData()
        setServerData({ ip, port })
    })()}, [])
    
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text category='h1'>HOME</Text>
            { !serverData.ip && !serverData.port ? <QrCodeButton onPress={() => navigation.navigate('QRCode')} /> : null }
        </Layout>
    )
}