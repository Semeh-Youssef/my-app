import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Register from './screens/Register';
import 'react-native-gesture-handler';
import firebase from 'firebase';
import Home from './screens/Home';
import NewArticle from './screens/NewArticle';
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons'; 

// pour gerer une navigation avec react native on doit utiliser la bibliotheque react native navigation

const Drawer = createDrawerNavigator();

export default function App(){
  // variable d'etat pou condition l'affichage
  const [vue, setVue] = useState(null);
  const [listeArticle, setListeArticle] = useState([]);
  // const listeArticle =  [];

  // le useEfect va s'executer une le redue effectuer
  useEffect(() => {
    getListeArticle()
  }, [])


  // fonction pour recuperer l'ensemble des article dans firebase 
  const getListeArticle = () => {
    const db = firebase.firestore();
    db.collection("articles").get()
    .then((querySnapshot) => {
      var liste = Array();
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        const item = {
          id: doc.id,
          data: doc.data(),
        };
        liste.push(item);
      })
      setListeArticle(liste); // mise a jour de la variable d'etat listeArticle
      // console.log(liste);
    })
    .catch((err) => {
      console.log(err);
    })
  
  }

  /* 
  pour pouvoir executer la fonction setVue depuis le composant Login on doit la passer en paramettre comme propiete ce qui permettra pouvoir modifier la variable d'etat vue à partir de Login et donc de rendre une vue differente en fonction de la valeur que contient cette variable
  */
  const updateScreen = (vue) => {
    return(<Login miseAjourVue={setVue}/>)
  }

  const returnHomScreen = () => {
    return(<Home articles={listeArticle}/>)
  }

  if(vue === null){
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home"
            options={{
              drawerIcon: (({focused}) => (
                <AntDesign name="home" size={24} color={focused? "#2a9d8f": "black"} />
              )) 
            }}
          >
            {returnHomScreen}
          </Drawer.Screen>
          <Drawer.Screen name="Se connecter"
            options={{
              drawerIcon: (({focused}) => (
                <AntDesign 
                  name="login" 
                  size={24} 
                  color={focused ? "#2a9d8f": "black"} />
              ))
            }}
          >
            {updateScreen}
          </Drawer.Screen>
          <Drawer.Screen name="S'inscrire" component={Register} 
            options={{
              drawerIcon: (({focused}) => (
                <Entypo 
                  name="add-user" 
                  size={24} 
                  color={focused?"#2a9d8f" : "black"} />
              ))
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }else{
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen articles={listeArticle} name="Home" component={Home} 
            options={{
              drawerIcon: (({focused}) => (
                <AntDesign 
                  name="home" 
                  size={30} 
                  color={focused? "#2a9d8f": "black"} />
              )) 
            }}
          />
          <Drawer.Screen updateListe={getListeArticle} name="Creer un article" component={NewArticle} 
            options={{ 
              drawerIcon: (({focused}) => (
                <Ionicons 
                  name="add-circle-outline" 
                  size={24} 
                  color={ focused ? "#2a9d8f" : "black"}/>
              ))
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    )
  }

}

// configuration de firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtutgHJMHCugEy7EUNYtXS1iMy8Z_Ir00",
  authDomain: "my-app-c544a.firebaseapp.com",
  projectId: "my-app-c544a",
  storageBucket: "my-app-c544a.appspot.com",
  messagingSenderId: "839606348391",
  appId: "1:839606348391:web:687a22fbfcc3ed4f2502c2"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

