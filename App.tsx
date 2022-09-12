import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";
import { ThemeProvider } from "styled-components";
import theme from "./src/theme";
import { SignIn } from "@screens/SignIn";
import { AuthProvider } from "@hooks/auth";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          DMSans_400Regular,
          DMSerifDisplay_400Regular,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          onLayout={onLayoutRootView}
          style={{
            flex: 1,
          }}
        >
          <StatusBar style="light" translucent backgroundColor="transparent" />
          <AuthProvider>
            <SignIn />
          </AuthProvider>
        </View>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
