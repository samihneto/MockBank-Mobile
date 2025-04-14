import { useRouter } from 'expo-router';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity, StatusBar, Image
} from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  // const navigateToLogin = () => {
  //   router.push("/Login")
  // };

  // const navigateToSignUp = () => {
  //   router.push("/Register")
  // };

  return (
    <>
      {/* <StatusBar barStyle="dark-content" backgroundColor="#f7f8fa" /> */}

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/images/logo-r.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.appName}>Mock Bank</Text>
          <Text style={styles.slogan}>O Banco de todos</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push('/Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signUpButton}
            onPress={() => router.push('/Register')}
            activeOpacity={0.8}
          >
            <Text style={styles.signUpButtonText}>CADASTRO</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Desenvolvido por Samir Hage Neto</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e3e5c',
    marginBottom: 10,
  },
  slogan: {
    fontSize: 16,
    color: '#7b8bb2',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 50,
    marginBottom: 30,
  },
  loginButton: {
    backgroundColor: '#ED145B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#ED145B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  signUpButtonText: {
    color: '#2e3e5c',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#7b8bb2',
  },
});