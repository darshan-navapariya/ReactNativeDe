import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';

const ProductItem = ({ product, onPress }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.description}>Description: {product.description}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Button title="View Details" onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
  price: {
    fontWeight: 'bold',
  },
});

export default ProductItem;
