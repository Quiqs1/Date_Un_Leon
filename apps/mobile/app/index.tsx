import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const router = useRouter();

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      showAlert('Campos vacíos', 'Por favor ingresa tus datos.');
      return;
    }

    if (identifier.includes('@') && !identifier.toLowerCase().endsWith('@anahuac.mx')) {
      showAlert('Acceso Denegado', 'Si usas correo, debe ser institucional (@anahuac.mx)');
      return;
    }

    try {
      const data = await AsyncStorage.getItem('@user_data');
      
      if (!data) {
        showAlert('Sin Registro', 'No hay ningún usuario registrado. Por favor, regístrate primero.');
        return;
      }

      const usuarioGuardado = JSON.parse(data);
      const inputUsuario = identifier.toLowerCase();

      const matchUsuario = inputUsuario === usuarioGuardado.email || inputUsuario === usuarioGuardado.username;
      if (matchUsuario && password.length > 0) {
        router.replace('/home');
      } else {
        showAlert('Error', 'El correo/usuario o la contraseña son incorrectos.');
      }
    } catch (err) {
      showAlert('Error', 'Hubo un problema al verificar tus datos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={require('../assets/L-ana.webp')} style={styles.logo} resizeMode="contain" />

        <View style={styles.header}>
          <Text style={styles.title}>Date A Lion</Text>
          <Text style={styles.subtitle}>Conecta con tu manada universitaria</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Correo o Nombre de usuario"
            placeholderTextColor="#666"
            value={identifier}
            onChangeText={(text) => setIdentifier(text.toLowerCase())}
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

      <Modal visible={alertVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertCard}>
            <Text style={styles.alertIcon}>🚨</Text>
            <Text style={styles.alertTitle}>{alertTitle}</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>
            <Pressable style={styles.alertButton} onPress={() => setAlertVisible(false)}>
              <Text style={styles.alertButtonText}>Entendido</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FF7A00' },
  content: { flex: 1, justifyContent: 'center', padding: 24 },
  logo: { width: 120, height: 120, alignSelf: 'center', marginBottom: 10 },
  header: { marginBottom: 30, alignItems: 'center' },
  title: { fontSize: 42, fontWeight: '900', color: '#000000', textAlign: 'center', letterSpacing: 1 },
  subtitle: { fontSize: 16, color: '#000000', textAlign: 'center', marginTop: 8, fontWeight: '500' },
  form: { width: '100%' },
  input: { 
    backgroundColor: '#FFFFFF', color: '#000000', padding: 16, borderRadius: 12, 
    fontSize: 16, marginBottom: 16, borderWidth: 0, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  button: { padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12, backgroundColor: '#FFFFFF' },
  buttonPrimary: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  buttonSecondary: { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#000000' },
  buttonPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  buttonText: { color: '#000000', fontSize: 16, fontWeight: 'bold' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  alertCard: { 
    backgroundColor: '#FFFFFF', width: '100%', borderRadius: 20, padding: 24, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10,
  },
  alertIcon: { fontSize: 50, marginBottom: 10 },
  alertTitle: { fontSize: 22, fontWeight: '900', color: '#000000', marginBottom: 8, textAlign: 'center' },
  alertMessage: { fontSize: 16, color: '#555555', textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  alertButton: { backgroundColor: '#FF7A00', width: '100%', padding: 16, borderRadius: 12, alignItems: 'center' },
  alertButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }
});