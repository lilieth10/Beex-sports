/**
 * Beex Sports App
 * Mobile Application for sports matching
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { AppProviders } from './app/utils/providers';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <AppProviders />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
