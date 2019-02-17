import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import configureStore from './src/store/configureStore';

const store = configureStore();

// Register screens 
Navigation.registerComponent(
  "awesome-places.AuthScreen", 
  () => AuthScreen, 
  store, 
  Provider);
Navigation.registerComponent(
  "awesome-places.FindPlaceScreen", 
  () => FindPlaceScreen, 
  store, 
  Provider);
Navigation.registerComponent(
  "awesome-places.SharePlaceScreen", 
  () => SharePlaceScreen, 
  store, 
  Provider);

// Start an App
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'awesome-places.AuthScreen',
          },    
        }],
        options: {
          topBar: {
            title: {
              // TODO: fix: this isn't showing on ios
              text: "Welcome Login Screen",
            },
            visible: true,
            background: {
              color: 'green'
            }
          }
        }
      }
    }
  });
});