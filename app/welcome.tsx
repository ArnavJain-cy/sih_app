import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

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

  const handleGetStarted = async () => {
    // Haptic feedback
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    // Navigate to login page
    router.push('/login');
  };

  const handleLearnMore = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    // Add learn more functionality
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

        {/* Main Content */}
        <Animated.View
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim },
              ],
            },
          ]}
        >
          {/* Logo/Icon */}
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>Evolvia</Text>
          <Text style={styles.subtitle}>Your Journey to Success Starts Here</Text>

          {/* Description */}
          <Text style={styles.description}>
            Discover your ideal career path with personalized guidance, 
            skill assessments, and expert counseling tailored just for you.
          </Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.featureText}>Personalized Assessments</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.featureText}>Expert Career Guidance</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
              <Text style={styles.featureText}>Skill Development Plans</Text>
            </View>
          </View>
        </Animated.View>

        {/* Bottom Actions */}
        <Animated.View
          style={[
            styles.bottomContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <BlurView intensity={20} style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.primaryButtonText}>Get Started</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleLearnMore}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>Learn More</Text>
              <Ionicons name="information-circle-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </BlurView>
        </Animated.View>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
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
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '300',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 12,
    fontWeight: '500',
  },
  bottomContainer: {
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  buttonContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  primaryButton: {
    marginBottom: 15,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginRight: 10,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 8,
    fontWeight: '500',
  },
});
