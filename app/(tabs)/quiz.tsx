import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showTestSelection, setShowTestSelection] = useState(true);
  const [selectedTest, setSelectedTest] = useState<string>('');
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{id: string, text: string, isUser: boolean}>>([]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFullScreenChat, setShowFullScreenChat] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What type of work environment do you prefer?",
      options: [
        "Collaborative team setting",
        "Independent work",
        "Mixed environment",
        "Remote work"
      ]
    },
    {
      id: 2,
      question: "Which activities energize you most?",
      options: [
        "Problem-solving and analysis",
        "Creative design and innovation",
        "Helping and teaching others",
        "Leading and managing projects"
      ]
    },
    {
      id: 3,
      question: "What motivates you in your career?",
      options: [
        "Financial stability and growth",
        "Making a positive impact",
        "Learning new skills",
        "Recognition and advancement"
      ]
    },
    {
      id: 4,
      question: "How do you prefer to learn new things?",
      options: [
        "Hands-on practice",
        "Reading and research",
        "Video tutorials",
        "Working with mentors"
      ]
    },
    {
      id: 5,
      question: "What type of challenges do you enjoy?",
      options: [
        "Technical problems",
        "Creative challenges",
        "Interpersonal issues",
        "Strategic planning"
      ]
    }
  ];

  const handleAnswerSelect = async (answerIndex: number) => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setShowTestSelection(true);
    setSelectedTest('');
    setShowAIChat(false);
    setShowFullScreenChat(false);
    setChatMessages([]);
  };

  const handleTestSelection = async (testType: string) => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setSelectedTest(testType);
    setShowTestSelection(false);
  };

  const handleAIChat = async () => {
    if (Platform.OS === 'ios') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    setShowAIChat(true);
    setShowFullScreenChat(true);
    
    // Add welcome message
    const welcomeMessage = {
      id: '1',
      text: `Hello! I'm your AI Career Advisor. Based on your quiz results showing "${getCareerRecommendation()}", I'm here to help you explore career opportunities, provide guidance on skill development, and answer any questions about your career path. How can I assist you today?`,
      isUser: false
    };
    setChatMessages([welcomeMessage]);
  };

  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: chatInput,
      isUser: true
    };

    setChatMessages(prev => [...prev, userMessage]);
    const currentInput = chatInput;
    setChatInput('');
    setIsLoading(true);

    try {
      console.log('Sending request to Groq API...');
      
      const requestBody = {
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are an expert career advisor. The user's quiz result shows they are suited for: ${getCareerRecommendation()}. Provide helpful career guidance.`
          },
          {
            role: 'user',
            content: currentInput
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      };

      console.log('Request body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', JSON.stringify(data, null, 2));
      
      // Accept both chat and completion style payloads
      let aiContent = data?.choices?.[0]?.message?.content
        || data?.choices?.[0]?.text
        || data?.choices?.[0]?.delta?.content;

      if (aiContent) {
        const aiMessage = {
          id: (Date.now() + 1).toString(),
          text: aiContent,
          isUser: false
        };
        setChatMessages(prev => [...prev, aiMessage]);
      } else {
        console.log('Unexpected response structure:', data);
        throw new Error('Invalid response format from AI');
      }
    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: `Sorry, I'm having trouble connecting to the AI service. Error: ${error.message}. Please try again.`,
        isUser: false
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getCareerRecommendation = () => {
    const answers = selectedAnswers;
    let techScore = 0;
    let creativeScore = 0;
    let helpingScore = 0;
    let leadershipScore = 0;

    // Simple scoring system based on answer patterns
    answers.forEach((answer, index) => {
      switch (index) {
        case 0: // Work environment
          if (answer === 0) leadershipScore += 2;
          if (answer === 1) techScore += 2;
          if (answer === 2) helpingScore += 1;
          break;
        case 1: // Activities
          if (answer === 0) techScore += 2;
          if (answer === 1) creativeScore += 2;
          if (answer === 2) helpingScore += 2;
          if (answer === 3) leadershipScore += 2;
          break;
        case 2: // Motivation
          if (answer === 0) leadershipScore += 1;
          if (answer === 1) helpingScore += 2;
          if (answer === 2) techScore += 1;
          break;
        case 3: // Learning
          if (answer === 0) techScore += 2;
          if (answer === 1) creativeScore += 1;
          if (answer === 2) creativeScore += 1;
          if (answer === 3) helpingScore += 2;
          break;
        case 4: // Challenges
          if (answer === 0) techScore += 2;
          if (answer === 1) creativeScore += 2;
          if (answer === 2) helpingScore += 2;
          if (answer === 3) leadershipScore += 2;
          break;
      }
    });

    const scores = { techScore, creativeScore, helpingScore, leadershipScore };
    const maxScore = Math.max(...Object.values(scores));
    
    if (maxScore === techScore) return "Technology & Engineering";
    if (maxScore === creativeScore) return "Creative & Design";
    if (maxScore === helpingScore) return "Healthcare & Education";
    return "Business & Leadership";
  };

  if (showTestSelection) {
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
              <Text style={styles.headerTitle}>Take Test</Text>
            </View>
          </View>

          {/* Test Selection */}
          <View style={styles.testSelectionContainer}>
            <Text style={styles.testSelectionTitle}>Choose Your Test</Text>
            <Text style={styles.testSelectionSubtitle}>
              Select the type of assessment that best fits your needs
            </Text>

            <View style={styles.testButtonsContainer}>
              <TouchableOpacity 
                style={styles.testButton}
                onPress={() => handleTestSelection('career')}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.testButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="briefcase" size={32} color="#fff" />
                  <Text style={styles.testButtonTitle}>Career Aptitude Test</Text>
                  <Text style={styles.testButtonDescription}>
                    Discover your ideal career path based on your skills and interests
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.testButton}
                onPress={() => handleTestSelection('psychometric')}
              >
                <LinearGradient
                  colors={['#f093fb', '#f5576c']}
                  style={styles.testButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="brain" size={32} color="#fff" />
                  <Text style={styles.testButtonTitle}>Psychometric Test</Text>
                  <Text style={styles.testButtonDescription}>
                    Understand your personality traits and behavioral patterns
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (showFullScreenChat) {
    return (
      <SafeAreaView style={styles.fullScreenContainer}>
        <View style={styles.fullScreenChatContainer}>
          <View style={styles.fullScreenChatHeader}>
            <View style={styles.fullScreenHeaderLeft}>
              <View style={styles.logoContainer}>
                <Image
                  source={require('@/assets/images/logo.png')}
                  style={styles.headerLogo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.fullScreenChatTitle}>AI Career Advisor</Text>
            </View>
            <TouchableOpacity 
              style={styles.closeFullScreenButton}
              onPress={() => {
                setShowFullScreenChat(false);
                setShowAIChat(false);
              }}
            >
              <Ionicons name="close" size={24} color="#667eea" />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.fullScreenChatMessages} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.fullScreenChatMessagesContent}
            ref={(ref) => {
              if (ref && chatMessages.length > 0) {
                setTimeout(() => ref.scrollToEnd({ animated: true }), 100);
              }
            }}
          >
            {chatMessages.map((message) => (
              <View 
                key={message.id} 
                style={[
                  styles.messageContainer,
                  message.isUser ? styles.userMessage : styles.aiMessage
                ]}
              >
                <View style={[
                  styles.messageBubble,
                  message.isUser ? styles.userBubble : styles.aiBubble
                ]}>
                  <Text style={[
                    styles.messageText,
                    message.isUser ? styles.userText : styles.aiText
                  ]}>
                    {message.text}
                  </Text>
                </View>
              </View>
            ))}
            {isLoading && (
              <View style={[styles.messageContainer, styles.aiMessage]}>
                <View style={[styles.messageBubble, styles.aiBubble]}>
                  <Text style={[styles.messageText, styles.aiText]}>
                    Thinking...
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
          
          <View style={styles.fullScreenChatInputContainer}>
            <TextInput
              style={styles.fullScreenChatInput}
              placeholder="Ask about your career..."
              placeholderTextColor="#999"
              value={chatInput}
              onChangeText={setChatInput}
              multiline
              maxLength={500}
            />
            <TouchableOpacity 
              style={[styles.fullScreenSendButton, !chatInput.trim() && styles.sendButtonDisabled]}
              onPress={sendMessage}
              disabled={!chatInput.trim() || isLoading}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={chatInput.trim() ? "#fff" : "#ccc"} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (showResult) {
    const recommendation = getCareerRecommendation();
    
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
              <Text style={styles.headerTitle}>Quiz Results</Text>
            </View>
          </View>

          {/* Result Card */}
          <View style={styles.resultContainer}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.resultGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.resultHeader}>
                <Ionicons name="trophy" size={40} color="#FFD700" />
                <Text style={styles.resultTitle}>Your Career Match</Text>
              </View>
              
              <Text style={styles.recommendationText}>{recommendation}</Text>
              
              <Text style={styles.resultDescription}>
                Based on your answers, this career path aligns best with your interests, 
                work style, and motivations. Explore related opportunities and mentors 
                in this field to start your journey.
              </Text>

              <TouchableOpacity style={styles.exploreButton} onPress={() => {}}>
                <Text style={styles.exploreButtonText}>Explore Career Path</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
              <Ionicons name="refresh" size={20} color="#667eea" />
              <Text style={styles.restartButtonText}>Retake Quiz</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareButton} onPress={handleAIChat}>
              <Ionicons name="chatbubble-ellipses" size={20} color="#667eea" />
              <Text style={styles.shareButtonText}>AI Career Advisor</Text>
            </TouchableOpacity>
          </View>


        </ScrollView>
      </SafeAreaView>
    );
  }

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
            <Text style={styles.headerTitle}>
              {selectedTest === 'career' ? 'Career Aptitude Test' : 'Psychometric Test'}
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {currentQuestion + 1} of {questions.length}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentQuestion + 1) / questions.length) * 100}%` }
              ]} 
            />
          </View>
        </View>

        {/* Question Card */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>
            Question {currentQuestion + 1}
          </Text>
          <Text style={styles.questionText}>
            {questions[currentQuestion].question}
          </Text>
        </View>

        {/* Answer Options */}
        <View style={styles.optionsContainer}>
          {questions[currentQuestion].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionButton}
              onPress={() => handleAnswerSelect(index)}
            >
              <Text style={styles.optionText}>{option}</Text>
              <Ionicons name="chevron-forward" size={20} color="#667eea" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Skip Button */}
        <View style={styles.skipContainer}>
          <TouchableOpacity style={styles.skipButton} onPress={() => {
            if (currentQuestion < questions.length - 1) {
              setCurrentQuestion(currentQuestion + 1);
            } else {
              setShowResult(true);
            }
          }}>
            <Text style={styles.skipButtonText}>Skip Question</Text>
          </TouchableOpacity>
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
  progressContainer: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  progressBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 3,
  },
  questionContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 28,
  },
  optionsContainer: {
    paddingHorizontal: 20,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  skipContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  resultContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  resultGradient: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  recommendationText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  resultDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  exploreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginRight: 8,
  },
  actionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  restartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#667eea',
    flex: 0.48,
    justifyContent: 'center',
  },
  restartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    marginLeft: 8,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#667eea',
    flex: 0.48,
    justifyContent: 'center',
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#667eea',
    marginLeft: 8,
  },
  testSelectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  testSelectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  testSelectionSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  testButtonsContainer: {
    gap: 20,
  },
  testButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  testButtonGradient: {
    padding: 24,
    alignItems: 'center',
  },
  testButtonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  testButtonDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 20,
  },
  chatContainer: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: 400,
    flexDirection: 'column',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chatHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeChatButton: {
    padding: 4,
  },
  chatMessages: {
    flex: 1,
    maxHeight: 250,
  },
  chatMessagesContent: {
    padding: 16,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 12,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#667eea',
  },
  aiBubble: {
    backgroundColor: '#f0f0f0',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  aiText: {
    color: '#333',
  },
  chatInputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
    maxHeight: 100,
    marginRight: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#e0e0e0',
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  fullScreenChatContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fullScreenChatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  fullScreenHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullScreenChatTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  closeFullScreenButton: {
    padding: 8,
  },
  fullScreenChatMessages: {
    flex: 1,
  },
  fullScreenChatMessagesContent: {
    padding: 20,
    flexGrow: 1,
  },
  fullScreenChatInputContainer: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  fullScreenChatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
    marginRight: 12,
  },
  fullScreenSendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#667eea',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
