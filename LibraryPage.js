import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';

const LibraryPage = ({ navigation, route }) => {
  const { name: routeName } = route;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image 
          source={{ uri: 'https://cdn.glitch.global/d67c77ea-6f26-44b5-a5a4-07cca9f2db7d/musium%20logo.png?v=1728023297973' }}
          style={styles.logoIcon} 
        />
        <Text style={styles.header}>Your Library</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {/* Additional Sections in a Row */}
        <View style={styles.rowContainer}>
          <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('FoldersPage')}>
            <Text style={styles.subSection}>Folders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('PlaylistsPage')}>
            <Text style={styles.subSection}>Playlists</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('ArtistsPage')}>
            <Text style={styles.subSection}>Artists</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('AlbumsPage')}>
            <Text style={styles.subSection}>Albums</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleButton} onPress={() => navigation.navigate('PodcastsPage')}>
            <Text style={styles.subSection}>Podcasts and Shows</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddPlaylist')}>
  <View style={styles.iconCircle}>
    <Text style={styles.icon}>+</Text>
  </View>
  <Text style={styles.buttonText}> Add New Playlist</Text>
</TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('yourlove')}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>❤️</Text>
        </View>
        <Text style={styles.buttonText}> Your Liked Songs</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Recently Played</Text>

      {recentlyPlayed.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemText}>
            {item.title}
            {item.details && <Text style={styles.smallText}>{item.details}</Text>}
          </Text>
        </View>
      ))}

      <View style={styles.navigation}>
        <NavigationButton 
          routeName="Homepage" 
          currentRoute={routeName} 
          icon="🏠" 
          label="Home" 
          navigation={navigation} 
        />
        <NavigationButton 
          routeName="ExplorePage" 
          currentRoute={routeName} 
          icon="🔍" 
          label="Explore" 
          navigation={navigation} 
        />
        <NavigationButton 
          routeName="LibraryPage" 
          currentRoute={routeName} 
          icon="📚" 
          label="Library" 
          navigation={navigation} 
        />
      </View>
    </SafeAreaView>
  );
};

const NavigationButton = ({ routeName, currentRoute, icon, label, navigation }) => (
  <TouchableOpacity
    style={[styles.navButton, currentRoute === routeName && styles.activeNavButton]}
    onPress={() => navigation.navigate(routeName)}
  >
    <Text style={styles.navText}>{icon}</Text>
    <Text style={styles.navLabel}>{label}</Text>
  </TouchableOpacity>
);

const recentlyPlayed = [
  { title: 'Conan Gray' },
  { title: '3:00am vibes', details: ' (18 songs)' },
  { title: 'Wiped Out! - The Neighbourhood' },
  { title: 'Extra Dynamic', details: 'Updated Aug 10 • ur mom ashley' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    color: '#00bcd4',
    marginLeft: 10,
  },
  scrollContainer: {
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circleButton: {
    backgroundColor: '#1e1e1e',
    borderRadius: 50, // Makes the button round
    padding: 15,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
    minHeight: 80,
  },
  subSection: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1e1e1e',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00bcd4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    color: '#87ceeb',
    fontSize: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginVertical: 20,
    marginBottom: 10,
    color: 'white',
  },
  item: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemText: {
    color: 'white',
  },
  smallText: {
    fontSize: 12,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#1e1e1e',
  },
  navButton: {
    alignItems: 'center',
    flex: 1,
  },
  navText: {
    fontSize: 24,
    color: 'white',
  },
  navLabel: {
    color: 'white',
    fontSize: 14,
  },
  activeNavButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#00bcd4',
  },
  logoIcon: {
    width: 63,
    height: 48,
    marginHorizontal: 8,
  },
});

export default LibraryPage;
