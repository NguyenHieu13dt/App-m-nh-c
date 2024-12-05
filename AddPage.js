//import React from 'react';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert  } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Dùng FontAwesome cho các biểu tượng
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params; 
  const [playlist, setPlaylist] = useState([]);
  const addToPlaylist = async () => {
    try {
      // Lấy danh sách bài hát hiện tại từ AsyncStorage
      const existingPlaylist = await AsyncStorage.getItem('playlist');
      const updatedPlaylist = existingPlaylist ? JSON.parse(existingPlaylist) : [];
      console.log('Existing Playlist:', existingPlaylist);
      console.log('Updated Playlist:', updatedPlaylist);
      
      // Kiểm tra nếu bài hát đã tồn tại trong playlist
      const isSongInPlaylist = updatedPlaylist.some(song => song.id === item.id);
      if (isSongInPlaylist) {
        Alert.alert('Thông báo', 'Bài hát đã có trong playlist!');
        return;
      }

      // Thêm bài hát mới vào playlist
      updatedPlaylist.push(item);

      // Lưu playlist vào AsyncStorage
      await AsyncStorage.setItem('playlist', JSON.stringify(updatedPlaylist));

      // Cập nhật state playlist
      setPlaylist(updatedPlaylist);

      Alert.alert('Thành công', 'Bài hát đã được thêm vào playlist!');
    } catch (error) {
        console.error('Error adding to playlist:', error);
        Alert.alert('Lỗi', 'Không thể thêm bài hát vào playlist');
    }
  };

  return (
    <View style={styles.container}>
      {/* Nút quay lại */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.icon}>←</Text>
      </TouchableOpacity>

      {/* Thông tin bài hát */}
      <Image source={{ uri: item.image }} style={styles.albumArt} />
      <Text style={styles.songTitle}>{item.title}</Text>
      <Text style={styles.artist}>{item.artist}</Text>

      {/* Danh sách các tùy chọn */}
      <ScrollView style={styles.options}>
        <TouchableOpacity style={styles.optionRow} onPress={addToPlaylist}>
          <FontAwesome name="music" style={styles.optionIcon} />
          <Text style={styles.optionText}>Add to playlist</Text>
        </TouchableOpacity>
        <View style={styles.optionRow}>
          <FontAwesome name="list" style={styles.optionIcon} />
          <Text style={styles.optionText}>Add to queue</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="minus-circle" style={styles.optionIcon} />
          <Text style={styles.optionText}>Remove from playlist</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="tag" style={styles.optionIcon} />
          <Text style={styles.optionText}>Modify tags</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="user" style={styles.optionIcon} />
          <Text style={styles.optionText}>View Artist</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="folder" style={styles.optionIcon} />
          <Text style={styles.optionText}>View Album</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="info-circle" style={styles.optionIcon} />
          <Text style={styles.optionText}>Show Credits</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="download" style={styles.optionIcon} />
          <Text style={styles.optionText}>Download</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="share-alt" style={styles.optionIcon} />
          <Text style={styles.optionText}>Share</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="qrcode" style={styles.optionIcon} />
          <Text style={styles.optionText}>Generate QR Code</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="clock" style={styles.optionIcon} />
          <Text style={styles.optionText}>Sleep Timer</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="eye-slash" style={styles.optionIcon} />
          <Text style={styles.optionText}>Hide song</Text>
        </View>
        <View style={styles.optionRow}>
          <FontAwesome name="random" style={styles.optionIcon} />
          <Text style={styles.optionText}>Go to Song Radio</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 40,
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
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 20,
  },
  songTitle: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  artist: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  options: {
    marginTop: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#333', // Đường kẻ nhẹ
  },
  optionIcon: {
    fontSize: 20,
    color: 'white',
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    color: 'white',
  },
});

export default AddPage;
