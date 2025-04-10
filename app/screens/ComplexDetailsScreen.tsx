import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AppStackScreenProps } from '../navigation/types';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProp } from '../navigation/types';

const ComplexDetailsScreen: React.FC<AppStackScreenProps<'ComplexDetails'>> = ({ route }) => {
  const { complex } = route.params;
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const navigation = useNavigation<AppStackNavigationProp<'CreateMatch'>>();
  
  const isFav = isFavorite(complex.id);

  const handleToggleFavorite = async () => {
    if (isFav) {
      await removeFavorite(complex.id);
      Alert.alert('Éxito', 'Complejo eliminado de favoritos');
    } else {
      await addFavorite(complex);
      Alert.alert('Éxito', 'Complejo agregado a favoritos');
    }
  };

  const handleCreateMatch = () => {
    navigation.navigate('CreateMatch', { complexId: complex.id });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerImage}>
        <Text style={styles.complexName}>{complex.name}</Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, isFav && styles.actionButtonActive]}
          onPress={handleToggleFavorite}
        >
          <Text style={[styles.actionButtonText, isFav && styles.actionButtonTextActive]}>
            {isFav ? '★ Favorito' : '☆ Agregar a Favoritos'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.createMatchButton}
          onPress={handleCreateMatch}
        >
          <Text style={styles.createMatchButtonText}>Crear Partido</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Detalles del Complejo</Text>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Nombre:</Text>
          <Text style={styles.detailValue}>{complex.name}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Ciudad:</Text>
          <Text style={styles.detailValue}>{complex.city}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Dirección:</Text>
          <Text style={styles.detailValue}>{complex.address || 'No especificada'}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Distancia:</Text>
          <Text style={styles.detailValue}>{complex.distance} km</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Este complejo deportivo ofrece diversas instalaciones para la práctica de diferentes deportes.
          Puedes crear un partido nuevo o unirte a uno existente.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  headerImage: {
    height: 200,
    backgroundColor: '#0066CC',
    justifyContent: 'flex-end',
    padding: 20,
  },
  complexName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#0066CC',
    borderRadius: 5,
    marginRight: 10,
    alignItems: 'center',
  },
  actionButtonActive: {
    backgroundColor: '#FFD700',
    borderColor: '#FFD700',
  },
  actionButtonText: {
    color: '#0066CC',
    fontWeight: '500',
  },
  actionButtonTextActive: {
    color: '#000',
  },
  createMatchButton: {
    flex: 1,
    backgroundColor: '#0066CC',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  createMatchButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  detailsContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  detailItem: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default ComplexDetailsScreen; 