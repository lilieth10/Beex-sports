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
import { matchService } from '../services/matchService';
import { useNavigation } from '@react-navigation/native';

const MatchDetailsScreen: React.FC<AppStackScreenProps<'MatchDetails'>> = ({ route }) => {
  const { match } = route.params;
  const navigation = useNavigation();
  
  const handleJoinMatch = async () => {
    try {
      const success = await matchService.joinMatch(match.id);
      if (success) {
        Alert.alert('Éxito', '¡Te has unido al partido!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo unir al partido');
    }
  };

  const levelColors = {
    novato: '#4CAF50',
    intermedio: '#FFC107',
    avanzado: '#F44336',
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.matchName}>{match.name}</Text>
        <View 
          style={[
            styles.levelBadge, 
            { backgroundColor: levelColors[match.level] }
          ]}
        >
          <Text style={styles.levelText}>
            {match.level.charAt(0).toUpperCase() + match.level.slice(1)}
          </Text>
        </View>
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Complejo:</Text>
          <Text style={styles.detailValue}>{match.complexName}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fecha:</Text>
          <Text style={styles.detailValue}>{match.date}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Hora:</Text>
          <Text style={styles.detailValue}>{match.time}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Jugadores:</Text>
          <Text style={styles.detailValue}>
            {match.players.current} de {match.players.required}
          </Text>
        </View>
      </View>
      
      {match.description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Descripción</Text>
          <Text style={styles.descriptionText}>{match.description}</Text>
        </View>
      )}
      
      <View style={styles.playersInfoContainer}>
        <Text style={styles.playersInfoTitle}>Información de Jugadores</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${(match.players.current / match.players.required) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.playersInfoText}>
            {match.players.current} jugadores de {match.players.required} necesarios
          </Text>
        </View>
      </View>
      
      {match.players.current < match.players.required && (
        <TouchableOpacity
          style={styles.joinButton}
          onPress={handleJoinMatch}
        >
          <Text style={styles.joinButtonText}>Unirse al Partido</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  matchName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
  },
  levelText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
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
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    color: '#666',
  },
  detailValue: {
    flex: 2,
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionContainer: {
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
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  playersInfoContainer: {
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
  playersInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  progressContainer: {
    marginBottom: 10,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0066CC',
    borderRadius: 5,
  },
  playersInfoText: {
    fontSize: 14,
    color: '#666',
  },
  joinButton: {
    backgroundColor: '#0066CC',
    margin: 15,
    marginTop: 0,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MatchDetailsScreen; 