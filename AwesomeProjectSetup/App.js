import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';

// Register screens 
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen);
Navigation.registerComponent("awesome-places.FindPlaceScreen", () => FindPlaceScreen);
Navigation.registerComponent("awesome-places.SharePlaceScreen", () => SharePlaceScreen);

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