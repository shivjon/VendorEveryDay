import  React , {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Image, FlatList, Keyboard,TextInput,StatusBar, Dimensions, Modal, Alert, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-community/async-storage';

import moment from "moment";
var { height,width } = Dimensions.get('window');



const TaskScreens = (props) => {
    const [text, setText] = useState('');
    const [todoText, setTodoText] = useState([]);
    const [showPassword, setShowPassword] = useState(true)
    const [data, setData] = useState([]);
    const [val, setVal] = useState([])
    const [index, setIndex] = useState(0);
    const [edit, setEdit] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
  const va ={
      name:'ds',
      ram:'sds'
  }

  useEffect(() => { 
    console.log('value',props.route.params.id)
      // AsyncStorage.getItem('name').then((value) => {
      // if(value){
      //   setData(JSON.parse(value));
      //   setVal(JSON.parse(value));
      //   console.log(value);
      // }

     
    //  }
    // )
    return () => {
    
        setData([]);
      console.log("This will be logged on unmount");
    }
  },[]);

  const  SaveDetails =async () => {
    if( text == ''){
      return     ToastAndroid.show("Enter Your Task", ToastAndroid.SHORT);
    }
    if(edit){
      let values = data.map((value,key)=>{
        if(value.data === todoText.data)
        {
            value.data = text;
          
        }
        return {...value};
      })
      setVal(values);
      setData(values);
      setText('');
      setEdit(false);
      // AsyncStorage.setItem('name',  JSON.stringify(values));
      console.log('c',values)
    }else{
      var newArray = [...val , {
        data:text,
        date: moment(new Date()).format('lll'),
        color:'#204482',
     }];
     Keyboard.dismiss()
      setVal(newArray);
      setData(newArray)
      setText('');
      // AsyncStorage.setItem('name',  JSON.stringify(newArray));
      console.dir('s',newArray)
    }
  
  }

  const changeTextColor = () =>{
    console.log(todoText)
   let values = data.map((value,key)=>{
      if(key === index)
      {
          value.color = '#00c853';
          console.log('s')
      }
      return {...value};
    })
    setVal(values);
    setData(values)
    // AsyncStorage.setItem('name',  JSON.stringify(values));
    console.log('c',values)

  }

  const renderItem = ({ item,index }) => (
    <TouchableOpacity onLongPress={async()=>{ deleteItem(index); setTodoText(item); }}  onPress={ async()=>{ setModalVisible(true);await setTodoText(item); setIndex(index)  }} style={{justifyContent:'center',alignItems:'center'}} >   
     {/* <TouchableOpacity style={{ elevation:10, position:'absolute',right:10, top:20, width:20 ,backgroundColor:'#ccee' }} onPress={ async()=>{ deleteItem() }} >   
        <Icon name='book' color="#000" size={20} />
      </TouchableOpacity> */}
    <Text style={[styles.container1,{ color:"#fff",margin:5,textAlign:'justify', 
    
    padding:15,borderRadius:15,fontSize:18, backgroundColor:item.color,}]}  > {item.data}</Text> 
    <Text style={{textAlign:'center',marginHorizontal:5,marginVertical:2}}>{item.date}</Text>
    </TouchableOpacity>  
  
  );
 
  const deleteItem = (index) =>{
    Alert.alert(
      "Delete Task",
      "Are you want to delete this Task",
      [
        {
          text: "Edit",
          onPress: () => {setText(todoText.data); setEdit(true) },
          style: "cancel"
        },
        
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", 
          onPress: () => {   let value =  data.filter((item, key) => key !== index);
              setVal(value)
              setData(value)
              // AsyncStorage.setItem('name',  JSON.stringify(value));
              console.log('sd', index)} 
         
        }
          
      ],
       
      { cancelable: false }
    );
 
  }
  
  const emptylist = () =>{
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff',height:height-100}}>
        
          <Icon name='book' color="#204480" size={100} />
          <Text style={{fontSize:20,color:'#204480',fontWeight:'bold',letterSpacing:1,textTransform:'uppercase'}}>Add Your Tasks</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1,backgroundColor:'#fff'  }}>
      <StatusBar backgroundColor="#204482" />
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
         
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <Text style={styles.modalText}>Task</Text>
           <ScrollView>
              <Text style={{fontSize:18}}>
                {todoText.data}
              </Text>
            </ScrollView>
            <View style={{flexDirection:'row',marginVertical:10,backgroundColor:'#fff'}}>
            <TouchableOpacity  style={{width:'50%',backgroundColor:'green',marginRight:10,borderRadius:20}}  onPress={() => {
                setModalVisible(!modalVisible);changeTextColor();
              }}>
            <Text style={[styles.modalText,{textAlign:'center',color:'#ffff', paddingTop:10,}]}>Completed</Text>
            </TouchableOpacity> 
            <TouchableOpacity  style={{width:'50%',backgroundColor:'#204480',borderRadius:20}}  onPress={() => {
                setModalVisible(!modalVisible);
              }}>
            <Text style={[styles.modalText,{textAlign:'center',color:'#ffff', paddingTop:10}]}>Close</Text>
            </TouchableOpacity> 
          
            </View>
          </View>
        </View>
      </Modal>
   
     
        <View style={styles.container}>
          {/* <LoadingModal isLoading={isLoading} /> */}
         
      
         {/* <Text style={{backgroundColor:'#ccee'}}> sda</Text> */}
      
          <FlatList
            showsVerticalScrollIndicator={false}
            // inverted
            numColumns={2}
            horizontal={false}
            data={data}
            ListEmptyComponent={emptylist}
            refreshing={true}
            renderItem={renderItem}
            keyExtractor={(_, index) => String(index)}
              />
                </View>
   
        <View style={styles.fieldView}>
          
          <KeyboardAvoidingView style={{ backgroundColor:'#204482',flexDirection:'row'}} >
            <View style={styles.inputContainer}>
                <TextInput
                    tintColor="#204480"
                    // selectionColor='#ccee'
                    underlineColor='#fff'
                    selectionColor={'#204482'} 
                    style={{ 
                    
                        borderRadius: 0,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        height: 40,
                        overflow: 'hidden',
                        backgroundColor: '#fff',}}
                        mode="flat"
                        outlineColor="#204482"
                        placeholder="Task"
                        label="Add Task"
                        theme={{backgroundColor:'#fff', colors: { primary: '#204482',underlineColor:'transparent',borderColor:'#204482'}}}
                        value={text}
                        // direction ='ltr'
                        onChangeText={text => setText(text)}
                    // left={<TextInput.Icon name={() => <Icon name={'user-o'} size={20} />} />}
                />  
            </View>
             <TouchableOpacity style={styles.signInButton} onPress={() => {
                SaveDetails()
            }}>
              <Icon color="#fff" size={23} name='send' /> 
            </TouchableOpacity>
            </KeyboardAvoidingView>
            {/* <TouchableOpacity style={styles.signInButton} onPress={() => {
                SaveDetails()
            }}>
              {

                <Text style={styles.signInText}>Continue</Text>
              }
            </TouchableOpacity> */}
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
      width: width_item,
      height: (width_item / 131) * 130,
      justifyContent: 'center',
      alignItems: 'center',
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
      height: 50,
      width:50,
      elevation:3,
      backgroundColor:'#204482',
      justifyContent: 'center',
      borderRadius: 50/2,
      flex:.5,
      borderColor:'#fff',
      borderWidth:1,
      position:'absolute',
      right:5,
      top:5,
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
        marginTop: 10,
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