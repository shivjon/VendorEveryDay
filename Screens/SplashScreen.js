import React, {Component} from 'react';  
import {Platform, StyleSheet, Text, View, Image} from 'react-native';  
  

export default class App extends Component {  
  render() {  
    return (  
      <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>  
           <Image
          source={require('../assets/icon.png')}
            style={{
              height: '30%',  width: '30%', 
             //marginLeft:-20,
              
            }}
          />
        <Text style={styles.welcome}>Welcome to{`\n`} Task Manager</Text>  
      </View>  
    );  
  }  
}  
const styles = StyleSheet.create({  
  welcome: {  
    fontSize: 20,  
    textAlign: 'center',  
    margin: 10, 
    position:'absolute',
    bottom:20 ,
    letterSpacing:2,
    fontWeight:'bold'
  }  
});  