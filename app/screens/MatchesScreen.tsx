import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { matchService, Match } from '../services/matchService';
import { MainTabScreenProps } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProp } from '../navigation/types';

const MatchesScreen: React.FC<MainTabScreenProps<'Matches'>> = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const navigation = useNavigation<AppStackNavigationProp<'MatchDetails'>>();

  useEffect(() => {
    loadMatches();
  }, []);

  const loadMatches = async () => {
    setIsLoading(true);
    try {
      const data = await matchService.getMatches();
      setMatches(data);
    } catch (error) {
      console.error('Error loading matches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinMatch = async (matchId: string) => {
    try {
      const success = await matchService.joinMatch(matchId);
      if (success) {
        Alert.alert('Éxito', '¡Te has unido al partido!');
        loadMatches(); // Reload matches to update UI
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo unir al partido');
    }
  };

  const handleSelectMatch = (match: Match) => {
    navigation.navigate('MatchDetails', { match });
  };

  const handleCreateMatch = () => {
    navigation.navigate('CreateMatch', {});
  };

  const renderMatchItem = ({ item }: { item: Match }) => {
    const levelColors = {
      novato: '#4CAF50',
      intermedio: '#FFC107',
      avanzado: '#F44336',
    };
    
    return (
      <TouchableOpacity 
        style={styles.matchItem}
        onPress={() => handleSelectMatch(item)}
      >
        <View style={styles.matchHeader}>
          <Text style={styles.matchName}>{item.name}</Text>
          <View 
            style={[
              styles.levelBadge, 
              { backgroundColor: levelColors[item.level] }
            ]}
          >
            <Text style={styles.levelText}>
              {item.level.charAt(0).toUpperCase() + item.level.slice(1)}
            </Text>
          </View>
        </View>
        
        <View style={styles.matchDetails}>
          <Text style={styles.matchLocation}>{item.complexName}</Text>
          <Text style={styles.matchDateTime}>{item.date} - {item.time}</Text>
          <View style={styles.playersContainer}>
            <Text style={styles.playersText}>
              Jugadores: {item.players.current}/{item.players.required}
            </Text>
            
            {item.players.current < item.players.required && (
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => handleJoinMatch(item.id)}
              >
                <Text style={styles.joinButtonText}>Unirse</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
        </View>
      ) : (
        <>
          <FlatList
            data={matches}
            keyExtractor={(item) => item.id}
            renderItem={renderMatchItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No hay partidos disponibles</Text>
              </View>
            }
          />
          
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateMatch}
          >
            <Text style={styles.createButtonText}>+ Crear Partido</Text>
          </TouchableOpacity>
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
  listContent: {
    padding: 15,
    paddingBottom: 80, // Space for the create button
  },
  matchItem: {
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
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  matchName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginLeft: 10,
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  matchDetails: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  matchLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  matchDateTime: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  playersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playersText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  joinButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#0066CC',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MatchesScreen; 