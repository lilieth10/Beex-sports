import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { complexService } from '../services/complexService';
import { Complex, useFavorites } from '../context/FavoritesContext';
import { MainTabScreenProps } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProp } from '../navigation/types';

const ComplexesScreen: React.FC<MainTabScreenProps<'Complexes'>> = () => {
  const [complexes, setComplexes] = useState<Complex[]>([]);
  const [filteredComplexes, setFilteredComplexes] = useState<Complex[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigation = useNavigation<AppStackNavigationProp<'ComplexDetails'>>();

  useEffect(() => {
    loadComplexes();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredComplexes(complexes);
    } else {
      setIsLoading(true);
      const delaySearch = setTimeout(async () => {
        const results = await complexService.searchComplexes(searchQuery);
        setFilteredComplexes(results);
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(delaySearch);
    }
  }, [searchQuery, complexes]);

  const loadComplexes = async () => {
    setIsLoading(true);
    try {
      const data = await complexService.getComplexes();
      setComplexes(data);
      setFilteredComplexes(data);
    } catch (error) {
      console.error('Error loading complexes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };

  const handleToggleFavorite = async (complex: Complex) => {
    if (isFavorite(complex.id)) {
      await removeFavorite(complex.id);
    } else {
      await addFavorite(complex);
    }
  };

  const handleSelectComplex = (complex: Complex) => {
    navigation.navigate('ComplexDetails', { complex });
  };

  const renderComplexItem = ({ item }: { item: Complex }) => {
    const isFav = isFavorite(item.id);
    
    return (
      <TouchableOpacity 
        style={styles.complexItem}
        onPress={() => handleSelectComplex(item)}
      >
        <View style={styles.complexInfo}>
          <Text style={styles.complexName}>{item.name}</Text>
          <Text style={styles.complexCity}>{item.city}</Text>
          <Text style={styles.complexDistance}>{item.distance} km de distancia</Text>
        </View>
        
        <TouchableOpacity
          style={[styles.favoriteButton, isFav && styles.favoriteButtonActive]}
          onPress={() => handleToggleFavorite(item)}
        >
          <Text style={[styles.favoriteButtonText, isFav && styles.favoriteButtonTextActive]}>
            {isFav ? '★' : '☆'}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre o ciudad..."
          value={searchQuery}
          onChangeText={handleSearchChange}
        />
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
        </View>
      ) : (
        <>
          {filteredComplexes.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No se encontraron complejos deportivos</Text>
            </View>
          ) : (
            <FlatList
              data={filteredComplexes}
              keyExtractor={(item) => item.id}
              renderItem={renderComplexItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContent}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  searchContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  listContent: {
    padding: 15,
  },
  complexItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  complexInfo: {
    flex: 1,
  },
  complexName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  complexCity: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  complexDistance: {
    fontSize: 14,
    color: '#888',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  favoriteButtonActive: {
    backgroundColor: '#FFD700',
  },
  favoriteButtonText: {
    fontSize: 20,
    color: '#666',
  },
  favoriteButtonTextActive: {
    color: '#FFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default ComplexesScreen; 