import { Navigation } from 'react-native-navigation';

const startTabs = () => {
    Navigation.setRoot({
        root: {
          bottomTabs: {
            children: [{
              stack: {
                children: [{
                  component: {
                    name: 'awesome-places.FindPlaceScreen',
                    passProps: {
                      text: 'Find Place'
                    }
                  }
                }],
                options: {
                  bottomTab: {
                    text: 'Find Place',
                    testID: 'FIRST_TAB_BAR_BUTTON'
                  }
                }
              }
            },
            {
              component: {
                name: 'awesome-places.SharePlaceScreen',
                passProps: {
                  text: 'Share Place'
                },
                options: {
                  bottomTab: {
                    text: 'Share Place',
                    testID: 'SECOND_TAB_BAR_BUTTON'
                  }
                }
              }
            }]
          }
        }
      });
}

export default startTabs;

