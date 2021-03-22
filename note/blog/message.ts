import { RefObject } from "react";
import WebView from "react-native-webview";

export interface Message {
  type: string;
  payload: string | null;
}

export interface SendMessage extends Message {
  webViewRef: RefObject<WebView<{}>>;
}

export const sendMessage = ({ webViewRef, type, payload }: SendMessage) => {
  if (webViewRef.current) {
    webViewRef?.current?.postMessage(JSON.stringify({ type, payload }));
  }
};
