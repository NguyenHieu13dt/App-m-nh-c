import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import RNFS from 'react-native-fs';

const users = require('./users.json');
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Initialize navigation
  const navigation = useNavigation();
  // Hàm kiểm tra email có hợp lệ không
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Hàm kiểm tra mật khẩu có đủ 6 ký tự không
  const isValidPassword = (password) => {
    return password.length >= 6;
  };
  const addUserToJSON = (email, password) => {
    // Giả lập việc thêm tài khoản vào JSON (cần backend hoặc thư viện fs để thực hiện thật)
    users.push({ email, password });
    Alert.alert('Đăng ký thành công', 'Tài khoản của bạn đã được tạo', [{ text: 'OK' }]);
    navigation.navigate('Homepage');
  };
  const handleLogin = async () => {
    // Kiểm tra email hợp lệ
    if (!isValidEmail(email)) {
      Alert.alert('Đăng nhập thất bại', 'Email không hợp lệ', [{ text: 'OK' }]);
      return;
    }

    // Kiểm tra mật khẩu hợp lệ
    if (!isValidPassword(password)) {
      Alert.alert('Đăng nhập thất bại', 'Mật khẩu phải có ít nhất 6 ký tự', [{ text: 'OK' }]);
      return;
    }

    // Kiểm tra tài khoản người dùng
    const user = users.find((u) => u.email === email);

    if (!user) {
      // Nếu email không tồn tại, hỏi người dùng có muốn đăng ký không
      Alert.alert(
        'Tài khoản không tồn tại',
        'Bạn có muốn đăng ký không?',
        [
          {
            text: 'Không',
            onPress: () => console.log('Không đăng ký'),
            style: 'cancel',
          },
          {
            text: 'Có',
            onPress: async () => {
              // Thêm tài khoản vào file (hoặc AsyncStorage trong trường hợp này)
              try {
                // Cập nhật dữ liệu người dùng
                users.push({ email, password });
                await AsyncStorage.setItem('users', JSON.stringify(users)); // Lưu vào AsyncStorage
                Alert.alert('Đăng ký thành công', 'Tài khoản đã được tạo', [
                  { text: 'OK', onPress: () => navigation.navigate('Homepage') },
                ]);
              } catch (error) {
                console.log('Lỗi khi lưu dữ liệu:', error);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else if (user.password !== password) {
      // Nếu mật khẩu sai
      Alert.alert('Đăng nhập thất bại', 'Sai mật khẩu', [{ text: 'OK' }]);
    } else {
      // Đăng nhập thành công
      navigation.navigate('Homepage');
    }
  };
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={{ uri: 'https://cdn.glitch.global/d67c77ea-6f26-44b5-a5a4-07cca9f2db7d/musium%20logo.png?v=1728023297973' }} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Login to your account</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          onChangeText={setEmail}
          value={email}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
      </View>

      {/* Remember Me */}
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkbox}>
          {rememberMe && <FontAwesome name="check-square" size={20} color="cyan" />}
          {!rememberMe && <FontAwesome name="square-o" size={20} color="gray" />}
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Remember me</Text>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot the password?</Text>
      </TouchableOpacity>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>or continue with</Text>
        <View style={styles.line} />
      </View>

      {/* Social Buttons */}
      <View style={styles.socialButtonsContainer}>
        <FontAwesome name="google" size={32} color="red" />
        <FontAwesome name="facebook" size={32} color="blue" style={styles.socialIcon} />
        <FontAwesome name="apple" size={32} color="black" />
      </View>

      {/* Sign Up Link */}
      <Text style={styles.signUpText}>
        Don’t have an account? 
        <Text style={styles.signUpLink} onPress={() => navigation.navigate('Intro')}>Sign Up</Text>
      </Text>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: 'white',
    paddingLeft: 10,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 5,
  },
  rememberMeText: {
    color: 'white',
  },
  loginButton: {
    backgroundColor: 'cyan',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: 'cyan',
    marginBottom: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  dividerText: {
    color: 'gray',
    marginHorizontal: 10,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  socialIcon: {
    marginHorizontal: 15,
  },
  signUpText: {
    color: 'white',
  },
  signUpLink: {
    color: 'cyan',
    fontWeight: 'bold',
  },
});
