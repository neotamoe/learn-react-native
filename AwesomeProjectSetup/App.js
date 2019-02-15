import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';

// Register screens 
Navigation.registerComponent("awesome-places.AuthScreen", () => AuthScreen);

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
  });r
});r