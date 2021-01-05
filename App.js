import  React , {useState, useEffect} from 'react';
import {StyleSheet,} from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import * as firebase from 'firebase';
import SplashScreen from "./Screens/SplashScreen";

const firebaseConfig = {
  apiKey: "AIzaSyAVK_nmNs4rD9zGEAPvuDNEHA7psKNrspI",
  authDomain: "vendor-9019f.firebaseapp.com",
  projectId: "vendor-9019f",
  storageBucket: "vendor-9019f.appspot.com",
  messagingSenderId: "489854838046",
  appId: "1:489854838046:web:2acb31426991076a78550f",
  measurementId: "G-QVLX38R9RD"
};



if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }

const App = (props) => {
    const [loading, setLoading] = useState('false')
    useEffect(() => {
     
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('d')
          setLoading('HomeScreen');
        } else {
          console.log('sn')
          setLoading('LoginScreen');
        }
      });
      return () => {
      
      }
    }, [])
   
  return (
   <> 
 
    {loading == 'false' ?   <SplashScreen/> :
     <AppNavigator user={loading} /> 
      }
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: '#fff'
    },
  
   
});

export default App;