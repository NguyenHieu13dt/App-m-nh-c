import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native'; // Import useNavigation and useNavigationState

export default function ManHinhChinh() {
  const navigation = useNavigation();
  const routeName = useNavigationState(state => state.routes[state.index].name); // Get current route name

  const continueListeningData = [
    { title: 'Coffee & Jazz', imageUrl: 'https://cdn.glitch.global/baa27e89-4441-477e-b283-cb72b3cb13e4/No%20time%20to%20die%20Pic%202.png?v=1730189909119' },
    { title: 'Top New Songs', imageUrl: 'https://cdn.glitch.global/baa27e89-4441-477e-b283-cb72b3cb13e4/image%208.png?v=1730190052636' },
    { title: 'Anime OSTs', imageUrl: 'https://cdn.glitch.global/baa27e89-4441-477e-b283-cb72b3cb13e4/No%20time%20to%20die%20Pic%206.png?v=1730190082876' },
    { title: 'Lo-Fi Beats', imageUrl: 'https://cdn.glitch.global/baa27e89-4441-477e-b283-cb72b3cb13e4/No%20time%20to%20die%20Pic%207.png?v=1730189861990' },
  ];

  const topMixData = [
    { title: 'Pop Mix', imageUrl: 'https://cdn.glitch.global/baa27e89-4441-477e-b283-cb72b3cb13e4/pop.png?v=1730190144430' },
    { title: 'Chill Mix', imageUrl: 'https://cdn.glitch.global/baa27e89-4441-477e-b283-cb72b3cb13e4/Rectangle%2017.png?v=1730190525597' },
    { title: 'Lo-Fi Mix', imageUrl: 'https://cdn.glitch.global/baa27e89-4441-477e-b283-cb72b3cb13e4/7bdb1796-4fd3-4d4c-8165-fddd5646d179.image.png?v=1730190559115' },
    { title: 'Dance Mix', imageUrl: 'https://cdn.glitch.global/baa27e89-4441-477e-b283-cb72b3cb13e4/8ffb0508-4f92-4f72-960b-c76af67d631b.image.png?v=1730190591360' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://cdn.glitch.global/d67c77ea-6f26-44b5-a5a4-07cca9f2db7d/musium%20logo.png?v=1728023297973' }}
            style={styles.profileImage}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.greetingText}>Chào mừng trở lại!</Text>
            <Text style={styles.username}>chandrama</Text>
          </View>
          <View style={styles.icons}>
            <TouchableOpacity>
              <Text style={styles.icon}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.icon}>⚙️</Text>
            </TouchableOpacity>
            
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tiếp tục nghe</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.continueListening}>
        {continueListeningData.map((item, index) => (
  <TouchableOpacity
    key={index}
    style={styles.continueItem}
    onPress={() => {
      if (item.title === 'Coffee & Jazz') {
        navigation.navigate('CoffeeMusic'); // Navigate to Coffeemusic.js
      } else if (item.title === 'Top New Songs') {
        navigation.navigate('NewSong'); // Navigate to Newsong.js
      } else if (item.title === 'Anime OSTs') {
        navigation.navigate('Anime'); // Navigate to Anime.js
      } else if (item.title === 'Lo-Fi Beats') {
        navigation.navigate('Lofi'); // Navigate to Lofi.js
      }
    }}
  >
    <Image source={{ uri: item.imageUrl }} style={styles.continueImage} />
    <Text style={styles.continueText}>{item.title}</Text>
  </TouchableOpacity>
))}

        </ScrollView>

        <Text style={styles.sectionTitle}>Top Mix của bạn</Text>
        <View style={styles.gridContainer}>
          {topMixData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.mixItem}
              onPress={() => {
                if (item.title === 'Pop Mix') {
                  navigation.navigate('Pop'); // Navigate to pop.js
                } else if (item.title === 'Chill Mix') {
                  navigation.navigate('Chill'); // Navigate to chill.js
                } else if (item.title === 'Lo-Fi Mix') {
                  navigation.navigate('Lofi'); // Navigate to lofi.js
                } else if (item.title === 'Dance Mix') {
                  navigation.navigate('Dance'); // Navigate to dance.js
                }
              }}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.mixImage} />
              <Text style={styles.mixText}>{item.title}</Text>
            </TouchableOpacity>
            
            
          ))}
        </View>

        <Text style={styles.sectionTitle}>Dựa trên những gì bạn đã nghe gần đây</Text>
        <View style={styles.recentListening}>
        <TouchableOpacity
          style={styles.recentItem}
          onPress={() => navigation.navigate('Pop')} // Điều hướng tới Pop.js
        >
          <Image
            source={{
              uri: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/indie%20(1).png?v=1730276628452',
            }}
            style={styles.recentImage}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.recentItem}
          onPress={() => navigation.navigate('Dance')} // Điều hướng tới Dance.js
        >
          <Image
            source={{
              uri: 'https://cdn.glitch.global/baa27e89-4441-477e-b283-cb72b3cb13e4/8ffb0508-4f92-4f72-960b-c76af67d631b.image.png?v=1730190591360',
            }}
            style={styles.recentImage}
          />
        </TouchableOpacity> 
        </View>
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity style={[styles.navButton, routeName === 'Homepage' && styles.activeNavButton]} onPress={() => navigation.navigate('Homepage')}>
          <Text style={styles.navText}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, routeName === 'ExplorePage' && styles.activeNavButton]} onPress={() => navigation.navigate('ExplorePage')}>
          <Text style={styles.navText}>🔍</Text>
          <Text style={styles.navLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, routeName === 'LibraryPage' && styles.activeNavButton]} onPress={() => navigation.navigate('LibraryPage')}>
          <Text style={styles.navText}>📚</Text>
          <Text style={styles.navLabel}>Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  greetingText: {
    color: 'white',
    fontSize: 18,
  },
  username: {
    color: 'gray',
    fontSize: 14,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    color: 'white',
    fontSize: 24,
    marginLeft: 15,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  continueListening: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  continueItem: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  continueImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  continueText: {
    color: 'white',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  mixItem: {
    backgroundColor: '#333',
    width: '48%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  mixText: {
    color: 'white',
  },
  mixImage: {
    width: '100%',
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
  },
  recentListening: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  recentItem: {
    width: '48%',
  },
  recentImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#1d1d1d',
  },
  navButton: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  activeNavButton: {
    backgroundColor: '#6200ee', // Highlight color for active button
    borderRadius: 10,
  },
  
  navText: {
    fontSize: 20,
    color: 'white',
  },
  navLabel: {
    color: 'white',
    
    
  },
});
