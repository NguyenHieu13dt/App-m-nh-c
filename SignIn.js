import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

const SignIn = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://cdn.glitch.global/287490f7-5e5a-44ea-bb01-d0d662a46a91/img_girl.png?v=1730085156770' }}
        style={styles.backgroundImage}
        resizeMode="cover" // Ensure the image covers the full area
      >
        <View style={styles.content}>
          <Text style={styles.text}>
            From the <Text style={styles.highlight}>latest</Text> to the <Text style={styles.highlight}>greatest</Text> hits, play your favorite tracks on <Text style={styles.highlight}>musium</Text> now!
          </Text>

          <View style={styles.pagination}>
            
        
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Intro')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Optional background color for the entire screen
  },
  backgroundImage: {
    width: '100%', // Full width
    height: '100%', // Full height
    justifyContent: 'flex-end', // Align content to the bottom of the image
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for text
    borderRadius: 15,
    marginBottom: 10, // Reduced space between content and bottom of the background image
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  highlight: {
    color: '#00d9ff', // Highlighted text color
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#00d9ff', // Active dot color
  },
  button: {
    backgroundColor: '#00d9ff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignIn;
