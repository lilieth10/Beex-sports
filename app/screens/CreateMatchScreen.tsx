import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { AppStackScreenProps } from '../navigation/types';
import { matchService } from '../services/matchService';
import { complexService } from '../services/complexService';
import { Complex } from '../context/FavoritesContext';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateMatchScreen: React.FC<AppStackScreenProps<'CreateMatch'>> = ({ route, navigation }) => {
  const { complexId } = route.params;
  
  const [matchName, setMatchName] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState<'novato' | 'intermedio' | 'avanzado'>('novato');
  const [complex, setComplex] = useState<Complex | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [playersRequired, setPlayersRequired] = useState('10');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (complexId) {
      loadComplex();
    }
  }, [complexId]);

  const loadComplex = async () => {
    if (!complexId) return;
    
    try {
      const complexData = await complexService.getComplexById(complexId);
      if (complexData) {
        setComplex(complexData);
      }
    } catch (error) {
      console.error('Error loading complex:', error);
    }
  };

  const handleLevelSelect = (selectedLevel: 'novato' | 'intermedio' | 'avanzado') => {
    setLevel(selectedLevel);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      setTime(selectedTime);
    }
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const validateForm = () => {
    if (!matchName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para el partido');
      return false;
    }
    
    if (!complex) {
      Alert.alert('Error', 'Por favor selecciona un complejo deportivo');
      return false;
    }
    
    if (isNaN(Number(playersRequired)) || Number(playersRequired) <= 1) {
      Alert.alert('Error', 'El número de jugadores debe ser mayor a 1');
      return false;
    }
    
    return true;
  };

  const handleCreateMatch = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const newMatch = {
        name: matchName,
        complexId: complex!.id,
        complexName: complex!.name,
        date: formatDate(date),
        time: formatTime(time),
        players: {
          current: 1, // Creador cuenta como primer jugador
          required: Number(playersRequired),
        },
        level,
        description,
      };
      
      const createdMatch = await matchService.createMatch(newMatch);
      
      Alert.alert(
        'Éxito',
        'Partido creado correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el partido');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Crear Nuevo Partido</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre del partido *</Text>
          <TextInput
            style={styles.input}
            value={matchName}
            onChangeText={setMatchName}
            placeholder="Ej: Partido amistoso"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Complejo deportivo *</Text>
          {complex ? (
            <View style={styles.complexInfoContainer}>
              <Text style={styles.complexName}>{complex.name}</Text>
              <Text style={styles.complexAddress}>{complex.city}</Text>
            </View>
          ) : (
            <Text style={styles.noComplexText}>No se ha seleccionado ningún complejo</Text>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha *</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hora *</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>{formatTime(time)}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de jugadores necesarios *</Text>
          <TextInput
            style={styles.input}
            value={playersRequired}
            onChangeText={setPlayersRequired}
            keyboardType="number-pad"
            placeholder="Ej: 10"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nivel de juego *</Text>
          <View style={styles.levelButtons}>
            {(['novato', 'intermedio', 'avanzado'] as const).map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.levelButton,
                  level === option && styles.levelButtonSelected,
                ]}
                onPress={() => handleLevelSelect(option)}
              >
                <Text 
                  style={[
                    styles.levelButtonText,
                    level === option && styles.levelButtonTextSelected,
                  ]}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descripción (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe detalles del partido, reglas, etc."
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <TouchableOpacity
          style={[styles.createButton, isLoading && styles.disabledButton]}
          onPress={handleCreateMatch}
          disabled={isLoading}
        >
          <Text style={styles.createButtonText}>
            {isLoading ? 'Creando...' : 'Crear Partido'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  formContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'flex-start',
  },
  levelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  levelButtonSelected: {
    backgroundColor: '#0066CC',
    borderColor: '#0066CC',
  },
  levelButtonText: {
    fontWeight: '500',
    color: '#333',
  },
  levelButtonTextSelected: {
    color: 'white',
  },
  complexInfoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  complexName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  complexAddress: {
    fontSize: 14,
    color: '#666',
  },
  noComplexText: {
    padding: 12,
    color: '#999',
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontStyle: 'italic',
  },
  createButton: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#97bce3',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateMatchScreen; 