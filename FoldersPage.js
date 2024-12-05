import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Modal, TextInput, Button } from 'react-native';

const LibraryPage = ({ navigation, route }) => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([
    { id: '1', name: 'moods', details: '11 playlists' },
    { id: '2', name: 'blends', details: '8 playlists' },
    { id: '3', name: 'favs', details: '14 playlists' },
    { id: '4', name: 'random?', details: '10 playlists' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const handleAddPlaylist = () => {
    setModalVisible(true); // Show the modal to enter playlist name
  };

  const handleConfirmAddPlaylist = () => {
    if (newPlaylistName.trim() === "") {
      // Nếu tên playlist trống, không thực hiện gì
      alert('Please enter a playlist name!');
      return;
    }
    const newPlaylist = {
      id: String(recentlyPlayed.length + 1),
      name: newPlaylistName,
      details: '0 playlists',
    };
    setRecentlyPlayed((prev) => [...prev, newPlaylist]);
    setNewPlaylistName(''); // Clear input field
    setModalVisible(false); // Close the modal
  };

  const { name: routeName } = route;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Your Library</Text>
      </View>

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleAddPlaylist}>
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

      {/* Recently Played Section */}
      <Text style={styles.sectionTitle}>Recently Played</Text>
      <ScrollView>
        {recentlyPlayed.map((item) => (
          <View key={item.id} style={styles.item}>
            <Image 
              source={{ uri: 'https://cdn.glitch.global/63557b2f-b697-4570-814c-7da2a3d66605/Rectangle%2030%402x.png?v=1730435163778' }}
              style={styles.folderIcon} 
            />
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>{item.details}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.navigation}>
        <NavigationButton 
          icon="🏠" 
          label="Home" 
          active={routeName === 'Homepage'} 
          onPress={() => navigation.navigate('Homepage')}
        />
        <NavigationButton 
          icon="🔍" 
          label="Explore" 
          active={routeName === 'ExplorePage'} 
          onPress={() => navigation.navigate('ExplorePage')}
        />
        <NavigationButton 
          icon="📚" 
          label="Library" 
          active={routeName === 'LibraryPage'} 
          onPress={() => navigation.navigate('LibraryPage')}
        />
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Playlist Name</Text>
            <TextInput
              style={styles.modalInput}
              value={newPlaylistName}
              onChangeText={setNewPlaylistName}
              placeholder="Playlist Name"
              placeholderTextColor="#bbb"
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleConfirmAddPlaylist}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              
              
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const NavigationButton = ({ icon, label, active, onPress }) => (
  <TouchableOpacity style={[styles.navButton, active && styles.activeNavButton]} onPress={onPress}>
    <Text style={styles.navIcon}>{icon}</Text>
    <Text style={styles.navLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    color: '#00bcd4',
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 20,
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
    color: 'white',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  folderIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  itemName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDetails: {
    color: '#808080',
    fontSize: 14,
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
  navIcon: {
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền mờ để làm nổi bật modal
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    width: '80%', // Đặt chiều rộng của modal
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    color: '#00bcd4',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#333',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonsContainer: {
    flexDirection: 'row', // Đặt các nút theo chiều ngang
    justifyContent: 'space-between', // Giãn cách đều giữa các nút
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#00bcd4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '48%', // Đảm bảo nút có chiều rộng vừa phải để vừa hai nút trên cùng một hàng
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#ff3b30', // Màu đỏ cho nút hủy
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '48%', // Chiều rộng của nút hủy cũng giống như nút "Add Playlist"
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LibraryPage;
