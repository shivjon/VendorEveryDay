import  React , {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Image,Switch, FlatList,BackHandler, Keyboard,TextInput,StatusBar, Dimensions, Modal, Alert, ToastAndroid, RefreshControl, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';

import moment from "moment";
var { height,width } = Dimensions.get('window');
import { useFocusEffect } from '@react-navigation/native';
import { ProgressBar } from 'react-native-paper';

import * as firebase from 'firebase';
// AIzaSyA99wtWGrz2PYCYZenLLYpYjagiFwgHYEo  api google

const TaskScreens = (props) => {
    const [text, setText] = useState('');
    const [todoText, setTodoText] = useState([]);
    const [showPassword, setShowPassword] = useState(true)
    const [switchModal, setSwitchModal] = useState(false)
    const [progressLoader, setProgressLoader] = useState(true)
    const [data, setData] = useState([]);
    const [val, setVal] = useState([])
    const [index, setIndex] = useState(0);
    const [edit, setEdit] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectTitle, setProjectTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [userId, setUserId] = useState(firebase.auth().currentUser);
    const [refreshing, setRefreshing] = React.useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = (value,stock) => {
      console.log(value,stock)
   
      firebase.database().ref('users/').child(firebase.auth().currentUser.uid).child('products').child(value).update({stock: stock == 'Yes' ? 'No' : 'Yes'}).then(()=>{
        ToastAndroid.show("Update SuccessFully", ToastAndroid.SHORT);
      })


    }
  
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      getProjectData();
      wait(2000).then(() => setRefreshing(false));
    }, []);
  
    const wait = (timeout) => {
      return new Promise(resolve => {
        setTimeout(resolve, timeout);
      });
    }
    
    useFocusEffect(
     
      React.useCallback(() => {
        let currentCount = 0;
   
          const onBackPress = () => {
            if (currentCount < 1) {
              currentCount += 1;
              setTimeout( () => {
                currentCount = 0;
                console.log(currentCount)
              }, 2000);
              ToastAndroid.show("Press Again To Exit", ToastAndroid.SHORT);
              return true;
            } else {
              BackHandler.exitApp();
              return true;
            } 
          };
         
          BackHandler.addEventListener('hardwareBackPress', onBackPress);

          return () =>
          // clearInterval(interval)
              BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      }, [])
  );


  function SettingsScreen() {
    Alert.alert(
      "Sign Out",
      "Are you sure ? ",
      [
       
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", 
          onPress: () => { firebase.auth().signOut() ; props.navigation.navigate('LoginScreen')  }
      }
          
      ],
       
      { cancelable: false }
    );
  
    }




  useEffect(() => { 
 //  firebase.auth().signOut()
    getProjectData()
  
    return () => {

    }
  },[]);

  const getProjectData = () =>{
    var customerDetails = firebase.database().ref('users/').child(firebase.auth().currentUser.uid).child('products');
    customerDetails.on('value', customerData=>{
       var customerValue= customerData.val();
     
       let   resultData= [];
            for(let i in customerValue ){
              customerValue[i].id= i;
              //  customerValue[i].createDate = moment(customerValue[i].createDate).format('lll');
               resultData.push(customerValue[i])
               console.log(customerValue[i]);
            }  
           setData(resultData)
          console.log(resultData)
           setProgressLoader(false)
       })
  } 
   

 
  

  const renderItem = ({ item,index }) => (
    <TouchableOpacity  disabled={true} 

      style={{justifyContent:'center',alignItems:'center',backgroundColor:'#fff',}} 
      // onPress={()=>{props.navigation.navigate('TaskManageScreen',{id:item})}}
    >   
      <View style={[styles.container1,{margin:5,backgroundColor:'#fff',flexDirection:'row'}]}>
       <View style={{justifyContent:'center',marginHorizontal:10,alignItems:'center',width:'25%'}}>
         {   item.imageUrl ? 
            <Image
            source={{ uri: item.imageUrl  }}
              style={{
                height: '90%',  width: '100%', 
                borderRadius:10,
              //  marginLeft:-20,
              }}
            />
            :
         <Icon name='shopping-cart' color="#ececec" size={70} opacity={.5}  /> 
            }
       </View>  
       <View style={{marginHorizontal:5,flexDirection:'column',width:'60%',marginTop:5}}>
         <Text numberOfLines={2} ellipsizeMode='tail' style={{fontSize:18,opacity:.6, }}>{item.productName ? item.productName : null } </Text>
       
          <Text style={{fontSize:16,opacity:.4, }}> {item.categories ? item.categories : null } </Text>
         <Text style={{fontSize:16,opacity:.4, }}> {item.brand ? item.brand : null } </Text>
        
        <View style={{position:'absolute',bottom:0,marginVertical:10}}>
         <View style={{flexDirection:'row',overflow:'scroll',marginTop:10,}}>
           <Text style={{}}>MRP:<Text style={{fontSize:25,opacity:.8}}> {item.mrp ? item.mrp : 0 } </Text></Text>
           <Text style={{marginHorizontal:10}}>Selling:<Text style={{fontSize:25}}> {item.selling ? item.selling : 0 } </Text></Text>
         </View>
         <View style={{flexDirection:'row',overflow:'scroll',}}>
            <Text style={{}}>Quantity: {item.quentity ? item.quentity : null } </Text>
            <Text style={{marginHorizontal:10}}>Margin: {item.margin ? item.margin : 0 } %</Text>
         </View>
         </View>
       </View> 
       <View style={{position:'absolute',right:0}}>
            <Switch
              trackColor={{ false: "#ececec", true: "#ececec" }}
              thumbColor={item.stock=='Yes' ? "#9AB748" : "#F94848"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={()=>{toggleSwitch(item.id,item.stock)}}
              value={item.stock=='Yes'? true : false}
            />
        </View>
        <View style={{position:'absolute',right:0,bottom:0}}>
          <TouchableOpacity onPress={()=>{props.navigation.navigate('UpdateProductsScreen',{item})}} >
            <Icon name={'edit'} color="#228240" size={25} />
          </TouchableOpacity>
        </View>
      </View>
   
    </TouchableOpacity>  
  
  );
 
  const emptylist = () =>{
    return (
      <>
      {progressLoader ? null :
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',height:height-100}}>
        
          <Icon name='product-hunt' color="#204480" size={100} />
          <Text style={{fontSize:20,color:'#204480',fontWeight:'bold',letterSpacing:1,textTransform:'uppercase'}}>Add Your Product</Text>
      </View>
  }
      </>
    )
  }


  const  projectCreate = async () =>{
    if(projectTitle == ''){
      return    ToastAndroid.show("Please Enter Project Name.", ToastAndroid.SHORT);
    }
    let authData = {
      title:projectTitle,
      createDate: date.toString(),
      status: 'open',
    }
 
    
    var householdRef = await firebase.database().ref('projectGroups/').push(authData).key;
    console.log(householdRef)
    let v= householdRef;
    // firebase.database().ref('projectGroups/'+householdRef+'/userList').update({list:userId})
    await firebase.database().ref('users/').child(firebase.auth().currentUser.uid).child('projectGroups').child(v).update(authData).then(()=>{
         firebase.database().ref('projectGroups/').child(v).child('userList').push({'id': firebase.auth().currentUser.uid,'name':firebase.auth().currentUser.displayName})
         setLoading(false);
         setProjectTitle('');
    })
    

    // .then((user) => {
    //   firebase.database().ref('users/'+firebase.auth().currentUser+'/projectGroups').push(authData)
    //    console.log('sapue')
    // }).catch((error) => {
          
    //      });
  }


  return (
    <View style={{ flex: 1,backgroundColor:'#fff'  }}>
       {/* <ActivityIndicator size="small" color="#0000ff" /> */}
      <StatusBar backgroundColor="#204482" />
      <View style={{backgroundColor:'#204482',height:'8%',justifyContent:'space-around',alignItems:'center',flexDirection:'row'}}>
        <Text style={{fontSize:25,fontWeight:'bold',color:'#fff',letterSpacing:2,textTransform:'uppercase'}}>Products</Text>
        <TouchableOpacity style={{backgroundColor:'#fff',width:50,height:50, borderRadius:25,elevation:5,right:10,position:'absolute'}}  onPress={()=>SettingsScreen()}>
    <Text style={{fontSize:25, textTransform: 'uppercase', textAlign:'center',color:'#204482',marginTop:5,fontWeight:'bold'}}>{userId.displayName.slice(0,1)}</Text>
        </TouchableOpacity>
      {/* <Icon name="arrows-h" size={25} /> */}
      </View>
     
      <ProgressBar progress={0.5} indeterminate={progressLoader} visible={progressLoader? true: false} color={'#204482'} />
   
  

   
        <View style={styles.container}>
 
      
          <FlatList
            showsVerticalScrollIndicator={false}
            // inverted
            // numColumns={2}
            horizontal={false}
            data={data}
            refreshControl={
           
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
       
            }
            ListEmptyComponent={emptylist}
            refreshing={true}
            renderItem={renderItem}
            keyExtractor={(_, index) => String(index)}
              />
                </View>
   
        <View style={styles.fieldView}>
        <TouchableOpacity  style={{width:70,height:70,position:'absolute',right:20,bottom:20, backgroundColor:'#204482',borderRadius:35,justifyContent:'center',alignItems:'center'}}  onPress={() => {
            props.navigation.navigate('AddProductsScreen');
              }}>
                       <Icon name='plus' color="#fff" size={25} />
            </TouchableOpacity> 

          </View>
  
  </View>
  );
};
const width_item = (width - 20) / 2;
const styles = StyleSheet.create({
    container: {
        flex: 1,
       backgroundColor: '#fff'
    },
    container1: {
    
      borderRadius: 12,
      width: '95%',
      height: (width_item / 60) * 50,
      // justifyContent: 'center',
      // alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      top: 0,

      shadowOpacity: 0.03,
      shadowRadius: 4.65,

      elevation: 6,
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
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 10,
      textAlign: "left",
      width:'100%',
      fontSize:20,
      color:'#204482',
      letterSpacing:1,
    },
modalView: {
  margin: 20,
  backgroundColor: "white",
  borderRadius: 3,
  padding: 25,
  paddingBottom:10,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  width:'80%',
  // height:'40%',
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
},
    inputContainer: {
        borderRadius: 35,
        backgroundColor:'#fff',
        overflow: 'hidden',
        borderWidth:1,
        padding:5,
        marginLeft:5,
      marginRight:'15%',
        marginVertical:5,
        flex:1.5,
    },
    signInButton: {
      height: 40,
      width: '80%',
      elevation:3,
      backgroundColor:'#204482',
      justifyContent: 'center',
   
      borderRadius:25,
      borderColor:'#fff',
      borderWidth:1,

      justifyContent:'center',
      alignItems:'center',
    },
    logoView: {
        // marginTop: Platform.OS == 'android' ? 40 : 60, 
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height:120,
        width:120
    },
    fieldView: {
     //   marginTop: 10,
        // marginHorizontal: 20,
        // paddingHorizontal:20
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

export default TaskScreens;