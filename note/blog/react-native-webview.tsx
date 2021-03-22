import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import {
  handleLoadCurried,
  handleLoadProgressCurried,
  handleLoadStart,
  handleReceiveMessage,
} from './src/utils/bridgeHandler';

const App = () => {
  const webViewRef = useRef<WebView>(null);

  return (
    <WebView
      source={{ uri: 'http://localhost:3000' }}
      onLoadStart={handleLoadStart}
      onLoadProgress={handleLoadProgressCurried(webViewRef)}
      onLoad={handleLoadCurried(webViewRef)}
      onMessage={handleReceiveMessage}
      ref={webViewRef}
    />
  );
};

export default App;