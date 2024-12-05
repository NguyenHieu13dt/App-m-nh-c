import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

export default function SignIn({ navigation }) { // Destructure navigation prop
  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => alert('Back')}>
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image source={{ uri: 'https://cdn.glitch.global/d67c77ea-6f26-44b5-a5a4-07cca9f2db7d/musium%20logo.png?v=1728023297973' }} style={styles.logo} /> 
      </View>

      <Text style={styles.title}>Let’s get you in</Text>

      <TouchableOpacity 
        style={styles.googleButton} 
        onPress={() => navigation.navigate('Login')} // chuyển hướng sang login
      >
        <FontAwesome name="google" size={20} color="#DB4437" />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.facebookButton} onPress={() => alert('Facebook Login')}>
        <FontAwesome name="facebook" size={20} color="#4267B2" />
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.appleButton} onPress={() => alert('Apple Login')}>
        <FontAwesome name="apple" size={20} color="white" />
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity 
        style={styles.passwordButton} 
        onPress={() => navigation.navigate('Login')} // Navigate to Login
      >
        <Text style={styles.buttonText}>Log in with a password</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
    padding: 20,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logoContainer: {
    marginTop: 100,
    marginBottom: 30,
  },
  logo: {
    width: 325,
    height: 254,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  facebookButton: {
    flexDirection: 'row',
    backgroundColor: '#333333',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleButton: {
flexDirection: 'row',
    backgroundColor: '#333333',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
  orText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  passwordButton: {
    backgroundColor: '#00bfff',
    paddingVertical: 12,
    borderRadius: 30,
    marginBottom: 20,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpLink: {
    marginTop: 20,
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});