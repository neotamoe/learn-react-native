import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        // getImageSource returns a promise
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30),
        Icon.getImageSource("ios-menu", 30)
    ]).then(sources => {
Navigation.setRoot({
        root: {
          sideMenu: {
            left: {
              component: {
                id: 'sideDrawer',
                name: 'awesome-places.SideDrawer',
              }
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
                              testID: 'FIRST_TAB_BAR_BUTTON'
                            },
                            topBar: {
                                title: {
                                  text: 'Find Place'
                                },
                                leftButtons: [
                                  {
                                    id: 'sideDrawerButton',
                                    icon: sources[2],
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
                                      testID: 'SECOND_TAB_BAR_BUTTON'
                                    },
                                    topBar: {
                                        title: {
                                          text: 'Share Place'
                                        },
                                        leftButtons: [
                                          {
                                            id: 'sideDrawerButton',
                                            icon: sources[2]
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

