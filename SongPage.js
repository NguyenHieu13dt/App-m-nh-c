import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SongPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, index, playlist } = route.params;

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false); // Chế độ phát ngẫu nhiên
  const [currentPosition, setCurrentPosition] = useState(0); // Track the current playback position
  const [duration, setDuration] = useState(0); // Track the total duration of the song
  const [isFavorite, setIsFavorite] = useState(false); // Trạng thái yêu thích

  const toggleFavorite = async () => {
    try {
      const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      if (!isFavorite) {
        const updatedFavorites = [...favorites, item];
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert('Đã thêm vào danh sách yêu thích!');
      } else {
        const updatedFavorites = favorites.filter(fav => fav.audioUrl !== item.audioUrl);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert('Đã xóa khỏi danh sách yêu thích!');
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };



  // Hàm phát bài hát
  const playSound = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
        return;
      }

      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: item.audioUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      setDuration(status.durationMillis);

      // Cập nhật khi bài hát kết thúc
      newSound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded) {
          if (status.didJustFinish) {
            setIsPlaying(false); // Dừng bài hiện tại
            handleNext()
          }
          setCurrentPosition(status.positionMillis); // Update current position
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  


  const handlePrevious = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }

    const prevIndex = index - 1 < 0 ? playlist.length - 1 : index - 1;
    const prevItem = playlist[prevIndex];
    navigation.replace('SongPage', { item: prevItem, index: prevIndex, playlist });
  };

  const handleNext = async () => {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }

    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * playlist.length); // Chọn bài ngẫu nhiên
    } else {
      nextIndex = index + 1 >= playlist.length ? 0 : index + 1; // Chọn bài kế tiếp theo thứ tự
    }

    const nextItem = playlist[nextIndex];
    //navigation.push('SongPage', { item: nextItem, index: nextIndex, playlist });
    navigation.replace('SongPage', { item: nextItem, index: nextIndex, playlist });
  };

  // Giải phóng tài nguyên khi thoát khỏi màn hình
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      const isFav = favorites.some(fav => fav.audioUrl === item.audioUrl);
      setIsFavorite(isFav);
    };
    checkFavoriteStatus();
  }, [item]);


  // Function to format time in mm:ss format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome name="arrow-left" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.playlistContainer}>
        <Text style={styles.playingText}>ĐANG PHÁT TỪ PLAYLIST</Text>
        <Text style={styles.playlistName}>Lo-fi self ❤️</Text>
      </View>

      <Image
        source={{ uri: item.image }}
        style={[styles.albumArt, isPlaying && styles.albumArtPlaying]} // Thêm hiệu ứng khi đang phát
      />

      <Text style={styles.songTitle}>{item.title}</Text>
      <Text style={styles.artist}>{item.artist}</Text>
      {/* Nút Chia sẻ và Tym */}
      <View style={styles.topActions}>
        <TouchableOpacity onPress={() => alert('Chia sẻ bài hát!')} style={styles.topActionButton}>
          <FontAwesome name="share-alt" size={18} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={toggleFavorite} style={styles.topActionButton}>
          <FontAwesome name="heart" size={18} color={isFavorite ? "#ff4081" : "white"} />
        </TouchableOpacity>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTime}>{formatTime(currentPosition)}</Text>
        <Slider
          style={styles.slider}
          value={currentPosition}
          minimumValue={0}
          maximumValue={duration}
          minimumTrackTintColor="#00d4ff"
          maximumTrackTintColor="#888"
          thumbTintColor="#00d4ff"
          onSlidingComplete={async (value) => {
            if (sound) {
              await sound.setPositionAsync(value); // Cập nhật vị trí phát nhạc
              setCurrentPosition(value); // Đồng bộ vị trí
            }
          }}
          onValueChange={(value) => setCurrentPosition(value)} // Cập nhật thời gian trong khi kéo
        />
        <Text style={styles.progressTime}>{formatTime(duration)}</Text>
      </View>

      <View style={styles.controls}>
        {/* Nút ngẫu nhiên */}
        <TouchableOpacity
          style={[styles.circleButton, isShuffle && styles.activeMode]}
          onPress={() => setIsShuffle(!isShuffle)}
        >
          <FontAwesome name="random" style={styles.icon} />
        </TouchableOpacity>

        {/* Nút Trước */}
        <TouchableOpacity style={styles.circleButton} onPress={handlePrevious}>
          <FontAwesome name="step-backward" style={styles.icon} />
        </TouchableOpacity>

        {/* Nút Play/Pause */}
        <LinearGradient colors={['#00d4ff', '#00ffab']} style={styles.circleButtonLarge}>
          <TouchableOpacity onPress={playSound}>
            <FontAwesome name={isPlaying ? 'pause' : 'play'} style={[styles.icon, { fontSize: 32 }]} />
          </TouchableOpacity>
        </LinearGradient>

        {/* Nút Tiếp */}
        <TouchableOpacity style={styles.circleButton} onPress={handleNext}>
          <FontAwesome name="step-forward" style={styles.icon} />
        </TouchableOpacity>

        {/* Nút phát theo thứ tự */}
        <TouchableOpacity
          style={[styles.circleButton, !isShuffle && styles.activeMode]}
          onPress={() => setIsShuffle(false)}
        >
          <FontAwesome name="bars" style={styles.icon} />
        </TouchableOpacity>
        // nút + thêm các chức năng
        <TouchableOpacity
          style={styles.circleButton}
          onPress={() => navigation.navigate('AddPage', { item, playlist })} // Truyền item và playlist
        >
          <Text style={styles.icon}>+</Text>
        </TouchableOpacity>

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
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 50,
    padding: 10,
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  playlistContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  playingText: {
    color: '#888',
    fontSize: 12,
  },
  playlistName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  albumArt: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
    transition: 'all 0.3s ease',
  },
  albumArtPlaying: {
    opacity: 1,
    transform: [{ scale: 1 }],
  },
  songTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Căn phải các nút
    marginBottom: 10, // Khoảng cách với Progress Bar
  },
  topActionButton: {
    marginLeft: 15, // Khoảng cách giữa hai nút
    padding: 5, // Khoảng padding xung quanh icon
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Nền mờ nhẹ
    borderRadius: 20, // Bo tròn nền
  },

  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#888',
    borderRadius: 5,
    marginHorizontal: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#00d4ff',
  },
  progressTime: {
    color: 'white',
    fontSize: 12,
  },

  circleButton: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginLeft: 31,
    //backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  activeMode: {
    //backgroundColor: '#00ffab',
  },
  circleButtonLarge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 31,
  },
  icon: {
    fontSize: 18,
    color: '#fff',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 5,
    backgroundColor: '#888', // Giữ màu nền của progress bar để tạo nền cho tiến trình
    borderRadius: 5,
    marginHorizontal: 10,
  },
  progress: {
    height: '100%',
    backgroundColor: '#00d4ff', // Chỉnh màu sắc của progress bar thành màu giống như Play/Pause
  },
  progressTime: {
    color: 'white',
    fontSize: 12,
  },
});

export default SongPage;
