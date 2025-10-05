import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity, View, ScrollView, Text, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const handleFeaturePress = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleCategoryPress = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleAppPress = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
        <Image
                source={require('@/assets/images/logo.png')}
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.headerTitle}>Evolvia</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton} onPress={handleFeaturePress}>
              <Ionicons name="notifications-outline" size={24} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} onPress={handleFeaturePress}>
              <Ionicons name="person-circle-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search career tools, courses..."
              placeholderTextColor="#666"
            />
            <TouchableOpacity onPress={handleFeaturePress}>
              <Ionicons name="mic-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Featured Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity onPress={handleFeaturePress}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <TouchableOpacity style={styles.featuredCard} onPress={handleAppPress}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.featuredGradient}
              >
                <View style={styles.featuredContent}>
                  <Ionicons name="analytics" size={40} color="#fff" />
                  <Text style={styles.featuredTitle}>Career Assessment</Text>
                  <Text style={styles.featuredDescription}>Discover your ideal career path</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.featuredCard} onPress={handleAppPress}>
              <LinearGradient
                colors={['#f093fb', '#f5576c']}
                style={styles.featuredGradient}
              >
                <View style={styles.featuredContent}>
                  <Ionicons name="trending-up" size={40} color="#fff" />
                  <Text style={styles.featuredTitle}>Skill Tracker</Text>
                  <Text style={styles.featuredDescription}>Track your progress</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={handleFeaturePress}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.categoriesGrid}>
            <TouchableOpacity style={styles.categoryCard} onPress={handleCategoryPress}>
              <View style={styles.categoryIcon}>
                <Ionicons name="business" size={24} color="#667eea" />
              </View>
              <Text style={styles.categoryText}>Career Flowcharts</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryCard} onPress={handleCategoryPress}>
              <View style={styles.categoryIcon}>
                <Ionicons name="location" size={24} color="#667eea" />
              </View>
              <Text style={styles.categoryText}>Find Nearby Colleges</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryCard} onPress={handleCategoryPress}>
              <View style={styles.categoryIcon}>
                <Ionicons name="school" size={24} color="#667eea" />
              </View>
              <Text style={styles.categoryText}>Scholarships</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.categoryCard} onPress={handleCategoryPress}>
              <View style={styles.categoryIcon}>
                <Ionicons name="library" size={24} color="#667eea" />
              </View>
              <Text style={styles.categoryText}>Career Databanks</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recommended Tools */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity onPress={handleFeaturePress}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            <TouchableOpacity style={styles.appCard} onPress={handleAppPress}>
              <View style={styles.appIcon}>
                <Ionicons name="person" size={32} color="#667eea" />
              </View>
              <Text style={styles.appTitle}>Profile Builder</Text>
              <Text style={styles.appDescription}>Build your professional profile</Text>
              <View style={styles.appRating}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.appCard} onPress={handleAppPress}>
              <View style={styles.appIcon}>
                <Ionicons name="book" size={32} color="#667eea" />
              </View>
              <Text style={styles.appTitle}>Skill Courses</Text>
              <Text style={styles.appDescription}>Learn new skills</Text>
              <View style={styles.appRating}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.6</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.appCard} onPress={handleAppPress}>
              <View style={styles.appIcon}>
                <Ionicons name="chatbubbles" size={32} color="#667eea" />
              </View>
              <Text style={styles.appTitle}>Career Chat</Text>
              <Text style={styles.appDescription}>Get expert advice</Text>
              <View style={styles.appRating}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>4.9</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={handleFeaturePress}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.activityList}>
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="calendar" size={20} color="#4CAF50" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Appointment with Dr. Ananya Singh</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="people" size={20} color="#2196F3" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Meeting with Priya Sharma completed</Text>
                <Text style={styles.activityTime}>1 day ago</Text>
              </View>
            </View>
            
            <View style={styles.activityItem}>
              <View style={styles.activityIcon}>
                <Ionicons name="help-circle" size={20} color="#FF9800" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Career Aptitude Quiz taken</Text>
                <Text style={styles.activityTime}>3 days ago</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerLogo: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 8,
  },
  searchContainer: {
    marginTop: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f4',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
  horizontalScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  featuredCard: {
    width: 280,
    height: 160,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featuredGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  featuredContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  featuredDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  featuredBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  appCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  appIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  appTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  appRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  activityList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
  },
});
