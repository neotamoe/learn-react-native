import { Navigation } from 'react-native-navigation';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        // getImageSource returns a promise
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-share-alt" : "ios-share-alt", 30),
        Icon.getImageSource(Platform.OS === "android" ? "md-menu" : "ios-menu", 30)
    ]).then(sources => {
Navigation.setRoot({
        root: {
          sideMenu: {
            left: {
              component: {
                id: 'sideDrawer',
                name: 'awesome-places.SideDrawer',
              },
            },
            center: {
              bottomTabs: {
                children: [{
                  stack: {
                    id: "rootStack",
                    children: [{
                      component: {
                        id: 'find',
                        name: 'awesome-places.FindPlaceScreen',
                        passProps: {
                          text: 'Find Place'
                        },
                        options: {
                            bottomTab: {
                              text: 'Find Place',
                              icon: sources[0],
                              testID: 'FIRST_TAB_BAR_BUTTON',
                              selectedIconColor: 'orange'                            },
                            topBar: {
                                title: {
                                  text: 'Find Place'
                                },
                                leftButtons: [
                                  {
                                    id: 'sideDrawerButton',
                                    icon: sources[2],
                                    color: 'orange'
                                  }
                                ]
                            }
                        } // end options
                      }
                    }],
                    
                  } // end stack
                },
                {
                    stack: {
                        children: [{
                            component: {
                                id: 'share',
                                name: 'awesome-places.SharePlaceScreen',
                                passProps: {
                                  text: 'Share Place',
                                },
                                options: {
                                    bottomTab: {
                                      text: 'Share Place',
                                      icon: sources[1],
                                      testID: 'SECOND_TAB_BAR_BUTTON',
                                      selectedIconColor: 'orange',
                                    },
                                    topBar: {
                                        title: {
                                          text: 'Share Place'
                                        },
                                        leftButtons: [
                                          {
                                            id: 'sideDrawerButton',
                                            icon: sources[2],
                                            color: 'orange'
                                          }
                                        ]
                                    }
                    
                                } // end options
                              }
                        }]
                    }
                }] // end children
              } // end bottomTabs
            }
          }
        }
      });
    });
    
    
}

export default startTabs;

