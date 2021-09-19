import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  PermissionsAndroid,
  Share,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  LogBox
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Entypo from  'react-native-vector-icons/dist/Entypo';
import { SliderBox } from "react-native-image-slider-box";
import RNFetchBlob from 'rn-fetch-blob';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import DocumentPicker from 'react-native-document-picker';
import ImageResizer from 'react-native-image-resizer';


var baseImagePath = '';
var images1 = '';
var value = new FormData();
// const images1 = [     
    
// ];
const ExportImageEdit = ({route, navigation }) => {


    const {  images ,exportid} = route.params;
    const [EditImages , setEditImages] = useState(images)
    const [opener , setopener] = useState(false)
    const[imagesEditable , setimagesEditable] = useState(images)
    const [img , setimg] = useState([])
    const[delimg , setdelimg] = useState([])
    const [spinner , setspinner] = useState(false)


    const showSnackbarMessage = () => {
      setTimeout(() => {
        Snackbar.show({
          backgroundColor: '#008B8B',
          title: 'Successfully Updated',
          duration: Snackbar.LENGTH_SHORT,
        });
      }, 250);
    };
  


const handleRemoveItem = e => {

  const newArr = [...EditImages];
  newArr.splice(newArr.findIndex(item => item === e), 1)
  setEditImages(newArr);

  if(e.baseurl){
  delimg.push(e.id)
  value.append('deleted_images[]',e.id);

  console.log(delimg.toString());
  }
}



const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = () => {

    let options = {
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.7,
    multiple:true,
    mediaType:'Photo'
    };
launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      value.append('export_image[]',response )
      
      img.push(response)
      setEditImages(old => [...old, ...img]);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      // setFilePath(response);
    });
  };



// 45484


// const openCamera = () =>{

//   ImagePicker.openCamera({
//     width: 300,
//     height: 400,
//     cropping: true,
//   }).then(image => {
//     console.log('camera image is  ::::::'+image);
//     console.log('URI : ' +JSON.stringify(image));
//     setopener(false)
   
//     // value.append('export_image[]',image )
//     // setEditImages(old => [...old, ...image]);

//   });
// }

const selectFile3 = async () => {
  try {
    const results = await DocumentPicker.pickMultiple({
      type: [DocumentPicker.types.images],
      
      //There can me more options as well find above
    });

console.log(results);
    for (const res of results) {
      //Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('URI : ' + res.uri);
      console.log('Type : ' + res.type);
      
      
      console.log('File Name : ' + res.name);
      console.log('File Size : ' + res.size);
        value.append('export_image[]',res )

//       ImageResizer.createResizedImage(res.uri ,640  , 640,'JPEG' , 0.4, 0,)
//       .then(response => {
//         console.log('imgresize======'+JSON.stringify(response));
//         value.append('export_image[]',response )
//         // setEditImages(old => [...old, ...img]);


//         // response.uri is the URI of the new image that can now be displayed, uploaded...
//         // response.path is the path of the new image
//         // response.name is the name of the new image with the extension
//         // response.size is the size of the new image
//       })
//       .catch(err => {
//         console.log('imgresize error'+err);
// setspinner(false)
//         // Oops, something went wrong. Check that the filename is correct and
//         // inspect err to get more details.
//       });
//       const result = await ImageCompressor.compress(res, {
//         quality:0.6,
// })

// res : {"size":3319189,"name":"20210327_095749.jpg","fileCopyUri":"content://com.android.providers.media.documents/document/image%3A2616","type":"image/jpeg","uri":"content://com.android.providers.media.documents/document/image%3A2616"}

// ImageResizer.createResizedImage(res.uri, 550,800, 'JPEG', 100, 0, undefined, false, { mode, onlyScaleDown })
// .then(resizedImage => {
  
//   // this.setState({ resizedImage });
// })
// .catch(err => {
//   console.log(err);
//   return Alert.alert(
//     'Unable to resize the photo',
//     'Check the console for full the error message',
//   );
// });
    // console.log('size after');
      console.log(value);
      img.push(res)
      // console.log(JSON.stringify(res));
    }
    setopener(false)

  //  imagecompress(results)
    setEditImages(old => [...old, ...img]);
    setimg([])

    console.log('data is '+img);

    
    //Setting the state to show multiple file attributes
    // let newarray1 = [...EditImages]
    // let arraytemp = [];
    // console.log('result i  ::::::::::::::'+results)

    // for(var o = 0; o <= results.length-1 ; o++){
    //   // console.log('hi');
    //   // let element = images[o].path;
    //   newarray1.push(results[o])
    // }s

    // setEditImages(newarray1)
    
    // console.log(EditImages.length);
    
    // this.setState({ multipleFile: results });
  } catch (err) {
    setspinner(false)

    //Handling any exception (If any)
    if (DocumentPicker.isCancel(err)) {
      setopener(false)

      //If user canceled the document selection
      // alert('Canceled from multiple doc picker');
    } else {
      setopener(false)

      //For Unknown Error
      alert('Unknown Error: ' + JSON.stringify(err));
      throw err;
    }
  }


};


// const chooseFile1 = () =>{

//   setopener(false)
// let d = new FormData();
//   ImagePicker.openPicker({
//     multiple: true,
//     width: 300,
//     height: 400,
//     includeBase64:true,
//     compressImageQuality:0.6,
//     cropping: false
//   }).then(images => {
//     images.map((item , index)=>{
//       console.log('img at chosefile1'+item.data + index)
//       console.log(JSON.stringify(item) )


      
//       value.append('export_image[]',item )
//       img.push(item)
//     })
//     setEditImages(old => [...old, ...img]);

// console.log(d.name);
//     return{
//       uri:images[0].path,
//       name:images[0].filename
      
//     }
    
    
//     // 13319189
//     // 13319189
//     // 1411905
// });

// }

const renderimageslist = ({item, index}) =>{
  if (item.plusImage) {
    return (
<View style={{flexDirection:'column',alignSelf:'center', marginTop:5, justifyContent:'center',paddingHorizontal:2, width:80 ,height:100}}

>
<TouchableOpacity 
onPress={()=> setopener(true)}
style={{flexDirection:'column',justifyContent:'center', borderRadius:10, borderWidth:1, borderColor:'grey', alignSelf:'center', marginTop:5, paddingHorizontal:2, width:80 ,height:80}}
>
        <Text style={{color:'grey',alignSelf:'center', fontSize:36,}}>+</Text>
      </TouchableOpacity>
<View style={{alignSelf:'center', height:25}}>
</View>
                
</View>
    );
  }
  let images = '';
  if(item.baseurl){
    images='https://admin.afgshipping.com/uploads/'+item.thumbnail
  }else if(item.path){
    images = item.path;
  }else{
    images = item.uri;
  }

  return(   
<View style={{flexDirection:'column',alignSelf:'center', marginTop:5, paddingHorizontal:2, width:80 ,height:100}}

>

<Image style={{width:'100%',height: 80,borderRadius:5, resizeMode:'cover'}}  source={{uri: images}} />






<TouchableOpacity 
onPress={()=> { 
  
  handleRemoveItem(item)
  
  }}
style={{alignSelf:'center'}}>
<MaterialCommunityIcons name='delete' size={20} color='red' /></TouchableOpacity>
                
</View>

  
  
  )
  
   }

useEffect(() => {

  // setInterval(() => {

  //   setspinner(false)
  //   // this.setState({
  //   //   spinner: !this.state.spinner
  //   // });
  // }, 100);
  





  // setimages(vehicleDetails.images)
  // console.warn('length of img'+ images);
  


  return () => {
    
  }
}, [])


const callingupdatesimages =() =>{
  // data.append('profile_pic',  {uri: fileToUpload1.uri,name: fileToUpload1.name,filename :fileToUpload1.filename,type: fileToUpload1.type});
  setspinner(true)
  console.log('img at fetch is ::::::::::'+img);
  var url = 'https://admin.afgshipping.com/webapi/export/editimages';

  value.append('exportId',exportid);
  // value.append('export_image[]', img);
 
  console.log('upload_key_vale ',value)
  fetch(url, {
      method: 'POST',
      headers: {

          Accept: 'application/json',
           'Content-Type': 'multipart/form-data',
         
         'authkey': AppConstance.USER_INFO.USER_TOKEN
      },
      body: value,
  })
      .then((response) =>(response.json())
       .then((responseJson) => {
        setspinner(false)

        if(responseJson.data.message){
       showSnackbarMessage()
        }
          console.log('response is :::::::::::: '+JSON.stringify(responseJson));
          console.log('res ;'+responseJson.data.message)
          console.log(responseJson.status);
          console.log(responseJson.message)
          value = new FormData();
          console.log('-------------------'+JSON.stringify(value));
          // this.setState({ isLoading: false })
         
      })
      )
      // .then((responseJson) => {
        
          // console.log('response is :::::::::::: '+responseJson.toString());
          // console.log('res ;'+responseJson.data.message)
          // console.log(responseJson.status);
          // console.log(responseJson.message)
        
          // this.setState({ isLoading: false })
         
      // })
      .catch((error) => {
        alert('Error while uploading'+ error)
        setspinner(false)
          // this.setState({ isLoading: false })
          console.warn(error)
      });

}



const renderlist = ({item}) =>{


  let status='';
  if(item.status == '1'){
    status ='ON HAND'
  }else if(item.status =='2'){
    status ='MANIFEST'
  }else if(item.status =='3'){
    status ='DISPATCHED'
  }else  if(item.status == '4'){
    status ='SHIPPED'
  }else if(item.status == '5'){
    status ='PICKED UP'
  }else if(item.status == '6'){
    status ='ARRIVED'
  }

  return(
    
<TouchableOpacity style={{flexDirection:'row',alignSelf:'center',  width:'100%',height:45}} 
onPress={()=>navigation.navigate('CarDetails',{datapre:item.id,img:item.images, type:'Container',Status:status,  baseImagePath: 'https://customer.afgglobalshipping.com/uploads/',})}

>

<View


style={{width:'58%', paddingVertical:1,paddingHorizontal:2,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>

<View style={{ height:'100%',marginLeft:4, paddingVertical:1, width:'100%'}}>

<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>{item.year} {item.make} {item.model}</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>Lot: {item.lot_number}</Text>
</View>

</View>




</View>

</View>


<View
style={{width:'1%'}}>

</View>


<View

style={{width:'41%', paddingVertical:1,justifyContent:'center', height:'55%',borderRadius:6, backgroundColor:'white'}}>

<Text style={{color:'black', alignSelf:'center',  fontSize:11,}}>{item.vin}</Text>





</View>

</TouchableOpacity>

  
  
  )
  
   }




return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>

<Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />

<Modal
          transparent={true}
          animationType={'none'}
          visible={opener}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              width:deviceWidth,
              justifyContent:'flex-end',
              paddingVertical: 20,
              height:deviceHeight,
              backgroundColor: '#0006',
              flexDirection: 'column',
              alignItems:'baseline',
              paddingHorizontal:15,
            }}>
     {/* <TouchableOpacity
                            onPress={() => openCamera()}

                  style={{
                    borderRadius: 10,
                    width:"100%",
                    marginBottom:5,
                    height:50,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    alignItems:"center",
                    justifyContent:'center',
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                      color: '#1082ff',
                    }}>
                    Open Camera
                  </Text>
                </TouchableOpacity> */}



                <TouchableOpacity
          onPress={() =>  selectFile3()}
          style={{
                    borderRadius: 10,
                    width:"100%",
                    height:50,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    alignItems:"center",
                    justifyContent:'center',
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                      color: '#1082ff',
                    }}>
                    
                    Image Library
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setopener(false) }
                  style={{
                    borderRadius: 10,
                    width:"100%",
                    height:50,
                    alignSelf: 'center',
                    backgroundColor: 'white',
                    alignItems:"center",
                    justifyContent:'center',
                    paddingHorizontal: 4,
                    marginTop:5,
                    
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                      color: 'red',
                    }}>
                    
                    Cancel
                  </Text>
                </TouchableOpacity>
          
          
          </View>
        </Modal>
     


       
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: '#0008',
              paddingVertical: 20,
              flexDirection: 'column',
              alignItems: 'center',
            }}>




            <View
              style={{
                paddingHorizontal: 20,
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                alignContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}>

                  <MaterialIcons name='cancel' size={25} color='red'/>
                {/* <Image
                  style={{width: 30, height: 30}}
                  source={require('../Assets/icons/cancel.png')}
                /> */}
              </TouchableOpacity>
            </View>
            <View style={{paddingVertical: 10,backgroundColor:'white', paddingHorizontal: 5}}>

            <FlatList
                      style={{alignSelf:'center'}}
                         contentInsetAdjustmentBehavior="automatic"
                      data={[...EditImages, { plusImage: true }]}

                     renderItem={renderimageslist}
                    //   keyExtractor={(item,index) => index.toString()}
                      numColumns={4}
                      extraData={EditImages}
                    //   ListFooterComponent={renderFooter}

                
                    keyExtractor={(item, index) => index.toString()}
                    // refreshing={refreshing}
                    // onRefresh={handleRefresh}

                  />

{/* {images1 !== '' ?  */}

{/* <Image
        style={{ width: 300, height: 300, resizeMode: 'contain' }}
        source={{uri : 'file:///data/user/0/com.afgglobalshipping/cache/react-native-image-crop-picker/Screenshot_20210131-191728.png'}} /> */}
      {/* // />: null} */}

                  <View style={{flexDirection:'row',height:50,paddingVertical:5, justifyContent:'center', width:'100%'}}>

                    <TouchableOpacity 
                    onPress={()=>{setEditImages(''),navigation.goBack()}}
                    style={{backgroundColor:'red',justifyContent:'center',borderRadius:20, width:'45%'}}>

                    <Text style={{alignSelf:'center'}}>Cancel</Text>     
                    </TouchableOpacity>
                    <View style={{width:'5%'}}></View>

                    <TouchableOpacity 
                    onPress={()=> callingupdatesimages()}
                    style={{backgroundColor:'lightblue',justifyContent:'center',borderRadius:20,  width:'45%'}}>

                    <Text style={{alignSelf:'center'}}>Update</Text>     
                    </TouchableOpacity>
                  </View>

                 
             
            </View>
          </SafeAreaView>
      








    </SafeAreaView>

  );
};


export default ExportImageEdit;
