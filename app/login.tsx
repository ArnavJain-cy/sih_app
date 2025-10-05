import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogin = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://192.168.137.1:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        // You can use AsyncStorage or secure storage here
        console.log('Login successful:', data);
        Alert.alert('Success', 'Login successful!', [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)')
          }
        ]);
      } else {
        Alert.alert('Error', data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    // Navigate to sign up screen
    router.push('/signup');
  };

  const handleForgotPassword = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert('Forgot Password', 'Password reset functionality will be implemented');
  };

  const handleGuestLogin = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    try {
      const response = await fetch('http://192.168.137.1:3000/api/auth/guest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Guest login successful:', data);
        // Store guest token and navigate
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Guest login failed');
      }
    } catch (error) {
      console.error('Guest login error:', error);
      // Fallback: navigate anyway for guest access
      router.replace('/(tabs)');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Floating Elements */}
        <Animated.View style={[styles.floatingElement, styles.floating1, { opacity: fadeAnim }]}>
          <View style={styles.circle} />
        </Animated.View>
        <Animated.View style={[styles.floatingElement, styles.floating2, { opacity: fadeAnim }]}>
          <View style={[styles.circle, styles.circleSmall]} />
        </Animated.View>
        <Animated.View style={[styles.floatingElement, styles.floating3, { opacity: fadeAnim }]}>
          <View style={[styles.circle, styles.circleMedium]} />
        </Animated.View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <Animated.View
              style={[
                styles.header,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.logoContainer}>
                <Image
                  source={require('@/assets/images/logo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
              </View>
              
              <Text style={styles.title}>Welcome to Evolvia</Text>
              <Text style={styles.subtitle}>Sign in to continue your career journey</Text>
            </Animated.View>

            {/* Login Form */}
            <Animated.View
              style={[
                styles.formContainer,
                {
                  opacity: fadeAnim,
                  transform: [
                    { translateY: slideAnim },
                    { scale: scaleAnim },
                  ],
                },
              ]}
            >
              <BlurView intensity={20} style={styles.formBlur}>
                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <Ionicons name="mail-outline" size={20} color="rgba(255, 255, 255, 0.7)" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="rgba(255, 255, 255, 0.7)" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.eyeButton}
                  >
                    <Ionicons 
                      name={showPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="rgba(255, 255, 255, 0.7)" 
                    />
                  </TouchableOpacity>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity style={styles.forgotPassword} onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Login Button */}
                <TouchableOpacity
                  style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
                  onPress={handleLogin}
                  activeOpacity={0.8}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={isLoading ? ['#999', '#666'] : ['#667eea', '#764ba2']}
                    style={styles.buttonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    {isLoading ? (
                      <Text style={styles.buttonText}>Signing In...</Text>
                    ) : (
                      <>
                        <Text style={styles.buttonText}>Sign In</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Guest Login Button */}
                <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
                  <Ionicons name="person-outline" size={20} color="#fff" />
                  <Text style={styles.guestButtonText}>Continue as Guest</Text>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={handleSignUp}>
                    <Text style={styles.signUpLink}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </BlurView>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    width: width,
    height: height,
  },
  floatingElement: {
    position: 'absolute',
  },
  floating1: {
    top: height * 0.1,
    right: width * 0.1,
  },
  floating2: {
    top: height * 0.3,
    left: width * 0.05,
  },
  floating3: {
    top: height * 0.6,
    right: width * 0.2,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  circleSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  circleMedium: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  logoContainer: {
    marginBottom: 15,
  },
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logoImage: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formBlur: {
    borderRadius: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
  },
  eyeButton: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    marginBottom: 16,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginHorizontal: 16,
  },
  guestButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  guestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  signUpLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
