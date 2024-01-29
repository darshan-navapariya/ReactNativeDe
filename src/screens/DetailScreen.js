import React, { useContext, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { AppContext } from '../AppContext/AppContext';

const DetailScreen = ({ route }) => {
  const { selectedProduct, setProduct } = useContext(AppContext);

  useEffect(() => {
    const { id } = route.params;

    const fetchDetails = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, [route.params, setProduct]);

  if (!selectedProduct) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: selectedProduct.thumbnail }} style={styles.thumbnail} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{selectedProduct.title}</Text>
        <Text style={styles.brand}>{selectedProduct.brand}</Text>
        <Text style={styles.category}>{selectedProduct.category}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
        <Text style={styles.price}>Price: ${selectedProduct.price}</Text>
        <Text style={styles.discount}>Discount: {selectedProduct.discountPercentage}% off</Text>
        <Text style={styles.rating}>Rating: {selectedProduct.rating}</Text>
        <Text style={styles.stock}>In Stock: {selectedProduct.stock} units</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  thumbnail: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  brand: {
    fontSize: 18,
    color: '#888',
    marginBottom: 5,
  },
  category: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  discount: {
    fontSize: 16,
    color: '#e44d2e',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    color: '#4caf50',
    marginBottom: 10,
  },
  stock: {
    fontSize: 16,
    color: '#888',
  },
});

export default DetailScreen;
