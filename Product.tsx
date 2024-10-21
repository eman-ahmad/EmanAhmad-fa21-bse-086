import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import useFetchRecords from '@/app/(tabs)/useFetchRecords'; // Adjust the path as needed
import { Product } from '@/constants/types'; // Adjust the path as needed
import { Stack, useLocalSearchParams} from 'expo-router';

const ProductDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const url = `https://simple-grocery-store-api.online/products/products/${id}`; // Replace with your actual API URL for fetching a single product
  const { data: product, loading, error } = useFetchRecords(url); // Use your custom hook to fetch the product data

  // Handle loading state
  if (loading) {
    return <Text>Loading...</Text>;
  }

  // Handle error state
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  // Handle case when product is not found
  if (!product) {
    return <Text>Product not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImg} resizeMode="contain" />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.category}>{product.category}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  productImg: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 10,
  },
  category: {
    fontSize: 18,
    fontWeight: '500',
    color: '#f73639',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
