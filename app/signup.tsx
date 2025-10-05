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

export default function SignupScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSignUp = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to the Terms and Conditions');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('http://192.168.137.1:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        // You can use AsyncStorage or secure storage here
        console.log('Signup successful:', data);
        Alert.alert('Success', 'Account created successfully!', [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)')
          }
        ]);
      } else {
        Alert.alert('Error', data.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  const handleTermsPress = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    Alert.alert('Terms and Conditions', 'Terms and conditions will be displayed here');
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
              
              <Text style={styles.title}>Join Evolvia</Text>
              <Text style={styles.subtitle}>Start your career evolution journey</Text>
            </Animated.View>

            {/* Signup Form */}
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
                {/* Username Input */}
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color="rgba(255, 255, 255, 0.7)" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Username"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

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

                {/* Confirm Password Input */}
                <View style={styles.inputContainer}>
                  <Ionicons name="lock-closed-outline" size={20} color="rgba(255, 255, 255, 0.7)" />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="rgba(255, 255, 255, 0.7)"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeButton}
                  >
                    <Ionicons 
                      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                      size={20} 
                      color="rgba(255, 255, 255, 0.7)" 
                    />
                  </TouchableOpacity>
                </View>

                {/* Terms and Conditions */}
                <TouchableOpacity 
                  style={styles.termsContainer} 
                  onPress={() => setAgreeToTerms(!agreeToTerms)}
                >
                  <View style={styles.checkboxContainer}>
                    <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
                      {agreeToTerms && (
                        <Ionicons name="checkmark" size={16} color="#fff" />
                      )}
                    </View>
                    <Text style={styles.termsText}>
                      I agree to the{' '}
                      <Text style={styles.termsLink} onPress={handleTermsPress}>
                        Terms and Conditions
                      </Text>
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Sign Up Button */}
                <TouchableOpacity
                  style={[styles.signupButton, isLoading && styles.signupButtonDisabled]}
                  onPress={handleSignUp}
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
                      <Text style={styles.buttonText}>Creating Account...</Text>
                    ) : (
                      <>
                        <Text style={styles.buttonText}>Create Account</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>


                {/* Sign In Link */}
                <View style={styles.signInContainer}>
                  <Text style={styles.signInText}>Already have an account? </Text>
                  <TouchableOpacity onPress={handleSignIn}>
                    <Text style={styles.signInLink}>Sign In</Text>
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
    marginBottom: 20,
  },
  logoContainer: {
    marginBottom: 15,
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
    minWidth: 0,
  },
  eyeButton: {
    padding: 4,
  },
  termsContainer: {
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  termsText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  termsLink: {
    color: '#fff',
    fontWeight: '600',
  },
  signupButton: {
    marginBottom: 16,
  },
  signupButtonDisabled: {
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
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  signInLink: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
