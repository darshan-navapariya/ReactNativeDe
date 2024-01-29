import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import ProductItem from '../components/ProductItem';
import { AppContext } from '../AppContext/AppContext';
import RNPickerSelect from 'react-native-picker-select';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }) => {
  const { setProduct } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        setData(response.data.products);
        setFilteredData(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filterData = () => {
    let filteredProducts = data;

    if (selectedCategory !== 'All') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedBrand !== 'All') {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand === selectedBrand
      );
    }

    setFilteredData(filteredProducts);
  };

  useEffect(() => {
    filterData();
  }, [selectedCategory, selectedBrand]);

  const renderItem = ({ item }) => (
    <ProductItem
      product={item}
      onPress={() => {
        setProduct(item);
        navigation.navigate('Detail', { id: item.id });
      }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Category:</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          value={selectedCategory}
          onValueChange={(value) => setSelectedCategory(value)}
          items={[
            { label: 'All', value: 'All' },
            { label: 'Smartphones', value: 'smartphones' },
            { label: 'Laptops', value: 'laptops' },
            { label: 'Headphones', value: 'headphones' },
          ]}
        />
        <Text style={styles.filterLabel}>Brand:</Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          value={selectedBrand}
          onValueChange={(value) => setSelectedBrand(value)}
          items={[
            { label: 'All', value: 'All' },
            { label: 'Apple', value: 'Apple' },
            { label: 'Samsung', value: 'Samsung' },
            { label: 'Sony', value: 'Sony' },
          ]}
        />
      </View>

      <Text style={styles.heading}>Product List</Text>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: 'white',
  },
  inputAndroid: {
    fontSize: 16,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  iconContainer: {
    top: 0,
    right: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  filterLabel: {
    marginRight: 5,
  },
});

export default HomeScreen;
