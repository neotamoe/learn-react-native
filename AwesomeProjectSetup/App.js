import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import PlaceDetailScreen from './src/screens/PlaceDetail/PlaceDetail';
import SideDrawer from './src/screens/SideDrawer/SideDrawer';
import configureStore from './src/store/configureStore';

const store = configureStore();

// Register screens 
Navigation.registerComponentWithRedux(
  "awesome-places.AuthScreen", 
  () => AuthScreen, 
  Provider,
  store);
Navigation.registerComponentWithRedux(
  "awesome-places.FindPlaceScreen", 
  () => FindPlaceScreen, 
  Provider,
  store);
Navigation.registerComponentWithRedux(
  "awesome-places.SharePlaceScreen", 
  () => SharePlaceScreen, 
  Provider,
  store);
Navigation.registerComponentWithRedux(
  "awesome-places.PlaceDetailScreen", 
  () => PlaceDetailScreen,
  Provider,
  store);
Navigation.registerComponentWithRedux(
  "awesome-places.SideDrawer", 
  () => SideDrawer,
  Provider,
  store);

// Start an App
Navigation.events().registerAppLaunchedListener(() => {
  // TODO:  Fix this, can't use landscape on android despite trying this
  // Navigation.setDefaultOptions({
  //   layout: {
  //     orientation: ['landscape', 'portrait', 'sensorLandscape'] // An array of supported orientations
  //   },
  // });

  Navigation.setRoot({
    root: {
      stack: {
        children: [{
          component: {
            name: 'awesome-places.AuthScreen',
            options: {
              topBar: {
                visible: true,
                title: {
                  text: "Welcome Login Screen",
                },
              },
            }
          },    
        }],
      },
    }
  });
});