import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const PlaylistDetail = ({ route }) => {
  const { songs } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.songItem}>
            <Image source={{ uri: item.image }} style={styles.songImage} />
            <Text style={styles.songTitle}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default PlaylistDetail;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  songItem: { flexDirection: 'row', alignItems: 'center', padding: 10 },
  songImage: { width: 50, height: 50, marginRight: 10 },
  songTitle: { color: 'white', fontSize: 16 },
});
