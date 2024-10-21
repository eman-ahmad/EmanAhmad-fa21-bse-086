import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '@/constants/types';

const useFetchRecords = (url: string) => {
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localData = await AsyncStorage.getItem('foodrecords');
        if (localData) {
          console.log('Data fetched from AsyncStorage:', JSON.parse(localData));
          setData(JSON.parse(localData));
        } else {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
          }
          const result: Product[] = await response.json(); 
          setData(result);
          await AsyncStorage.setItem('foodrecords', JSON.stringify(result));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Something went wrong while fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetchRecords;
