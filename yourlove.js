import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const YourLoveScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFavorites = async () => {
      const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    };
    fetchFavorites();
  }, []);

  const handlePlaySong = (item, index) => {
    navigation.navigate('SongPage', { item, index, playlist: favorites });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Nút quay lại */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainImage}>
        <Image source={{ uri: 'https://cdn.glitch.global/f219d7a7-af26-4bad-a3ab-f3fd405294c0/listyeuthich.png?v=1733329957441' }} style={styles.mainImageContent} />
        <Text style={styles.mainTitle}>Your Liked Songs</Text>
        <Text style={styles.subtitle}></Text>
      </View>
        <ScrollView style={styles.container}>
          <Text style={styles.title}>Danh sách yêu thích</Text>
          {favorites.length === 0 ? (
            <Text style={styles.emptyText}>Chưa có bài hát yêu thích!</Text>
          ) : (
            favorites.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.songContainer}
                onPress={() => handlePlaySong(item, index)}
              >
                <Image source={{ uri: item.image }} style={styles.albumArt} />
                <View style={styles.songInfo}>
                  <Text style={styles.songTitle}>{item.title}</Text>
                  <Text style={styles.artist}>{item.artist}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
        <View style={styles.bottomNavContainer}>
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Homepage')}>
            <Text style={styles.navText}>🏠</Text>
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ExplorePage')}>
            <Text style={styles.navText}>🔍</Text>
            <Text style={styles.navLabel}>Explore</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('LibraryPage')}>
            <Text style={styles.navText}>📚</Text>
            <Text style={styles.navLabel}>Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
  icon: {
    fontSize: 20,
    color: 'white',
  },
  menuIcon: {
    fontSize: 22,
    color: '#fff',
    marginLeft: 10,
  },
  mainImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  mainImageContent: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  mainTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'lightblue',
    fontSize: 14,
  },
  playlist: {
    padding: 20,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  playlistImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  playlistInfo: {
    marginLeft: 10,
    flex: 1,
  },
  playlistTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playlistArtist: {
    color: '#aaa',
    fontSize: 14,
  },
  playButton: {
    fontSize: 22,
    color: 'lightblue',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#000',
    paddingVertical: 15,
  },
  navButton: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 24,
    color: '#fff',
  },
  navLabel: {
    fontSize: 12,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  },
  songContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  albumArt: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: '#888',
  },
});

export default YourLoveScreen;
