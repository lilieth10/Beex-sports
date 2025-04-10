import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { matchService, Match } from '../services/matchService';
import { useAuth } from '../context/AuthContext';
import { MainTabScreenProps } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProp } from '../navigation/types';
import { CommonActions } from '@react-navigation/native';

const MatchmakingScreen: React.FC<MainTabScreenProps<'Matchmaking'>> = () => {
  const [recommendedMatches, setRecommendedMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const { user } = useAuth();
  const navigation = useNavigation<AppStackNavigationProp<'MatchDetails'>>();

  useEffect(() => {
    loadRecommendedMatches();
  }, [user?.level]);

  const loadRecommendedMatches = async () => {
    setIsLoading(true);
    try {
      // If user has a level, filter matches by that level
      // Otherwise, show all matches
      let matches;
      if (user?.level) {
        matches = await matchService.getMatchesByLevel(user.level);
      } else {
        matches = await matchService.getMatches();
      }
      setRecommendedMatches(matches);
    } catch (error) {
      console.error('Error loading recommended matches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinMatch = async (matchId: string) => {
    try {
      const success = await matchService.joinMatch(matchId);
      if (success) {
        Alert.alert('Éxito', '¡Te has unido al partido!');
        loadRecommendedMatches(); // Reload matches to update UI
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo unir al partido');
    }
  };

  const handleSelectMatch = (match: Match) => {
    navigation.navigate('MatchDetails', { match });
  };

  const navigateToProfile = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'Main',
      })
    );
    
    // Use setTimeout to ensure the previous navigation completes
    setTimeout(() => {
      navigation.dispatch(
        CommonActions.navigate({
          name: 'Profile',
        })
      );
    }, 100);
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No hay partidos recomendados</Text>
        {!user?.level ? (
          <View>
            <Text style={styles.emptyText}>
              Para obtener recomendaciones personalizadas, configura tu nivel de juego en tu perfil.
            </Text>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={navigateToProfile}
            >
              <Text style={styles.profileButtonText}>Ir a mi Perfil</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={styles.emptyText}>
            No encontramos partidos que coincidan con tu nivel de juego ({user.level}).
            Revisa más tarde o crea un partido nuevo.
          </Text>
        )}
      </View>
    );
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
          <Text style={styles.matchDescription} numberOfLines={2}>
            {item.description || 'Sin descripción'}
          </Text>
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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Partidos Recomendados</Text>
        {user?.level && (
          <View style={styles.userLevelContainer}>
            <Text style={styles.userLevelLabel}>Tu nivel:</Text>
            <Text style={styles.userLevelValue}>
              {user.level.charAt(0).toUpperCase() + user.level.slice(1)}
            </Text>
          </View>
        )}
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0066CC" />
        </View>
      ) : (
        <FlatList
          data={recommendedMatches}
          keyExtractor={(item) => item.id}
          renderItem={renderMatchItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userLevelLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  userLevelValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  listContent: {
    padding: 15,
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
    marginBottom: 5,
  },
  matchDescription: {
    fontSize: 14,
    color: '#666',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
  },
  profileButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MatchmakingScreen; 