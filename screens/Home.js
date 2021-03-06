// importation des dependances
import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Article from './Article';
import Detail from './Detail';


const Stack = createNativeStackNavigator();

// declaration et exportation du composant
export default function Home({navigation}){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Article" component={Article} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  )
}

// declaration du style du composant

const styles = StyleSheet.create({

})