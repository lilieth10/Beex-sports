import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Animated,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { MainTabScreenProps } from '../navigation/types';

const ProfileScreen: React.FC<MainTabScreenProps<'Profile'>> = () => {
  const { user, updateUser, signOut } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [city, setCity] = useState(user?.city || '');
  const [level, setLevel] = useState<'novato' | 'intermedio' | 'avanzado' | undefined>(user?.level);
  const progressAnimation = new Animated.Value(0);
  
  // Animate progress bar on component mount
  React.useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: (user?.profileCompleted || 0) / 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [user?.profileCompleted]);

  const handleLevelSelect = (selectedLevel: 'novato' | 'intermedio' | 'avanzado') => {
    setLevel(selectedLevel);
  };

  const handleSaveProfile = async () => {
    try {
      await updateUser({
        name,
        city,
        level,
      });
      setIsEditing(false);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el perfil');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressTitle}>Perfil completado</Text>
          <View style={styles.progressBarBg}>
            <Animated.View 
              style={[
                styles.progressBarFill, 
                { width: progressWidth }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{user?.profileCompleted || 0}%</Text>
        </View>

        <View style={styles.infoContainer}>
          {isEditing ? (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Tu nombre"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Ciudad</Text>
                <TextInput
                  style={styles.input}
                  value={city}
                  onChangeText={setCity}
                  placeholder="Tu ciudad"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Nivel de juego</Text>
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

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveButtonText}>Guardar Cambios</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Nombre:</Text>
                <Text style={styles.infoValue}>{user?.name || 'No especificado'}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Email:</Text>
                <Text style={styles.infoValue}>{user?.email || 'No especificado'}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Ciudad:</Text>
                <Text style={styles.infoValue}>{user?.city || 'No especificado'}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Nivel de juego:</Text>
                <Text style={styles.infoValue}>
                  {user?.level 
                    ? user.level.charAt(0).toUpperCase() + user.level.slice(1)
                    : 'No especificado'
                  }
                </Text>
              </View>

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.editButtonText}>Editar Perfil</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  logoutButtonText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
  profileContainer: {
    padding: 20,
  },
  progressContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  progressBarBg: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0066CC',
    borderRadius: 5,
  },
  progressText: {
    textAlign: 'right',
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  editButton: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
    backgroundColor: '#f5f5f5',
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
  saveButton: {
    backgroundColor: '#0066CC',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 