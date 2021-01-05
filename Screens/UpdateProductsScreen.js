import  React , {useState} from 'react';
import {StyleSheet, View, ScrollView, Text, KeyboardAvoidingView, TouchableOpacity,TouchableHighlight, Image, StatusBar, TextInput, Modal, ToastAndroid } from 'react-native';
// import { TextInput  } from 'react-native-paper';
// import { Icon } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List } from 'react-native-paper';

import * as firebase from 'firebase';

const UpdateProductsScreen = (props) => {
  const [text, setText] = useState('');

  const [focus, setFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState(props.route.params.item.imageUrl)

  const [expanded, setExpanded] = React.useState(true);
  const [CategoryData, setCategoryData] = useState([]) 
  const [BrandData, setBrandData] = useState([]) 
  const [StockData, setStockData] = useState([{name:'Yes'},{name:'No'}]) 
  const [productName, setproductName] = useState(props.route.params.item.productName)
  const [mrp, setMrp] = useState(props.route.params.item.mrp)
  const [selling, setSelling] = useState(props.route.params.item.selling)
  const [quentity, setQuentity] = useState(props.route.params.item.quentity)
  const [stock, setStock] = useState(props.route.params.item.stock)
  const [margin, setMargin] = useState(props.route.params.item.margin)
  const [categories, setCategories] = useState(props.route.params.item.categories)
  const [brand, setbrand] = useState(props.route.params.item.brand);
  const [imageUrl, setImageUrl] = useState('');
  const [Url, setUrl] = useState('');
   
  const handlePress = () => setExpanded(!expanded);
  // console.log()
  const chooseFile = async () => {

    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        // quality:0,
      },
      maxHeight: 400,
      maxWidth: 400,
      quality:1
    };
    ImagePicker.launchImageLibrary(options, (response) => {
     console.log('Response = ', response.fileSize);
   
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        // alert(response.customButton);
      } else {
        const source = { uri: response.uri };
     
        setPhoto(response.uri)
        console.log('response', response.uri);
      }
    });
}

const launchCamera = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    maxHeight: 400,
    maxWidth: 400,
    quality:1
  };

  ImagePicker.launchCamera(options, (response) => {
  //  console.log('Response = ', response);
    
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      // alert(response.customButton);
    } else {
      const source = { uri: response.uri };
      console.log('ye')
      setPhoto(response.uri)
    //  console.log(source)
      // console.log('response', JSON.stringify(response));
      // this.setState({
      //   filePath: response,
      //   fileData: response.data,
      //   fileUri: response.uri
      // });
    }
  });

}

  const uploadmultimedia1 = async ( url) =>{
  // console.log(url)
  // this.setState({loading: true})
  const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
     };
     xhr.onerror = function() {
       reject(new TypeError('Network request failed')); // error occurred, rejecting
     };
     xhr.responseType = 'blob'; // use BlobModule's UriHandler
     xhr.open('GET', url, true); // fetch the blob from uri in async mode
     xhr.send(null); // no initial data
   });
  
  if((blob.size/1000000)>2) {
   // this.setState({loading: false},()=>{alert(languageJSON.image_size_error)})
   console.log('2mb')
  }
  else {
    console.log('pahucg')
    var timestamp = new Date().getTime()
    var imageRef = firebase.storage().ref().child(`users/`+timestamp+`/`);
    return imageRef.put(blob).then(() => {
        blob.close()
        return imageRef.getDownloadURL()
      }).then((dwnldurl) => {
        console.log(dwnldurl);
        // setImageUrl(dwnldurl);
        addProduct(dwnldurl)
      // alert('onupload');
      //  this.setState({imageurl1:dwnldurl});
    })
  }

}


    const  addProduct = async (dwnldurl) =>{

        let product ={
            imageUrl:dwnldurl,
            productName,
            stock,
            categories,
            brand,
            mrp,
            selling,
            margin,
            quentity,
            type:'Update',
            // date:new Date().toDateString()
        }
      await  firebase.database().ref('users/').child(firebase.auth().currentUser.uid).child('products').child(props.route.params.item.id).update(product).then(()=>{
          ToastAndroid.show("Update Products", ToastAndroid.SHORT);
        })
    }


  return (
    <View style={{ flex: 1,backgroundColor:'#fff'  }}>
        {/* <StatusBar backgroundColor="#ccee"  translucent={false} visible={true}  /> */}
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
           <Text style={styles.modalText}>Choose</Text>
            <View style={{flexDirection:'row',justifyContent:'space-evenly',marginVertical:20}}>
                <TouchableOpacity style={{marginHorizontal:40}} onPress={()=>{launchCamera()}}>
                <Icon name={'camera'} size={50} color={'#757575'} />
                <Text style={{textAlign:'center', letterSpacing:1,marginTop:10,fontSize:18}}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal:40}} onPress={()=>{chooseFile()}}>
                <Icon name={'image'} size={50} color={'#757575'} />
                <Text  style={{textAlign:'center', letterSpacing:1,marginTop:10,fontSize:18}}>Gallery</Text>
                </TouchableOpacity>
            </View>
          <TouchableOpacity  style={{width:'100%'}}  onPress={() => {
                setModalVisible(!modalVisible);
              }}>
            <Text style={[styles.modalText,{textAlign:'right', paddingTop:10}]}>CANCEL</Text>
            </TouchableOpacity> 
            {/* <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight> */}
          </View>
        </View>
      </Modal>
      <TouchableOpacity 
       onPress={()=>{props.navigation.goBack()}}
      style={{position:'relative',top:10,left:10,width:40,height:40,     borderRadius:15,backgroundColor:'#fff',elevation:5,justifyContent:'center',alignItems:'center'}}> 
          <Icon name={'long-arrow-left'}   size={20} color={'#204288'} />
      </TouchableOpacity>
    <KeyboardAvoidingView style={{ flex: 1,backgroundColor:'#fff'   }} >

 
      <ScrollView >
      <View style={styles.drawer}>
                    <TouchableOpacity onPress={()=>{setModalVisible(!modalVisible);}} style={styles.drawerIcon}>
                    <Icon name={'camera'} size={50} style={{ position: 'absolute', }} color={'#ebebeb'} />
                    { photo ?
                        <Image
                            source={{ uri: photo}}
                            resizeMode='cover'
                            style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
                        />
                      : null }
                       <View style={{position:'absolute',right:'25%',bottom:'25%'}}>                         
                         <Icon name={'camera'} size={30} style={{ position: 'absolute', }} color={'#204482'} />
                       </View>

                    </TouchableOpacity>
                </View>
             <View style={{marginHorizontal:20}}>
            
                <TextInput
                     style={[{
                  backgroundColor: '#fff',textAlignVertical: "top",width:'100%',paddingHorizontal:10,borderWidth:1,borderRadius:5,marginTop:10}]}
                    underlineColor="transparent"
                    mode="outlined"
                    placeholder="Product Name"
                    // ref={()=>{}}
                    onFocus={()=> {setFocus(true)} }
                    onEndEditing={()=>{setFocus(false)}}
                    onChangeText={(text)=>setproductName(text)}
                    value={productName}
                    theme={{ colors: { primary: '#204482',underlineColor:'transparent',}}}
                 
                    // onChangeText={text => setText(text)}
                    
                />
                 <List.Accordion
                        title={stock ? stock : "Stock"}
                        // left={props => <List.Icon {...props} icon="folder" />}
                      
                        style={{marginTop:10,borderWidth:1,borderRadius:5}}
                        >  
                         {  StockData.map((item,key)=>{
                          return( 
                        <List.Item title={item.name} key={key} onPress={()=>setStock(item.name)} style={{elevation:5,backgroundColor:'#fff'}}  />
                        )
                    })  }
                </List.Accordion>
                <List.Accordion
                        title={categories ? categories : "Select Categories"}
                        // left={props => <List.Icon {...props} icon="folder" />}
                      
                        style={{marginTop:10,borderWidth:1,borderRadius:5}}
                        >  
                         {  CategoryData.map((item,key)=>{
                          return( 
                        <List.Item title={item.name} key={key} onPress={()=>setCategories(item.name)} style={{elevation:5,backgroundColor:'#fff'}}  />
                        )
                    })  }
                </List.Accordion>
                <List.Accordion
                        title={brand ? brand : "Select Brand"}
                        // left={props => <List.Icon {...props} icon="folder" />}
                      
                        style={{marginTop:10,borderWidth:1,borderRadius:5}}
                        >  
                         {  BrandData.map((item,key)=>{
                          return( 
                        <List.Item title={item.name} key={key} onPress={()=>setbrand(item.name)} style={{elevation:5,backgroundColor:'#fff'}}  />
                        )
                    })  }
                </List.Accordion>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TextInput
                     style={[{
                  backgroundColor: '#fff',textAlignVertical: "top",width:'48%',paddingHorizontal:10,borderWidth:1,borderRadius:5,marginTop:10}]}
                    underlineColor="transparent"
                    mode="outlined"
                    placeholder="MRP"
                    keyboardType='numeric'
                    onChangeText={(text)=>{setMrp(text)}}
                    value={mrp.toString()}
                    // ref={()=>{}}
                    onFocus={()=> {setFocus(true)} }
                    onEndEditing={()=>{setFocus(false)}}
                    label="Tell people about you"
                  
                    theme={{ colors: { primary: '#204482',underlineColor:'transparent',}}}
                 
                    // onChangeText={text => setText(text)}
                    
                />
                   <TextInput
                     style={[{
                     backgroundColor: '#fff',textAlignVertical: "top",width:'48%',paddingHorizontal:10,borderWidth:1,borderRadius:5,marginTop:10}]}
                    underlineColor="transparent"
                    mode="outlined"
                    placeholder="SELLING PRICE"
                    keyboardType='numeric'
                    onChangeText={(text)=>{setSelling(text)}}
                    value={selling.toString()}
                    onFocus={()=> {setFocus(true)} }
                    onEndEditing={()=>{setFocus(false)}}
                    label="Tell people about you"
                  
                    theme={{ colors: { primary: '#204482',underlineColor:'transparent',}}}
                 
                    // onChangeText={text => setText(text)}
                    
                />
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TextInput
                     style={[{
                  backgroundColor:'#fff',textAlignVertical: "top",width:'48%',paddingHorizontal:10,borderWidth:1,borderRadius:5,marginTop:10}]}
                    underlineColor="transparent"
                    mode="outlined"
                    placeholder="QUENTITY (GMS,KG,LTR,ML,PCS)"
                    onChangeText={(text)=>{setQuentity(text)}}
                    value={quentity.toString()}
                    onFocus={()=> {setFocus(true)} }
                    onEndEditing={()=>{setFocus(false)}}
                    label="Tell people about you"
                  
                    theme={{ colors: { primary: '#204482',underlineColor:'transparent',}}}
                 
                    // onChangeText={text => setText(text)}
                    
                />
                   <TextInput
                    style={[{
                    backgroundColor: '#fff',textAlignVertical: "top",width:'48%',paddingHorizontal:10,borderWidth:1,borderRadius:5,marginTop:10}]}
                    underlineColor="transparent"
                    mode="outlined"
                    placeholder="MARGIN (%)"
                    keyboardType='numeric'
                    onChangeText={(text)=>{setMargin(text)}}
                    value={margin}
                    onFocus={()=> {setFocus(true)} }
                    onEndEditing={()=>{setFocus(false)}}
                    label="Tell people about you"
                  
                    theme={{ colors: { primary: '#204482',underlineColor:'transparent',}}}
                 
                    // onChangeText={text => setText(text)}
                    
                />
                
              
                </View>
            

</View>
            <TouchableOpacity style={styles.signInButton} onPress={() => {uploadmultimedia1(photo)}}>
              {

                <Text style={styles.signInText}>Add Product</Text>
              }
            </TouchableOpacity>
    
      </ScrollView>
    </KeyboardAvoidingView>
  </View>
  );
};

const styles = StyleSheet.create({
    drawer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'15%'
        // height: 130
    },
    signInText: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center'
  },
    signInButton: {
      height: 45,
      marginTop: '10%',
      backgroundColor:'#204482',
      justifyContent: 'center',
      borderRadius: 5,
      alignItems:'center',
      marginHorizontal:20,
      marginBottom:10,
  },
    drawerIcon: {
        width: 150,
        height: 150,
        // backgroundColor: '#ccee',
        borderRadius: 75,
        justifyContent: 'center',
        alignItems: 'center',
        elevation:1
    },
    input: {
       
        justifyContent: 'flex-start',
        alignItems: "flex-start",
    
        // height:40,
        fontSize: 16,
        borderBottomWidth: 1,
      //  borderBottomColor: colors.greyLite
        // backgroundColor:"blue"
    },  
 centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
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
openButton: {
  backgroundColor: "#F194FF",
  borderRadius: 20,
  padding: 10,
  elevation: 2
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
  
}
});

export default UpdateProductsScreen;