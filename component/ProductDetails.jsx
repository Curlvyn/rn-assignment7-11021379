import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Menu from '../assets/Menu.png'
import Logo from '../assets/Logo.png'
import Search from '../assets/Search.png'
import Shopping from '../assets/shoppingBag.png'
import Download from '../assets/Export1.png'
import Bleach from '../assets/bleach.png'
import Tumble from '../assets/tumble.png'
import Clean from '../assets/clean.png'
import Iron from '../assets/iron.png'
import Shipping from '../assets/Shipping.png'
import Down from '../assets/Down.png'
import Fav from '../assets/love.png'
import Add from '../assets/add1.png'

const ProductDetailsScreen = ({ route, navigation }) => {
  const product = route.params?.product;


  return (
    <View style={{padding: 10, marginTop: 10, marginBottom: 10}}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image source={Menu} />
            </TouchableOpacity>
            <Image source={Logo} />
            <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10}}>
                <Image source={Search} />
                <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
                    <Image source={Shopping}/>
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 15, marginBottom:100}}>
            <View style={{paddingTop: 20, display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Image source={{ uri: product.image }} style={{width: 370, height: 340}} />
            </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 15, paddingHorizontal: 10}}>
                    <Text style={{fontSize: 20, letterSpacing: 3, fontWeight: 600, width: 300}}>{product.title}</Text>
                    <Image source={Download} style={{width:30, height: 30, borderRadius: 50}} />
                </View>
                <View style={{paddingHorizontal: 15, }}>
                    <Text style={{fontSize: 22}}>{product.category}</Text>
                    <Text style={{fontSize: 24, color: 'red',}}>${product.price}</Text>
                </View>
                <View style={{paddingTop: 35, paddingHorizontal: 15}}>
                    <Text style={{fontSize: 22}}>DESCRIPTION</Text>
                    <Text style={{fontSize: 16, marginTop: 5}}>{product.description}</Text>
                </View>
                <View style={{marginLeft: 15, marginVertical: 10}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15}}>
                        <Image source={Bleach} style={{width: 30, height: 30}}/>
                        <Text>Do not use bleach</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15}}>
                        <Image source={Tumble} style={{width: 30, height: 30}}/>
                        <Text>Do not tumble dry</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15}}>
                        <Image source={Clean} style={{width: 30, height: 30}}/>
                        <Text>Dry clean with tetrachloroethylene</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15}}>
                        <Image source={Iron} style={{width: 30, height: 30}}/>
                        <Text>Iron at a maximum of 110C/230F</Text>
                    </View>
                </View>
                <View style={{width: 300, height: 2, backgroundColor: 'gray', marginLeft: 15, marginBottom: 20}}/>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{display: 'flex', flexDirection: 'row', gap: 10, marginHorizontal: 15}}>
                        <Image source={Shipping} style={{width: 30, height: 30}}/>
                        <View>
                            <Text>Free Flat Rate Shipping</Text>
                            <Text>Estimate to be delivered on</Text>
                            <Text>09/11/2021 - 12/11/2021.</Text>
                        </View>
                    </View>
                    <Image source={Down} style={{width: 30, height: 30}}/>
                </View>
            
        </ScrollView>
        <TouchableOpacity onPress={() => alert("Successfully Added to Cart")} style={{width: '107%',justifyContent: 'space-between', backgroundColor: 'black', height: 60, position:'absolute', bottom: 15, right: 0, left: 0, display: 'flex', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Image source={Add} style={{width: 30, height: 30}}/>
                <Text style={{color: 'white',}}>ADD TO BASKET</Text>
            </View>
            <Image source={Fav} style={{width: 30, height: 30}}/>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  
});

export default ProductDetailsScreen;