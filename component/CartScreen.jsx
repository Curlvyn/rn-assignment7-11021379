import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Remove from '../assets/remove.png'
import Logo from '../assets/Logo.png'
import Search from '../assets/Search.png'
import Shop from '../assets/cart.jpg'


const CartScreen = ({route}) => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const selectedItem = route.params?.item;

  useEffect(() => {
    if (selectedItem) {
      setCart([...cart, selectedItem]);
    }
  }, [selectedItem]);

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      let sum = 0;
      cart.forEach((item) => {
        sum += item.amount;
      });
      setTotalAmount(sum);
    };
    calculateTotal();
  }, [cart]);

  const removeFromCart = async (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  const renderItem = ({item, index}) => {
    const MAX_DESCRIPTION_LENGTH = 50;
    const MAX_TITLE_LENGTH = 37 
    const truncatedDescription =
      item.description.length > MAX_DESCRIPTION_LENGTH
        ? item.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
        : item.description;

    const truncatedTitle =
      item.title.length > MAX_TITLE_LENGTH
        ? item.title.slice(0, MAX_TITLE_LENGTH) + '...'
        : item.title;
  
    return (
      <View style={{display: 'flex', flexDirection: 'column', gap: 20}}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20, width: 260, marginBottom: 10}}>
          <View>
            <Image source={{uri: item.image}} style={{width: 100, height: 150}}/>
          </View>
          <View style={{width: '100vw'}}>
            <Text style={{fontSize: 17, letterSpacing: 2, fontWeight: 'bold'}}>{truncatedTitle}</Text>
            <Text>{truncatedDescription}</Text>
            <Text style={{fontSize: 18, color: 'red', fontWeight: 700, letterSpacing: 3}}>${item.price}</Text>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Image source={Remove} style={{marginLeft: 220}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
    <View style={styles.container}>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30, width: '100vw'}}>
        <Image source={Logo} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginHorizontal: 140}}/>
        <View style={{display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10}}>
            <Image source={Search} />
        </View>
      </View>
      <Text style={styles.title}>CHECKOUT</Text>
      <FlatList
        data={cart} 
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
        <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text style={{fontSize: 16, letterSpacing: 5}}>EST. TOTAL: </Text>
            <Text style={{fontSize: 22, letterSpacing: 6, color: 'red'}}>$240</Text>
        </View>
    </View>
        <TouchableOpacity onPress={() => alert('Checkout successful')} style={{backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', padding: 20, gap: 10}}>
            <Image source={Shop} style={{width: 30, height: 30}}/>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff',}}>CHECKOUT</Text>
        </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: 6
  },
});

export default CartScreen;