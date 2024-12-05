import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';

const PlaylistScreen = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);

  const playlistItems = [
        { image: 'https://cdn.glitch.global/c8ef71bb-c1b6-4e70-8fd4-41122a526b04/0672e7c7-168c-4c4e-a843-a3eb22e41f77.image.png?v=1731486134268', title: 'Chạy ngay đi', artist: 'SƠN TÙNG M-TP', audioUrl: 'https://cdn.glitch.global/a0df2431-1daf-44c9-ae39-904703601e4f/ChayNgayDi-SonTungMTP-5468704.mp3?v=1731542881228' },
        { image: 'https://cdn.glitch.global/c8ef71bb-c1b6-4e70-8fd4-41122a526b04/034ccb05-c6ba-4fcc-98a7-a3bbbc39ac5f.image.png?v=1731486175444', title: 'Chúng ta không thuộc về nhau', artist: 'SƠN TÙNG M-TP', audioUrl: 'https://cdn.glitch.global/a0df2431-1daf-44c9-ae39-904703601e4f/ChungTaKhongThuocVeNhau-SonTungMTP-4528181.mp3?v=1731542883028' },
        { image: 'https://cdn.glitch.global/c8ef71bb-c1b6-4e70-8fd4-41122a526b04/8592c917-8d89-459e-b1f0-22f251a614a6.image.png?v=1731486225896', title: 'Hãy trao cho anh', artist: 'SƠN TÙNG M-TP', audioUrl: 'https://cdn.glitch.global/a0df2431-1daf-44c9-ae39-904703601e4f/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3?v=1731542885817' },
        { image: 'https://cdn.glitch.global/c8ef71bb-c1b6-4e70-8fd4-41122a526b04/d25e5a0b-2e1c-484a-bcb8-2a2d1a450401.image.png?v=1731486265168', title: 'Chúng ta của hiện tại', artist: 'SƠN TÙNG M-TP', audioUrl: 'https://cdn.glitch.global/a0df2431-1daf-44c9-ae39-904703601e4f/ChungTaCuaHienTai-SonTungMTP-6892340.mp3?v=1731542886583' },
        { image: 'https://cdn.glitch.global/c8ef71bb-c1b6-4e70-8fd4-41122a526b04/0c26b6aa-99b4-47e0-8894-2776a98b8b83.image.png?v=1731486300108', title: 'em của ngày hôm qua', artist: 'SƠN TÙNG M-TP', audioUrl: 'https://cdn.glitch.global/a0df2431-1daf-44c9-ae39-904703601e4f/EmCuaNgayHomQua-SonTungMTP-2882720.mp3?v=1731542890002' },
        { image: 'https://cdn.glitch.global/c8ef71bb-c1b6-4e70-8fd4-41122a526b04/0733fd9d-8f6d-4d9b-addd-85fa22afbe66.image.png?v=1731492839749', title: 'Muộn rồi mà sao còn', artist: 'SƠN TÙNG M-TP', audioUrl: 'https://cdn.glitch.global/a0df2431-1daf-44c9-ae39-904703601e4f/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?v=1731542891808' }
  ];

  const playSound = async (url, index) => {
    try {
      if (currentTrackIndex === index && !isPlaying) {
        // Nếu đang dừng bài hiện tại, phát lại từ vị trí hiện tại
        await sound.playAsync();
        setIsPlaying(true);
        return;
      }

      // Nếu đang phát bài khác, dừng bài hiện tại
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }

      // Tải và phát bài mới
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      setCurrentTrackIndex(index);

      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.didJustFinish) {
          const nextIndex = index + 1 < playlistItems.length ? index + 1 : 0;
          playSound(playlistItems[nextIndex].audioUrl, nextIndex);
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const pauseSound = async () => {
    try {
      if (sound && isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error pausing sound:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainImage}>
        <Image source={{ uri: 'https://cdn.glitch.global/baa27e89-4441-477e-b283-cb72b3cb13e4/8ffb0508-4f92-4f72-960b-c76af67d631b.image.png?v=1730190591360' }} style={styles.mainImageContent} />
        <Text style={styles.mainTitle}>DANCE MIX</Text>
        <Text style={styles.subtitle}>soft, chill, dreamy, lo-fi beats</Text>
      </View>
      <ScrollView style={styles.playlist}>
        {playlistItems.map((item, index) => (
          <View key={index} style={styles.playlistItem}>
            <TouchableOpacity onPress={() => navigation.navigate('SongPage', { item, index, playlist: playlistItems })}>
              <Image source={{ uri: item.image }} style={styles.playlistImage} />
            </TouchableOpacity>

            <View style={styles.playlistInfo}>
              <Text style={styles.playlistTitle}>{item.title}</Text>
              <Text style={styles.playlistArtist}>{item.artist}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (currentTrackIndex === index && isPlaying) {
                  pauseSound();
                } else {
                  playSound(item.audioUrl, index);
                }
              }}
            >
              <Text style={styles.playButton}>
                {currentTrackIndex === index && isPlaying ? '⏸️' : '▶️'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
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
    backgroundColor: '#000',
    paddingBottom: 80,
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
});

export default PlaylistScreen;