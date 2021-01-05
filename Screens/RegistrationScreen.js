import  React , {useState} from 'react';
import {StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Image,ToastAndroid, Modal, ActivityIndicator } from 'react-native';
import { TextInput  } from 'react-native-paper';
// import { Icon } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as firebase from 'firebase';
const RegistrationScreen = (props) => {
    const [text, setText] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('+91');
    const [loading, setLoading] = useState(false);
    const [store, setStore] = useState('');

    var Email = '';
    var Password = "";
    var Name = '';
    var Phone = '';
    var ConfirmPassword = '';
    var Store = '';

    const registration =async () =>{

      if(name.length==0){
        ToastAndroid.show("Enter Name.", ToastAndroid.SHORT);
        Name.focus()
         return
      }
      if(phone.length<13){
        ToastAndroid.show("Invalid Phone Number.", ToastAndroid.SHORT);
        Phone.focus()
         return
      }
      const reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
      if (reg.test(email) === false){
       ToastAndroid.show("Invalid Email.", ToastAndroid.SHORT);
         Email.focus()
        return
     }
     if (store.length<0){
      ToastAndroid.show("Invalid Store.", ToastAndroid.SHORT);
        store.focus()
       return
    }
      if(password.length<6){
        ToastAndroid.show("password minimum 6 characters.", ToastAndroid.SHORT);
        Password.focus()
         return
      }
      if(confirmPassword.length<6){
        ToastAndroid.show("password minimum 6 characters.", ToastAndroid.SHORT);
        ConfirmPassword.focus()
         return
      }
      if(password !=confirmPassword){
        ToastAndroid.show("Password not match.", ToastAndroid.SHORT);
        Password.focus()
         return
      }

    
      setLoading(true)
     let userData={
        email:email,
        phone:phone,
        name:name,
        store:store
      }
        var value =  await firebase.auth().createUserWithEmailAndPassword(email.trim(),password)
        if (value.additionalUserInfo.isNewUser) {
            firebase.auth().currentUser.updateProfile({displayName: name,email:email})
            .then(() => {
                firebase.database().ref('users/').child(firebase.auth().currentUser.uid).set(userData)
                .then(() => {
                  var user = firebase.auth().currentUser;
                  user.sendEmailVerification().then(function() {
                    ToastAndroid.show("Please check your Mail.", ToastAndroid.LONG);
                    props.navigation.navigate('LoginScreen')
                    firebase.auth().signOut();
                  }).catch(function(error) {
                    setLoading(false)
                  });
                  //  props.navigation.navigate('HomeScreen')
                    
                }).catch(()=>{
                  setLoading(false)
                });
            }).catch(()=>{
              setLoading(false)
            });
        }else{
          setLoading(false)
        }
    }
    
  
  return (
    <View style={{ flex: 1,backgroundColor:'#fff'  }}>
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
             marginLeft:20,
              
            }}
          />
          </View>
          <Text style={styles.title}>Sign up to Continue</Text>

          <View style={styles.fieldView}>
          
       
              <TextInput
                    // selectionColor='#ccee'
                    ref={input => (Name = input)}
                    underlineColor="transparent"
                    style={{ backgroundColor: '#fff',}}
                    mode="outlined"
                    outlineColor="#204482"
                    left={<TextInput.Icon name={() => <Icon name={'user'} size={20} color={"#204482"} />} />}
                    label="Name"
                    theme={{backgroundColor:'#fff', colors: { primary: '#204482',underlineColor:'transparent',}}}
                    value={name}
                    // direction ='ltr'
                    onChangeText={text => setName(text)}
                    // left={<TextInput.Icon name={() => <Icon name={'user-o'} size={20} />} />}
                  
                />
                   <View style={{marginVertical:7}}/>  
                   <TextInput
                    // selectionColor='#ccee'
                    ref={input => (Phone=input)}
                    underlineColor="transparent"
                    style={{ backgroundColor: '#fff',}}
                    mode="outlined"
                    outlineColor="#204482"
                    left={<TextInput.Icon name={() => <Icon name={'phone'} size={20} color={"#204482"} />} />}
                    label="Phone"
                    theme={{backgroundColor:'#fff', colors: { primary: '#204482',underlineColor:'transparent',}}}
                    value={phone}
                    // direction ='ltr'
                    onChangeText={text => setPhone(text)}
                    // left={<TextInput.Icon name={() => <Icon name={'user-o'} size={20} />} />}
                  
                />
                <View style={{marginVertical:7}}/>  
                <View style={{}}>
                <TextInput
                      ref={input => (Email=input)}
                    underlineColor="transparent"
                    style={{ backgroundColor: '#fff',}}
                    mode="outlined"
                    outlineColor="#204482"
                    left={<TextInput.Icon name={() => <Icon name={'envelope'} size={20} color={"#204482"} />} />}
                    label="Email"
                    theme={{backgroundColor:'#fff', colors: { primary: '#204482',underlineColor:'transparent',}}}
                    value={email}
                    // direction ='ltr'
                    onChangeText={text => setEmail(text)}
                    // left={<TextInput.Icon name={() => <Icon name={'user-o'} size={20} />} />}
               
                />
                  <View style={{marginVertical:7}}/>  
                  <TextInput
                      ref={input => (Store=input)}
                    underlineColor="transparent"
                    style={{ backgroundColor: '#fff',}}
                    mode="outlined"
                    outlineColor="#204482"
                    left={<TextInput.Icon name={() => <Icon name={'window-restore'} size={20} color={"#204482"} />} />}
                    label="Store Name"
                    theme={{backgroundColor:'#fff', colors: { primary: '#204482',underlineColor:'transparent',}}}
                    value={store}
                    // direction ='ltr'
                    onChangeText={text => setStore(text)}
                    // left={<TextInput.Icon name={() => <Icon name={'user-o'} size={20} />} />}
               
                />
              <View style={{marginVertical:7}}/>  
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
                  value={password}
                  // direction ='ltr'
                  onChangeText={text => setPassword(text)}
                      
                  />
          
             <View style={{marginVertical:7}}/>  
             <TextInput
                      ref={input => (ConfirmPassword=input)}
                    underlineColor="transparent"
                    style={{ backgroundColor: '#fff',}}
                    mode="outlined"
                    outlineColor="#204482"
                    secureTextEntry={showPassword}
                    label="Confirm Password"
                    theme={{backgroundColor:'#fff', colors: { primary: '#204482',underlineColor:'transparent',}}}
                    right={<TextInput.Icon name={() => <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20}  color={"#204482"}/>} onPress={()=>{setShowPassword(!showPassword)}} />}
                  left={<TextInput.Icon name={() => <Icon  color={"#204482"} name={'lock'} size={20} />} />}
                    onChangeText={text => setConfirmPassword(text)}
                    // left={<TextInput.Icon name={() => <Icon name={'user-o'} size={20} />} />}
                    value={confirmPassword}
                />
            </View>
           
            <TouchableOpacity style={styles.signInButton} onPress={() => {registration()}}>
              {

                <Text style={styles.signInText}>Continue</Text>
              }
            </TouchableOpacity>
         
         
           

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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height:120,
        width:120
    },
    modalBackground: {
      flex: 2,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'space-around',
      backgroundColor: '#00000040'
    },
    fieldView: {
        marginTop: 40,
        marginHorizontal: 20
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
        marginLeft: 20,
        textAlign:'left',
        fontWeight: "bold",
        color:'#000'
    },
    subTitle: {
        fontSize: 30,
        textAlign: 'left',
        marginTop:7,
        color:'#204482',
        paddingHorizontal:20,
        letterSpacing:2,
        fontWeight: 'bold',
        
    },
    signInButton: {
        height: 45,
        marginTop: '20%',
        backgroundColor:'#204482',
        justifyContent: 'center',
        borderRadius: 5,

    },
    signInText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        // fontWeight:'bold',
        letterSpacing:1,
        textTransform:'uppercase',
    },
    forgotPassText: { fontSize: 16, textAlign: 'right', marginTop: 20,},
   
});

export default RegistrationScreen;