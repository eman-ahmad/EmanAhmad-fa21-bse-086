import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import useFetchRecords from './useFetchRecords'; // Adjust the path to your hook
import MyProductComponent from '@/components/Menu'; // Adjust the path to your component
import { Product } from '@/constants/types';

const IndexScreen = () => {
  const url = 'https://simple-grocery-store-api.online/products'; // Replace with your actual API URL
  const { data: products, loading, error } = useFetchRecords(url); // Call the hook with the URL

  // Handle loading state
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Handle error state
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  // Render each item using MyProductComponent
  const renderItem = ({ item }: { item: Product }) => {
    return <MyProductComponent product={item} />;
  };

  return (
    <View style={styles.container}>
      {products.length === 0 ? (
        <Text>No products available</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // Use a unique key for each item
          contentContainerStyle={{ paddingBottom: 20 }} // Optional: add padding to the bottom
        />
      )}
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
