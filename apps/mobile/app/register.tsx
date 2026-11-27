import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView, ScrollView, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CARRERAS = [
  'Administración y Dirección de Empresas',
  'Finanzas y Contaduría Pública',
  'Mercadotecnia Estratégica',
  'Negocios Internacionales',
  'Ingeniería Civil',
  'Ingeniería Industrial para la Dirección',
  'Ingeniería Biomédica',
  'Ingeniería Mecatrónica',
  'Ingeniería en Tecnologías de la Información y Negocios Digitales',
  'Diseño Multimedia',
  'Diseño Industrial',
  'Diseño de Moda e Innovación',
  'Diseño Gráfico',
  'Médico Cirujano',
  'Psicología',
  'Derecho',
  'Comunicación'
];

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [career, setCareer] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  
  const router = useRouter();

  const showAlert = (title: string, message: string) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleRegister = async () => {
    if (!name.trim() || !username.trim() || !email.trim() || !password.trim() || !phone.trim() || !career.trim()) {
      showAlert('Campos Incompletos', 'Todos los campos son obligatorios.');
      return;
    }

    if (!email.toLowerCase().endsWith('@anahuac.mx')) {
      showAlert('Correo Inválido', 'Debes usar tu correo institucional (@anahuac.mx).');
      return;
    }

    if (password.length < 6) {
      showAlert('Contraseña Débil', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (phone.length < 10) {
      showAlert('Teléfono Inválido', 'El número de teléfono debe tener 10 dígitos.');
      return;
    }

    try {
      const nuevoUsuario = {
        email: email.toLowerCase(),
        username: username.toLowerCase(),
      };
      
      await AsyncStorage.setItem('@user_data', JSON.stringify(nuevoUsuario));
      router.replace('/home');
    } catch (err) {
      showAlert('Error', 'Hubo un problema al guardar tus datos.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Crea tu cuenta</Text>
          <Text style={styles.subtitle}>Únete a la manada</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario (ej. leon_anahuac)"
            placeholderTextColor="#666"
            value={username}
            onChangeText={(text) => setUsername(text.toLowerCase())}
            autoCapitalize="none"
            autoCorrect={false}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Tu correo@anahuac.mx"
            placeholderTextColor="#666"
            value={email}
            onChangeText={(text) => setEmail(text.toLowerCase())}
            keyboardType="email-address"
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
          
          <TextInput
            style={styles.input}
            placeholder="Número de teléfono"
            placeholderTextColor="#666"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
          
          <Pressable style={styles.input} onPress={() => setModalVisible(true)}>
            <Text style={{ color: career ? '#000000' : '#666', fontSize: 16 }}>
              {career || 'Selecciona tu carrera'}
            </Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [styles.button, styles.buttonPrimary, pressed && styles.buttonPressed]} 
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Registrarme</Text>
          </Pressable>

          <Pressable 
            style={({ pressed }) => [styles.button, styles.buttonSecondary, pressed && styles.buttonPressed]} 
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Volver al Inicio</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona tu Carrera</Text>
            <FlatList
              data={CARRERAS}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.careerItem}
                  onPress={() => {
                    setCareer(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.careerText}>{item}</Text>
                </Pressable>
              )}
            />
            <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={alertVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.alertCard}>
            <Text style={styles.alertIcon}>⚠️</Text>
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
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  header: { marginBottom: 30, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: '900', color: '#000000', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#000000', textAlign: 'center', marginTop: 8, fontWeight: '500' },
  form: { width: '100%' },
  input: { 
    backgroundColor: '#FFFFFF', color: '#000000', padding: 16, borderRadius: 12, 
    fontSize: 16, marginBottom: 16, borderWidth: 0, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
    justifyContent: 'center',
  },
  button: { padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12, backgroundColor: '#FFFFFF' },
  buttonPrimary: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 5 },
  buttonSecondary: { backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#000000' },
  buttonPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  buttonText: { color: '#000000', fontSize: 16, fontWeight: 'bold' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', padding: 24 },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, maxHeight: '80%' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#000000', marginBottom: 16, textAlign: 'center' },
  careerItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#EEEEEE' },
  careerText: { fontSize: 16, color: '#333333' },
  closeButton: { marginTop: 16, backgroundColor: '#FF7A00', padding: 14, borderRadius: 10, alignItems: 'center' },
  closeButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },

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