/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HomeScreen from './src/HomeScreen';
import { ApolloProvider } from "@apollo/client";
import client from "./src/configs/apolloClient"; // Import Apollo client

function App(): React.JSX.Element {
  

  return (
    <SafeAreaView style={styles.flex1}>
      <ApolloProvider client={client}>
      <HomeScreen />
    </ApolloProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  centerAlign: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: "10%",
    padding: 10
  },
  headerText: {
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 18,
    letterSpacing: 1
  }
});

export default App;
