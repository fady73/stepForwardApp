/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {createRef, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {WebView} from 'react-native-webview';
import {Error} from './components/Error';
import {BackHandler} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Spinner from 'react-native-loading-spinner-overlay';

const Loading = () => {
  return (
    <View style={styles.loadingWrapper}>
      <Spinner
        textContent={'Loading...'}
        visible={true}
        overlayColor="rgba(0, 0, 0, 0.75)	"
        textStyle={styles.spinnerTextStyle}
        customIndicator={<ActivityIndicator size="large" color="#00ff00" />}
      />
      {/*  */}
    </View>
  );
};

function App(): React.JSX.Element {
  const webViewRef = createRef<WebView>();

  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refresherEnabled, setEnableRefresher] = useState(true);

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const reload = useCallback(
    () => webViewRef && webViewRef.current?.reload(),
    [webViewRef],
  );

  //Code to get scroll position
  const handleScroll = (event: {nativeEvent: {contentOffset: {y: any}}}) => {
    console.log(Number(event.nativeEvent.contentOffset.y), event.nativeEvent);
    const yOffset = Number(event.nativeEvent.contentOffset.y);
    if (yOffset === 0) {
      console.log('top of the page');
      setEnableRefresher(true);
    } else {
      setEnableRefresher(false);
    }
  };

  useEffect(() => {
    const goBack = () => {
      if (canGoBack === false) {
        Alert.alert(
          'اغلاق التطبيق',
          'هل تريد الخروج ؟',
          [
            {text: 'لا', onPress: () => console.log('No'), style: 'cancel'},
            {text: 'نعم', onPress: () => BackHandler?.exitApp()},
          ],
          {cancelable: false},
        );
      }
      webViewRef.current?.goBack();
      return true;
    };

    BackHandler?.addEventListener('hardwareBackPress', () => goBack());

    return () =>
      BackHandler?.removeEventListener('hardwareBackPress', () => goBack());
  }, [canGoBack, webViewRef]);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setError(!state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return !error ? (
    <>
      <>
        <ScrollView
          contentContainerStyle={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              enabled={refresherEnabled}
              onRefresh={() => {
                refresherEnabled && reload();
              }}
            />
          }>
          <WebView
            source={{uri: 'https://step-forward-app.vercel.app/'}}
            ref={webViewRef}
            renderLoading={() => <Loading />}
            onError={() => setError(true)}
            onScroll={handleScroll}
            onNavigationStateChange={navState => {
              setCanGoBack(navState.canGoBack);
              setCanGoForward(navState.canGoForward);
              setCurrentUrl(navState.url);
            }}
            allowsBackForwardNavigationGestures
          />
        </ScrollView>
      </>
    </>
  ) : (
    <Error setError={(v: boolean) => setError(v)} />
  );
}

export default App;
const styles = StyleSheet.create({
  loading: {
    fontSize: 15,
    marginTop: 8,
    textAlign: 'center',
  },
  loadingWrapper: {
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  retry: {
    alignSelf: 'center',
  },
  webView: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
  },
  spinnerTextStyle: {
    color: 'white',
  },
});
