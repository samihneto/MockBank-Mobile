import { useAuth } from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity, KeyboardAvoidingView,
  Platform,
  Alert,
  Image
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [apelido, setApelido] = useState('');
  const [senha, setSenha] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const router = useRouter();

  const { handleLogin } = useAuth();

  async function submit() {
    //  if(!isSaved) {
    await AsyncStorage.setItem("@mock-bank-password", senha);
    await AsyncStorage.setItem("@mock-bank-apelido", apelido);
    //  }

    handleLogin(apelido, senha);
  }

  async function handleBiometricAuth() {
    try {
      const isAvailable = await LocalAuthentication.hasHardwareAsync();

      if (!isAvailable) {
        return Alert.alert(
          "Não suportado"
        )
      }

      // Verificar se a biometria esta cadastrada
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        return Alert.alert(
          "Nenhuma biometria"
        )
      }

      // Faz a autenticação
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autentique-se para continuar",
        fallbackLabel: "Usar senha",
        disableDeviceFallback: false
      });

      if (result.success) {
        // Função
      } else {
        // Falha
      }


    } catch (error) {
      console.log(error);
    }
  }

  // Verificação se o dispositivo tem biometria
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem("@allow-fingerprint");
        setIsSaved(saved === "true");

        if (saved === "true") {
          const senha = await AsyncStorage.getItem("@mock-bank-password");
          const apelido = await AsyncStorage.getItem("@mock-bank-apelido");

          if (senha === null || apelido === null) {
            return;
          }

          const result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Autentique-se para continuar",
            fallbackLabel: "Usar senha",
            disableDeviceFallback: false
          });

          if (result.success) {
            handleLogin(apelido, senha);
          } else {
            Alert.alert("Falha na biometria.");
            return;
          }
        }

      } catch (error) {
        console.log(error)
      }
    })();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/logo-r.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Bem-vindo de volta!</Text>
        <Text style={styles.subtitle}>Entre em sua conta.</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Apelido</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu apelido"
          placeholderTextColor="#888"
          value={apelido}
          onChangeText={setApelido}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#888"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={submit}>
          <Text style={styles.loginButtonText}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotsenha}>
          <Text style={styles.forgotsenhaText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Não tem uma conta? </Text>
          <TouchableOpacity onPress={() => router.push("/Register")}>
            <Text style={styles.signupLink}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.icon} onPress={()=> router.push("/")}>
          <MaterialIcons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginLeft: 30,
    alignItems: 'flex-start',
    marginTop: 60,
    marginBottom: 30,
    gap: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  subtitle: {
    color: 'gray',
  },
  formContainer: {
    paddingHorizontal: 30,
    gap: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f4f4f4',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  forgotsenha: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  forgotsenhaText: {
    color: '#5A45FE',
    fontSize: 16,
    fontWeight: 600,
  },
  loginButton: {
    backgroundColor: '#ED145B',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#333',
    fontSize: 14,
  },
  signupLink: {
    color: '#5A45FE',
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    height: 40, // aumentei de 30 para 40
    width: 40,
    borderRadius: 20, // para deixá-lo mais redondo
    alignSelf: 'center', // centraliza horizontalmente na tela
    marginTop: 20 // opcional, só para espaçamento
  }
});