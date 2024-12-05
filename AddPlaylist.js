//import React from 'react';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, SafeAreaView, ScrollView, StatusBar, Platform, Alert  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPlaylist = ({ navigation }) => {
  const playlists = [
    { id: '1', name: 'current favorites', songs: '20 songs', image: 'https://cdn.glitch.global/ad78163c-717f-4a43-9ec1-7a40cd710b22/Rectangle%2030.png?v=1730703591858' },
    { id: '2', name: '3:00am vibes', songs: '18 songs', image: 'https://cdn.glitch.global/ad78163c-717f-4a43-9ec1-7a40cd710b22/image%2015.png?v=1730703686567' },
    { id: '3', name: 'Lofi Loft', songs: '63 songs', image: 'https://cdn.glitch.global/ad78163c-717f-4a43-9ec1-7a40cd710b22/Rectangle%2030%20(1).png?v=1730703701307' },
    { id: '4', name: 'rain on my window', songs: '32 songs', image: 'https://cdn.glitch.global/ad78163c-717f-4a43-9ec1-7a40cd710b22/image%2014.png?v=1730703733282' },
    { id: '5', name: 'Anime OSTs', songs: '20 songs', image: 'https://cdn.glitch.global/ad78163c-717f-4a43-9ec1-7a40cd710b22/Rectangle%2030%20(2).png?v=1730703757245' },
    { id: '6', name: 'MyPlaylist', songs: 'songs', image: 'https://cdn.glitch.global/f219d7a7-af26-4bad-a3ab-f3fd405294c0/myplaylist.jpg?v=1733339554749' },
  ];
  const handlePlaylistPress = (playlist) => {
    Alert.alert('Thông tin Playlist', `Playlist: ${playlist.name} có ${playlist.songs}`);
    // Nếu bạn muốn chuyển đến màn hình khác để hiển thị danh sách bài hát trong playlist, bạn có thể sử dụng navigation.navigate
    // navigation.navigate('PlaylistDetail', { playlistId: playlist.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Set the StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add to Playlist</Text>
      </View>

      {/* New Playlist Button */}
      <TouchableOpacity style={styles.newPlaylistButton}>
        <Text style={styles.newPlaylistButtonText}>New Playlist</Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#808080" />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Find Playlist" 
          placeholderTextColor="#808080" 
        />
      </View>

      {/* Playlists */}
      <ScrollView>
        {playlists.map((playlist) => (
          <TouchableOpacity key={playlist.id} style={styles.playlistItem} onPress={() => handlePlaylistPress(playlist)}>
            <Image source={{ uri: playlist.image }} style={styles.playlistImage} />
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistName}>{playlist.name}</Text>
              <Text style={styles.playlistSongs}>{playlist.songs}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjust padding for Android
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  newPlaylistButton: {
    backgroundColor: '#00bcd4',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  newPlaylistButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    marginLeft: 10,
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginBottom: 15,
  },
  playlistImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  playlistInfo: {
    justifyContent: 'center',
  },
  playlistName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playlistSongs: {
    color: '#808080',
    fontSize: 14,
  },
});

export default AddPlaylist;
