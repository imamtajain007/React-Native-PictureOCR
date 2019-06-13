/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import firebase from 'react-native-firebase';
import React from 'react';
import { Text, View, Button, PermissionsAndroid, Platform } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

export default class RNTextDetectorHomeScreen extends React.Component {
  state = {
    imageText: [],
    result: ""
  }


  async requestReadPermissionGallery() {
    try {
      const os = Platform.OS; // android or ios
      if (os === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // 已獲取了讀寫權限
          this.props.navigation.navigate('gallery');
          this.getPhotos();
        } else {
          alert("Permissions Fail");
          // 獲取讀寫權限失敗
        }
      }
    } catch (err) {
      console.log(err.toString());
    }
  }

  render() {
    //const advert = firebase.admob().interstitial('ca-app-pub-6806282339237533/1168663826');
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    //ca-app-pub-3940256099942544/6300978111 test

    const unitId =
      Platform.OS === 'ios'
        ? 'ca-app-pub-6806282339237533/1168663826'
        : 'ca-app-pub-6806282339237533/1168663826';



    const imageText = this.props.navigation.getParam('text', '');
    console.log("image text = ", imageText);

    this.state.result = "";
    for (let i = 0; i < imageText.length; i++) {
      this.state.result += imageText[i] + '\n';
    }

    console.log("RNTextDetector render ");
<<<<<<< HEAD


=======
>>>>>>> 0a5569ba8436977f73e8415d5c92578a461943c0

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, width: 250 }}
          value={this.state.result}
          multiline={true} />

        <Button
          title="open camera"
          onPress={() => this.props.navigation.navigate('Camera')}
        />
        <Banner
          unitId={unitId}
          size={'SMART_BANNER'}
          request={request.build()}
          onAdLoaded={() => {
            console.log('Advert loaded');
          }}
        />
        <Button
          title="open gallery"
          onPress={this.requestReadPermissionGallery.bind(this)}
        />
        <AdMobBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-6806282339237533/8293842353"
          testDevices={[AdMobBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
        />
        <PublisherBanner
          adSize="fullBanner"
          adUnitID="ca-app-pub-6806282339237533/8293842353"
          testDevices={[PublisherBanner.simulatorId]}
          onAdFailedToLoad={error => console.error(error)}
          onAppEvent={event => console.log(event.name, event.info)}
        />
      </View>
    );
  }
}

RNTextDetectorHomeScreen.navigationOptions = {
  title: 'React Native Text Detector',
};
