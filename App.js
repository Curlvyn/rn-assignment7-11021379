import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './component/HomeScreen';
import CartScreen from './component/CartScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Close from './assets/close.png'
import ProductDetailsScreen from './component/ProductDetails';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator()

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <Image source={Close} style={{width: 40, height: 40}} /> 
      </TouchableOpacity>
      <View style={{paddingTop: 20, paddingLeft: 15, display: 'flex', flexDirection: 'column', marginBottom: 20}}>
        <Text style={{fontSize: 25, letterSpacing: 3}}>AMEHE</Text>
        <View style={{height: 1, width: 150, backgroundColor: 'orange', marginLeft: 15}}/>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem label="Store" onPress={() => {}} />
      <DrawerItem label="Locations" onPress={() => {}} />
      <DrawerItem label="Blogs" onPress={() => {}} />
      <DrawerItem label="Jewelery" onPress={() => {}} />
      <DrawerItem label="Electronic" onPress={() => {}} />
      <DrawerItem label="Clothing" onPress={() => {}} />
    </DrawerContentScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeScreen" drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
        <Drawer.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{ headerShown: false }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;