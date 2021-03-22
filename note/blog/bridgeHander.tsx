import { RefObject } from 'react';
import { Platform } from 'react-native';
import WebView from 'react-native-webview';
import {
  WebViewMessageEvent,
  WebViewNavigationEvent,
  WebViewProgressEvent,
} from 'react-native-webview/lib/WebViewTypes';
import { isJsonString } from './isJsonString';
import { MessageTypeEnum, sendMessage } from './message';
import { isBanana, setBanana, getBanana, removeBanana } from './banana';

const isIos = Platform.OS === 'ios';
const isAndroid = Platform.OS === 'android';

const sendBanana = async (webViewRef: RefObject<WebView<{}>>) => {
  const banana = await getBanana();

  const sendMessageData = {
    webViewRef,
    type: "bananaFromApp",
    payload: isBanana(banana) ? JSON.stringify(banana) : null,
  };

  sendMessage(sendMessageData);
};

export const handleLoadStart = () => console.log('webview start');

export const handleLoadProgressCurried = (
  webViewRef: RefObject<WebView<{}>>
) => (e: WebViewProgressEvent) => {
  console.log('webview progress');
  const progress = e.nativeEvent.progress;
  if (progress === 1) {
    isIos && sendBanana(webViewRef);
  }
};

export const handleLoadCurried = (webViewRef: RefObject<WebView<{}>>) => (
  e: WebViewNavigationEvent
) => {
  console.log('webview load');
  isAndroid && sendBanana(webViewRef);
};

export const handleReceiveMessage = (e: WebViewMessageEvent) => {
  const data = e.nativeEvent.data;
  console.log('message from web: ', data);

  if (isJsonString(data)) {
    const parsedData = JSON.parse(data);

    if (parsedData?.type === "bananaFromWeb") {
      const recievedBanana = parsedData?.payload;
      const banana = isJsonString(recievedBanana) ? JSON.parse(recievedBanana) : null;
      if (isBanana(banana)) setBanana(banana);
    }

    if (parsedData?.type === "removeBanana") {
      removeBanana();
    }
  } else {
    // for string message
  }
};