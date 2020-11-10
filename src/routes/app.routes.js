import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs'
import { BottomNavigation, BottomNavigationTab, Icon, Text, useTheme } from '@ui-kitten/components'

import HomeScreen from './../pages/HomeScreen'
import QRCodeScreen from './../pages/QRCodeScreen'

const QRCodeStack = createStackNavigator()
const MainTabsNav = createBottomTabNavigator()

const InicioIcon = (props) => <Icon {...props} name="home-outline" />
const ClientesIcon = (props) => <Icon {...props} name="people-outline" />
const ProdutosIcon = (props) => <Icon {...props} name="archive-outline" />
const ServicosIcon = (props) => <Icon {...props} name="file-text" />
const MdOIcon = (props) => <Icon {...props} name="pie-chart-2" />

const MainTabBar = ({ navigation, state }) => (
    <BottomNavigation
        selectedIndex={state.index}
        onSelect={index => navigation.navigate(state.routeNames[index])}
    >
        <BottomNavigationTab icon={InicioIcon} title={evaProps => <Text {...evaProps}>Início</Text>}/>
        <BottomNavigationTab icon={ClientesIcon} title={evaProps => <Text {...evaProps}>Clientes</Text>}/>
        <BottomNavigationTab icon={ProdutosIcon} title={evaProps => <Text {...evaProps}>Produtos</Text>}/>
        <BottomNavigationTab icon={ServicosIcon} title={evaProps => <Text {...evaProps}>Serviços</Text>}/>
        <BottomNavigationTab icon={MdOIcon} title={evaProps => <Text {...evaProps}>Mão de Obra</Text>}/>
    </BottomNavigation>
)

const MainTabs = () => (
    <MainTabsNav.Navigator tabBar={props => <MainTabBar {...props} />}>
        <MainTabsNav.Screen name="Início" component={HomeScreen}></MainTabsNav.Screen>
        <MainTabsNav.Screen name="Clientes" component={HomeScreen}></MainTabsNav.Screen>
        <MainTabsNav.Screen name="Produtos" component={HomeScreen}></MainTabsNav.Screen>
        <MainTabsNav.Screen name="Serviços" component={HomeScreen}></MainTabsNav.Screen>
        <MainTabsNav.Screen name="Mão de Obra" component={HomeScreen}></MainTabsNav.Screen>
    </MainTabsNav.Navigator>
)

export default function () {
    return (
        <NavigationContainer>
            <QRCodeStack.Navigator screenOptions={{ headerShown: false }}>
                <QRCodeStack.Screen name='MainTabs' component={MainTabs} />
                <QRCodeStack.Screen name='QRCode' component={QRCodeScreen} options={{ title: "Capturar QR Code" }} />
            </QRCodeStack.Navigator>
        </NavigationContainer>
    )
}
