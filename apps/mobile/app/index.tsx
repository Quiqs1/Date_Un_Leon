import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Alert, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    if (!identifier.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu correo o nombre de usuario.');
      return;
    }

    const isEmail = identifier.includes('@');

    if (isEmail) {
      if (!identifier.toLowerCase().endsWith('@anahuac.mx')) {
        Alert.alert('Acceso Denegado', 'Si usas correo, debe ser institucional (@anahuac.mx)');
        return;
      }
    } else {
      if (identifier.length < 3) {
        Alert.alert('Error', 'El nombre de usuario debe tener al menos 3 caracteres.');
        return;
      }
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <Image 
          source={require('../assets/L-ana.webp')} 
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.header}>
          <Text style={styles.title}>Date A Lion</Text>
          <Text style={styles.subtitle}>Conecta con tu manada universitaria</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Correo o User name"
            placeholderTextColor="#666"
            value={identifier}
            onChangeText={setIdentifier}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable 
            style={({ pressed }) => [styles.button, styles.buttonPrimary, pressed && styles.buttonPressed]} 
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [styles.button, styles.buttonSecondary, pressed && styles.buttonPressed]} 
            onPress={() => router.push('/register')}
          >
            <Text style={styles.buttonText}>Crear Cuenta Nueva</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF7A00' },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  logo: { width: 120, height: 120, alignSelf: 'center', marginBottom: 10 },
  header: { marginBottom: 40, alignItems: 'center' },
  title: { fontSize: 42, fontWeight: '900', color: '#000000', textAlign: 'center', letterSpacing: 1 },
  subtitle: { fontSize: 16, color: '#000000', textAlign: 'center', marginTop: 8, fontWeight: '500' },
  form: { width: '100%' },
  input: { 
    backgroundColor: '#FFFFFF', color: '#000000', padding: 16, borderRadius: 12, 
    fontSize: 16, marginBottom: 16, borderWidth: 0, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  button: { 
    padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', 
    marginBottom: 12, backgroundColor: '#FFFFFF',
  },
  buttonPrimary: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  buttonSecondary: { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#000000' },
  buttonPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  buttonText: { color: '#000000', fontSize: 16, fontWeight: 'bold' },
});