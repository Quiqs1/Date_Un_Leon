import React from 'react';
import { StyleSheet, Text, View, Pressable, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  const handleLike = () => {
    Alert.alert('Date A Lion', 'Aún no hay perfiles cargados para dar Like.');
  };

  const handleNope = () => {
    Alert.alert('Date A Lion', 'Aún no hay perfiles cargados para descartar.');
  };

  const handleLogout = () => {
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.logo}>Date A Lion 🦁</Text>
        <View style={styles.headerIcons}>
          <Pressable onPress={() => router.push('/profile')} style={styles.iconButton}>
            <Ionicons name="person-circle-outline" size={32} color="#000" />
          </Pressable>
          <Pressable onPress={handleLogout} style={styles.iconButton}>
            <Ionicons name="log-out-outline" size={32} color="#000" />
          </Pressable>
        </View>
      </View>

      {/* ÁREA VACÍA DONDE IRÁN LOS PERFILES */}
      <View style={styles.content}>
        <View style={styles.emptyCard}>
          <Ionicons name="people-outline" size={80} color="#CCCCCC" />
          <Text style={styles.emptyTitle}>Aún no hay perfiles</Text>
          <Text style={styles.emptyText}>
            Aquí aparecerán las tarjetas de tus compañeros para hacer Match. ¡Invita a tus amigos a unirse!
          </Text>
        </View>
      </View>

      {/* BOTONES DE ACCIÓN (LIKE Y NOPE) */}
      <View style={styles.actionsContainer}>
        <Pressable 
          style={({ pressed }) => [styles.actionButton, styles.buttonNope, pressed && styles.buttonPressed]} 
          onPress={handleNope}
        >
          <Ionicons name="close" size={40} color="#FF3B30" />
        </Pressable>

        <Pressable 
          style={({ pressed }) => [styles.actionButton, styles.buttonLike, pressed && styles.buttonPressed]} 
          onPress={handleLike}
        >
          <Ionicons name="heart" size={40} color="#34C759" />
        </Pressable>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FF7A00' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  logo: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000000',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCard: {
    width: '100%',
    height: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed', // Borde punteado para indicar que está vacío
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 40,
    paddingTop: 10,
  },
  actionButton: {
    width: 75,
    height: 75,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonNope: {
    borderWidth: 2,
    borderColor: '#FF3B30',
  },
  buttonLike: {
    borderWidth: 2,
    borderColor: '#34C759',
  },
  buttonPressed: {
    transform: [{ scale: 0.9 }],
    opacity: 0.8,
  }
});