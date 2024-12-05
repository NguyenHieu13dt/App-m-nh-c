import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const genres = [
  { label: 'Kpop', image: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/Mask%20group%20(1).png?v=1730276378174' },
  { label: 'Indie', image: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/Indie.png?v=1730276143345' },
  { label: 'R&B', image: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/rnb.png?v=1730276429376' },
  { label: 'Pop', image: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/pop%20(1).png?v=1730276429928' },
];

const categories = [
  { label: 'Made for you', image: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/u.png?v=1730276489426' },
  { label: 'Released', image: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/new.png?v=1730276524270' },
  { label: 'Music Charts', image: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/charts.png?v=1730276534089' },
  { label: 'Podcasts', image: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/pods.png?v=1730276554587' },
  { label: 'Bollywood', image: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/bol.png?v=1730276617684' },
  { label: 'Pop Fusion', image: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/indie%20(1).png?v=1730276628452' },
];

const Search = ({ navigation, routeName }) => {
  const [searchText, setSearchText] = useState('');

  const filteredGenres = genres.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()));
  const filteredCategories = categories.filter(item => item.label.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.iconContainer}>
          <Image
            source={{ uri: 'https://cdn.glitch.global/d67c77ea-6f26-44b5-a5a4-07cca9f2db7d/musium%20logo.png?v=1728023297973' }}
            style={styles.logoIcon}
          />
          <Image
            source={{ uri: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/Search.png?v=1730275180549' }}
            style={styles.searchIcon}
          />
        </View>

        <View style={styles.searchContainer}>
          <Image
            source={{ uri: 'https://cdn.glitch.global/380ae28e-72ad-4e56-b5a3-2e3647e2684c/browse.png?v=1730275917754' }}
            style={styles.overlayIcon}
          />
          <TextInput
            placeholder="Songs, Artists, Podcasts & More"
            placeholderTextColor="#888"
            style={styles.input}
            onChangeText={setSearchText}
            value={searchText}
          />
        </View>

        {filteredGenres.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Your Top Genres</Text>
            <View style={styles.boxes}>
              {filteredGenres.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.box}
                  onPress={() => navigation.navigate('Dance')}
                >
                  <Image source={{ uri: item.image }} style={styles.boxImage} />
                  <Text style={styles.boxLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {filteredCategories.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Browse All</Text>
            <View style={styles.boxes}>
              {filteredCategories.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.box}
                  onPress={() => navigation.navigate('Dance')}
                >
                  <Image source={{ uri: item.image }} style={styles.boxImage} />
                  <Text style={styles.boxLabel}>{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, routeName === 'Homepage' && styles.activeNavButton]}
          onPress={() => navigation.navigate('Homepage')}
        >
          <Text style={styles.navText}>🏠</Text>
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, routeName === 'ExplorePage' && styles.activeNavButton]}
          onPress={() => navigation.navigate('ExplorePage')}
        >
          <Text style={styles.navText}>🔍</Text>
          <Text style={styles.navLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, routeName === 'LibraryPage' && styles.activeNavButton]}
          onPress={() => navigation.navigate('LibraryPage')}
        >
          <Text style={styles.navText}>📚</Text>
          <Text style={styles.navLabel}>Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logoIcon: {
    width: 63,
    height: 48,
    marginHorizontal: 5,
  },
  searchIcon: {
    height: 20,
    flex: 1,
    marginHorizontal: 5,
    marginLeft: -200,
    resizeMode: 'contain',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    flex: 1,
    padding: 10,
    paddingLeft: 35,
    color: 'white',
  },
  overlayIcon: {
    position: 'absolute',
    left: 10,
    top: 12,
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  boxes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  box: {
    backgroundColor: '#1e1e1e',
    borderRadius: 5,
    flexBasis: '45%',
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  boxLabel: {
    color: 'white',
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#222',
  },
  navButton: {
    alignItems: 'center',
  },
  activeNavButton: {
    backgroundColor: '#333',
    borderRadius: 5,
  },
  navText: {
    color: 'white',
    fontSize: 20,
  },
  navLabel: {
    color: 'white',
  },
});

export default Search;
