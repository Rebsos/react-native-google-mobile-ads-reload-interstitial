/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import type {Node} from 'react';
import {SafeAreaView, ScrollView, Text, View, Button} from 'react-native';
import mobileAds, {
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

mobileAds()
  .setRequestConfiguration({
    testDeviceIdentifiers: ['EMULATOR'],
  })
  .then(() => {});

mobileAds()
  .initialize()
  .then(async adapterStatuses => {});

const App: () => Node = () => {
  console.log('App');

  const [interstitial, setInterstitial] = useState(
    InterstitialAd.createForAdRequest(adUnitId),
  );

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventsListener(({type, payload}) => {
      console.log('addAdEventsListener', type, payload);
    });
    return unsubscribe;
  }, [interstitial]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>View logs and ad inspector</Text>
          <Button
            title="createForAdRequest()"
            onPress={() => {
              setInterstitial(InterstitialAd.createForAdRequest(adUnitId));
            }}
          />
          <Button title="load()" onPress={() => interstitial.load()} />
          <Button
            title="show()"
            onPress={() => {
              interstitial.show();
            }}
          />
          <Button
            title="Ad Inspector"
            onPress={() => mobileAds().openAdInspector()}
          />
        </View>
        <Text>
          1. You can't run load() twice to refresh before ad expiration
        </Text>
        <Text>2. Any createForAdRequest() + load() adds 1mb memory usage</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
