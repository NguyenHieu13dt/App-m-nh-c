// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importing screen components
import Onboarding from './Onboarding'; // Onboarding screen component
import SignIn from './SignIn';         // SignIn screen component
import Intro from './Intro';           // Intro screen component
import Login from './Login';           // Login screen component
import Homepage from './Homepage';     // Homepage component
import ExplorePage from './ExplorePage'; // Explore Page component
import LibraryPage from './LibraryPage'; // Library Page component
import FoldersPage from './FoldersPage'; // FoldersPage Page component
import PlaylistsPage from './PlaylistsPage'; // FoldersPage Page component
import ArtistsPage from './ArtistsPage'; // FoldersPage Page component
import AlbumsPage from './AlbumsPage'; // FoldersPage Page component
import PodcastsPage from './PodcastsPage'; // FoldersPage Page component
import SongPage from './SongPage'; // FoldersPage Page component
import AddPlaylist from './AddPlaylist'; // FoldersPage Page component
import CoffeeMusic from './CoffeeMusic'; // FoldersPage Page component
import NewSong from './NewSong'; // FoldersPage Page component
import Anime from './Anime'; // FoldersPage Page component
import Lofi from './Lofi'; // FoldersPage Page component
import Pop from './Pop'; // FoldersPage Page component
import Chill from './Chill'; // FoldersPage Page component
import Dance from './Dance'; // FoldersPage Page component
import AddPage from './AddPage';
import Yourlove from './yourlove';
import songyourlove from './songyourlove';
import PlaylistDetail from './PlaylistDetail';

// Create a stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Stack Navigator for different screens */}
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="ExplorePage" component={ExplorePage} />
        <Stack.Screen name="LibraryPage" component={LibraryPage} />
        <Stack.Screen name="FoldersPage" component={FoldersPage} />
        <Stack.Screen name="PlaylistsPage" component={PlaylistsPage} />
        <Stack.Screen name="ArtistsPage" component={ArtistsPage} />
        <Stack.Screen name="AlbumsPage" component={AlbumsPage} />
        <Stack.Screen name="PodcastsPage" component={PodcastsPage} />
        <Stack.Screen name="SongPage" component={SongPage} />
        <Stack.Screen name="AddPage" component={AddPage} />
        <Stack.Screen name="AddPlaylist" component={AddPlaylist} />
        <Stack.Screen name="CoffeeMusic" component={CoffeeMusic} />
        <Stack.Screen name="NewSong" component={NewSong} />
        <Stack.Screen name="Anime" component={Anime} />
        <Stack.Screen name="Lofi" component={Lofi} />
        <Stack.Screen name="Pop" component={Pop} />
        <Stack.Screen name="Chill" component={Chill} />
        <Stack.Screen name="Dance" component={Dance} />
        <Stack.Screen name="yourlove" component={Yourlove} />
        <Stack.Screen name="songyourlove" component={songyourlove} />
        <Stack.Screen name="PlaylistDetail" component={PlaylistDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
