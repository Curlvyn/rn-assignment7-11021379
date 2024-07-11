import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../assets/Menu.png'
import Logo from '../assets/Logo.png'
import Search from '../assets/Search.png'
import Shopping from '../assets/shoppingBag.png'
import ListView from '../assets/Listview.png'
import Filter from '../assets/Filter.png'
import Add from '../assets/add_circle.png'
import axios from 'axios';




const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([])

  useEffect(() => {
    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  
    // Navigate to the product details screen
    navigation.navigate('ProductDetailsScreen', { product: product });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const renderItem = ({item, index}) => {
    const MAX_DESCRIPTION_LENGTH = 50;
  
    const truncatedDescription =
      item.description.length > MAX_DESCRIPTION_LENGTH
        ? item.description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
        : item.description;

    const secondItemIndex = index + 1;
  
    // Check if the item has already been rendered
    if (secondItemIndex % 2 === 0) {
      return null;
    }
  
    return (
      <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
        <View style={{width: '46%', padding: 5}}>
          <View>
            <Image style={{width: '100%', height: 200}} source={{ uri: item.image }} />
            <TouchableOpacity onPress={() => addToCart(item)}>
              <Image source={Add} style={{position: 'absolute', bottom: 10, right: 10}}/>
            </TouchableOpacity>
          </View>
          <Text style={{fontSize: 20}}>{item.title}</Text>
          <Text>{truncatedDescription}</Text>
          <Text style={{color: 'red', fontSize: 18, fontWeight: 600, letterSpacing: 3}}>${item.price}</Text>
        </View>
  
        {/* Render the second item in the row */}
        {secondItemIndex < products.length && (
          <View style={{width: '50%', padding: 5}}>
            <View>
              <Image style={{width: '100%', height: 200}} source={{ uri: products[secondItemIndex].image }} />
              <TouchableOpacity onPress={() => addToCart(products[secondItemIndex])}>
                <Image source={Add} style={{position: 'absolute', bottom: 10, right: 10}}/>
              </TouchableOpacity>
            </View>
            <Text style={{fontSize: 20}}>{products[secondItemIndex].title}</Text>
            <Text>{products[secondItemIndex].description.length > MAX_DESCRIPTION_LENGTH ? products[secondItemIndex].description.slice(0, MAX_DESCRIPTION_LENGTH) + '...' : products[secondItemIndex].description}</Text>
            <Text style={{color: 'red', fontSize: 18, fontWeight: 600, letterSpacing: 3}}>${products[secondItemIndex].price}</Text>
          </View>
        )}
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
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
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 30}}>
        <Text style={{fontSize: 28}}>Our story</Text>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <TouchableOpacity style={{backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50}}>
                <Image source={ListView}/>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#f7f7f7', padding: 10, borderRadius: 50, }}>
                <Image source={Filter}/>
            </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
  },
  productContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
});

export default HomeScreen;