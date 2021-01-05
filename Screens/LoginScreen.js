import  React , {useState} from 'react';
import {StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Image, StatusBar, ToastAndroid, ActivityIndicator, Modal } from 'react-native';
import { TextInput  } from 'react-native-paper';
// import { Icon } from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as firebase from 'firebase';

const LoginScreen = (props) => {
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    var Email = '';
    var Password = "";

  const  login = async () =>{
      
    
      const reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
       if (reg.test(email) === false){
        ToastAndroid.show("Invalid Email", ToastAndroid.SHORT);
          Email.focus()
         return
      }
     
      if(password.length<6){
        ToastAndroid.show("password minimum 6 characters", ToastAndroid.SHORT);
        Password.focus()
         return
      }

     setLoading(true) ;
    await firebase.auth().signInWithEmailAndPassword(email,password )
    .then((user) => {
      
        if (user.user.emailVerified) {
          setLoading(false)
          props.navigation.navigate('HomeScreen')
        //  console.log('ss');
      }
      else {
        var users = firebase.auth().currentUser;
        users.sendEmailVerification().then(function() {
          setLoading(false)
          ToastAndroid.show("Please check your Mail of verification", ToastAndroid.LONG);
          firebase.auth().signOut();
        }).catch(function(error) {
         console.log(error)
         setLoading(false)
         firebase.auth().signOut();
        });
      
      //  console.log('s');
      }
    })
    .catch((error) => {
      console.log(error)
      if(error== 'Error: The password is invalid or the user does not have a password.')
      {
        ToastAndroid.show("Please check your email & password.", ToastAndroid.LONG);
      }
     
      setLoading(false)
    });
}

  return (
    <View style={{ flex: 1,backgroundColor:'#fff'  }}>
      <StatusBar backgroundColor="#fff"   barStyle="dark-content"  />   
      <Modal
          transparent={true}
          animationType={'none'}
          visible={loading}
          onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        {/* <View style={styles.activityIndicatorWrapper}> */}
          <ActivityIndicator size="large" color="#204482" />
        {/* </View> */}
      </View>
    </Modal>
    <KeyboardAvoidingView style={{ flex: 1,backgroundColor:'#fff'   }} >

      <ScrollView >
        <View style={styles.container}>
          {/* <LoadingModal isLoading={isLoading} /> */}
          <View style={styles.logoView}>
          <Image
          source={require('../assets/icon.png')}
            style={{
              height: 100,  width: 100, 
             marginLeft:-20,
              
            }}
          />
          </View>
          {/* <Text style={styles.subTitle}>Nblik</Text> */}
          <Text style={styles.title}>Login To Continue</Text>
          <View style={styles.fieldView}>
          
         
            <View style={{}}>
                <TextInput
                    // selectionColor='#ccee'
                    ref={input => (Email = input)}
                    underlineColor="transparent"
                    style={{ backgroundColor: '#fff',}}
                    mode="outlined"
                    outlineColor="#204482"
               
                    label="Email"
                    theme={{backgroundColor:'#fff', colors: { primary: '#204482',underlineColor:'transparent',}}}
                    // value={text}
                    // direction ='ltr'
                    onChangeText={text => setEmail(text)}
                    left={<TextInput.Icon name={() => <Icon name={'user-o'} size={20} color={"#204482"} />} />}
                    // left={{}
                    //     // <TextInput.Icon
                    //     //     name="planet"
                    //     // />
                    // }
                />
              <View style={{marginVertical:12}}/>  
              <TextInput
                  ref={input => (Password=input)}
                  style={{ backgroundColor: '#fff',}}
                  underlineColor="transparent"
                  mode="outlined"
                  label="Password"
                  theme={{ colors: { primary: '#204482',underlineColor:'transparent',}}}
                  secureTextEntry={showPassword}
                  right={<TextInput.Icon name={() => <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20}  color={"#204482"}/>} onPress={()=>{setShowPassword(!showPassword)}} />}
                  left={<TextInput.Icon name={() => <Icon  color={"#204482"} name={'lock'} size={20} />} />}
                  // value={text}
                  // direction ='ltr'
                  onChangeText={text => setPassword(text)}
                      
                  />
          
            </View>
            {/* <View style={styles.textInput}> */}
              {/* <Image source={require('../../resources/images/lock.png')} />
              <TextInput style={styles.input} secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} placeholder="password" /> */}
            {/* </View> */}
            {/* <TouchableOpacity onPress={() => props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassText}>Forgot Password ?</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.signInButton} onPress={async() =>{  login()}}>
              {

                <Text style={styles.signInText}>LOGIN</Text>
              }
            </TouchableOpacity>
            {/* <Text style={[styles.title, { textAlign: 'center' }]}>----- OR -----</Text> */}
            <TouchableOpacity style={[styles.signInButton, { backgroundColor: '#fff',marginTop:20,borderWidth:.3, flexDirection:'row', alignItems:'center'}]} onPress={() => {props.navigation.navigate('RegistrationScreen')}} >
                
            <Icon style={{position:'absolute',left:10}} name="envelope-o" size={25} color="#204482" />
            <Text style={{textAlign:'center', color:'#204482'}} > SIGNUP WITH EMAIL </Text>
              {/* <Image style={{ height: 45, borderRadius: 10, width: Dimensions.get('window').width - 60 }} source={require('../../resources/images/fb_btn.png')} /> */}
            </TouchableOpacity>

         
            {/* <TouchableOpacity style={[styles.signInButton, { backgroundColor: '#fff',marginTop:20,borderWidth:.3,flexDirection:'row', marginBottom:10, alignItems:'center'}]}  >
            <Image
          source={{uri : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png'}}
            style={{
              height: 25,  width: 25,  resizeMode: 'contain',
              position:'absolute',left:10
            }}
          />
              
                <Text style={{textAlign:'center', color:'#204482',}} > SIGNUP WITH GOOGLE </Text>
             
                </TouchableOpacity> */}
    

          </View>
          {/* <TouchableOpacity onPress={() =>{}}>
            <Text style={[styles.forgotPassText, { textAlign: 'center', marginTop: 30, marginBottom: 20, fontWeight: 'bold' }]}>
              {`Don't have an account? - `}
              <Text style={{ }}>
                Sign Up
        </Text>
            </Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: '#fff'
    },
    logoView: {
        // marginTop: Platform.OS == 'android' ? 40 : 60, 
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
        height:100
    },
    fieldView: {
        marginTop: 30,
        marginHorizontal: 20
    },
    modalBackground: {
      flex: 2,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
      backgroundColor: '#FFFFFF',
      height: '30%',
      width: '80%',
      borderRadius: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    subFieldText: {
        fontSize: 16,
        marginTop: 10
    },
    textInput: {
        // height: 45,
        marginTop: 10,
        // borderRadius: 10,
        // borderColor: 'white',
        // backgroundColor: 'white',
        borderWidth: 1,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {marginLeft: 10, flex: 1, height: 40},
    title: {
        fontSize: 22,
        marginTop: 20,
        textAlign:'center',
        fontWeight:"100",
        color:'#000',
        opacity:.6,
        fontWeight:'bold'
    },
    subTitle: {
        fontSize: 30,
        textAlign: 'center',
        marginTop:7,
        color:'#204482',
        letterSpacing:2,
        fontWeight: 'bold',
        
    },
    signInButton: {
        height: 45,
        marginTop: '30%',
        backgroundColor:'#204482',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom:5

    },
    signInText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    forgotPasswordContainer: {flexDirection: 'row', marginHorizontal: 30, marginTop: 20, alignItems: 'center'},
    forgotPassText: { fontSize: 16, textAlign: 'right', marginTop: 20,},
    popUpView: {
        
        flex: 1,
        backgroundColor: 'black',
        borderWidth: 0,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowOpacity: Platform.OS === 'ios' ? 0.1 : .1,
        opacity: 0.5,
        justifyContent: 'center'
      }

});

export default LoginScreen;