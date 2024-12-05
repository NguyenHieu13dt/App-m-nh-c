import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Onboarding = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('SignIn');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://cdn.glitch.global/d67c77ea-6f26-44b5-a5a4-07cca9f2db7d/musium%20logo.png?v=1728023297973' }}
        style={styles.image}
      />
      <Image
        source={{ uri: 'https://cdn.glitch.global/d67c77ea-6f26-44b5-a5a4-07cca9f2db7d/musium.png?v=1728023784926' }}
        style={styles.imageBelow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Black background color
  },
  image: {
    width: 391,
    height: 337,
    resizeMode: 'contain', // Main logo image
  },
  imageBelow: {
    width: 169,
    height: 47,
    marginTop: 20, // Spacing between the images
    resizeMode: 'contain', // Image below the logo
  },
});

export default Onboarding;
