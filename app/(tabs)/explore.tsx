import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ExploreScreen() {
  const mentors = [
    {
      id: 1,
      name: 'Priya Sharma',
      title: 'Senior Software Engineer',
      company: 'TCS',
      education: 'B.Tech CSE - IIT Delhi',
      experience: '8 years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
      specialties: ['Java', 'Spring Boot', 'Career Guidance'],
    },
    {
      id: 2,
      name: 'Arjun Patel',
      title: 'Product Manager',
      company: 'Flipkart',
      education: 'B.Tech + MBA - IIM Ahmedabad',
      experience: '6 years',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      specialties: ['Product Strategy', 'Leadership', 'Startups'],
    },
    {
      id: 3,
      name: 'Kavya Reddy',
      title: 'UX Designer',
      company: 'Zomato',
      education: 'B.Tech Design - NID',
      experience: '5 years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      specialties: ['UI/UX Design', 'Figma', 'User Research'],
    },
    {
      id: 4,
      name: 'Rahul Kumar',
      title: 'Data Scientist',
      company: 'Paytm',
      education: 'B.Tech + M.Tech - IIT Bombay',
      experience: '7 years',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      specialties: ['Machine Learning', 'Python', 'Analytics'],
    },
    {
      id: 5,
      name: 'Dr. Ananya Singh',
      title: 'Senior Doctor',
      company: 'AIIMS Delhi',
      education: 'MBBS + MD - AIIMS',
      experience: '10 years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      specialties: ['Medicine', 'Career Counseling', 'NEET Guidance'],
    },
    {
      id: 6,
      name: 'Vikram Joshi',
      title: 'Civil Engineer',
      company: 'L&T Construction',
      education: 'B.Tech Civil - IIT Kanpur',
      experience: '9 years',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      specialties: ['Infrastructure', 'Project Management', 'JEE Guidance'],
    },
    {
      id: 7,
      name: 'Dr. Sneha Agarwal',
      title: 'Research Scientist',
      company: 'ISRO',
      education: 'B.Tech + PhD - IISc Bangalore',
      experience: '8 years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      specialties: ['Space Technology', 'Research', 'Academic Guidance'],
    },
    {
      id: 8,
      name: 'Rajesh Gupta',
      title: 'Banking Professional',
      company: 'SBI',
      education: 'B.Tech + MBA Finance - XLRI',
      experience: '12 years',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
      specialties: ['Banking', 'Finance', 'Career Planning'],
    },
  ];

  const renderMentorCard = (mentor: any) => (
    <TouchableOpacity key={mentor.id} style={styles.mentorCard}>
      <View style={styles.cardContent}>
        <View style={styles.mentorHeader}>
          <Image source={{ uri: mentor.image }} style={styles.mentorImage} />
          <View style={styles.mentorInfo}>
            <Text style={styles.mentorName}>{mentor.name}</Text>
            <Text style={styles.mentorTitle}>{mentor.title}</Text>
            <Text style={styles.mentorCompany}>{mentor.company}</Text>
            <Text style={styles.mentorEducation}>{mentor.education}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{mentor.rating}</Text>
          </View>
        </View>
        
        <View style={styles.specialtiesContainer}>
          {mentor.specialties.map((specialty: string, index: number) => (
            <View key={index} style={styles.specialtyTag}>
              <Text style={styles.specialtyText}>{specialty}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.experienceContainer}>
          <Ionicons name="time-outline" size={16} color="#667eea" />
          <Text style={styles.experienceText}>{mentor.experience} experience</Text>
        </View>
        
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Connect</Text>
          <Ionicons name="arrow-forward" size={16} color="#667eea" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoContainer}>
        <Image
                source={require('@/assets/images/logo.png')}
                style={styles.headerLogo}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.headerTitle}>Mentors</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter-outline" size={24} color="#667eea" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search-outline" size={20} color="#999" />
            <Text style={styles.searchPlaceholder}>Search mentors by skills...</Text>
          </View>
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Mentors</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mentors.slice(0, 3).map(renderMentorCard)}
          </ScrollView>
        </View>

        {/* All Mentors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Mentors</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          {mentors.map(renderMentorCard)}
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoriesGrid}>
            {[
              { name: 'Engineering', icon: '🔧', count: '28' },
              { name: 'Medicine', icon: '⚕️', count: '22' },
              { name: 'Technology', icon: '💻', count: '35' },
              { name: 'Research', icon: '🔬', count: '18' },
              { name: 'Business', icon: '💼', count: '25' },
              { name: 'Design', icon: '🎨', count: '15' },
            ].map((category, index) => (
              <TouchableOpacity key={index} style={styles.categoryCard}>
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} mentors</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchPlaceholder: {
    marginLeft: 12,
    color: '#999',
    fontSize: 16,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
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
    color: '#667eea',
    fontSize: 16,
    fontWeight: '500',
  },
  mentorCard: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 20,
  },
  mentorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  mentorImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  mentorTitle: {
    fontSize: 14,
    color: '#667eea',
    marginBottom: 2,
    fontWeight: '500',
  },
  mentorCompany: {
    fontSize: 14,
    color: '#666',
  },
  mentorEducation: {
    fontSize: 12,
    color: '#667eea',
    fontWeight: '500',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  specialtyTag: {
    backgroundColor: '#f0f4ff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e8ff',
  },
  specialtyText: {
    color: '#667eea',
    fontSize: 12,
    fontWeight: '500',
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  experienceText: {
    color: '#666',
    fontSize: 14,
    marginLeft: 8,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
});