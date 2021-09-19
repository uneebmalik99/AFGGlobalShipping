import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  TextInput,
  Alert,
  StatusBar,
  Modal,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import CameraRoll from '@react-native-community/cameraroll';
import { SliderBox } from "react-native-image-slider-box";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import { FlatList } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import Snackbar from 'react-native-snackbar';

const TrackingSearchDetails = ({ route,navigation }) => {

  const { datapre , img , exp ,vexp , tow } = route.params;
  const [data , setdata] = useState(datapre)
  const [status, setstatus] = useState('')
  const [loc , setloc] = useState('')
  const [image , setimage] = useState('')
  const [typetitle , settypetitle ] = useState('')
  const [ images , setimages] =useState(img)
  const [towing , settowing] = useState('')
  const[SliderModel , setSliderModel] = useState(false)
  const [spinner , setspinner]  = useState(false)
  const [Export , setExport] = useState([
    {
      "export_date": "2020-11-01",
                        "loading_date": "null",
                        "broker_name": "null",
                        "booking_number": "null",
                        "eta": "",
                        "ar_number": "null",
                        "xtn_number": "null",
                        "seal_number": "null",
                        "container_number": "null",
                        "cutt_off": "",
                        "vessel": "null",
                        "voyage": "null",
                        "terminal": "null",
                        "streamship_line": "null",
                        "destination": "JEBEL null",
                        "itn": "null",
                        "contact_details": "",
                        "special_instruction": "",
                        "container_type": "null",
                        "port_of_loading": "null",
                        "port_of_discharge": "null",
                        "export_invoice": "null",
                        "bol_note": "",
                        "export_is_deleted": "null",
                        "created_by": "null",
                        "updated_by": "null",
                        "created_at": "2021-01-07 15:13:52",
                        "updated_at": "2021-01-07 null:13:52",
                        "legacy_customer_id": "",
                        "added_by_role": "null",
                        "customer_user_id": "null",
                        "notes_status": null,
                        "oti_number": "null"
    }

  ])
  const [towingRequest,  settowingRequest]= useState()






const showSnackbarMessage = () => {
  setTimeout(() => {
    Snackbar.show({
      backgroundColor: '#008B8B',
      title: 'Downloaded Successfully',
      duration: Snackbar.LENGTH_SHORT,
    });
  }, 200);
};

const download = ()=>{
  if(Platform.OS === 'android'){
    checkPermission(img)
  }else{
    handleDownload(img)
  }
}




const downloadallimages = async ()=>{
  if(Platform.OS === 'android'){
    console.warn('working');

    try {

      
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message:
            'App needs access to your storage to download Photos',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
console.warn(images.length);

        // Once user grant the permission start downloading
        console.log('Storage Permission Granted.');
        // downloadImage();
        var i = 0;
        var check = 1; 
        setspinner(true)

      //   for (let index = 0; index < images.length; index++) {
      //     console.warn('working'+index);

      //     const element = images[index].baseurl+images[index].thumbnail;
      //     // images.push(baseImagePath + element.thumbnail)
      //     // console.log('Image vehicle :;;', baseImagePath + element.thumbnail)
      // }
        for( i = 0 ; i <= images.length ; i++){
          let date = new Date();
        let image_URL = 'https://admin.afgshipping.com/uploads/'+images[i].thumbnail;    
        let ext = getExtention(image_URL);
        ext = '.' + ext[0];
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
          fileCache: true,
          addAndroidDownloads: {
            // Related to the Android only
            useDownloadManager: true,
            notification: true,
            path:
              PictureDir +
              '/image_' + 
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              ext,
            description: 'Image',
          },
        };``
        config(options)
          .fetch('GET', image_URL)
          .then(res => {
           check= check+1;
           console.warn('working'+check);
            // Showing alert after successful downloading
            console.log('res -> ', JSON.stringify(res));

            // alert('Image Downloaded Successfully.');
          });
if(check == images.length){
  setspinner(false)
  showSnackbarMessage()


}
        }
        

i = 0;
       




      } else {
        // If permission denied then show alert
        alert('Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      console.warn(err);
    }
  }
  
  // else{
  //   handleDownload()
  //   setspinner(true)
  //   RNFetchBlob.config({
  //     fileCache: true,
  //     appendExt: 'png',
  //   })
  //     .fetch('GET', image)
  //     .then(res => {
        
  //       CameraRoll.saveToCameraRoll(res.data, 'photo')
  //         .then(() => {

  //           showSnackbarMessage()

  //           // Alert.alert(
  //           //   'Save remote Image',
  //           //   'Image Saved Successfully',
  //           //   [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  //           //   {cancelable: false},
  //           // );
  //         })
  //         .catch(err => {
  //           Alert.alert(
  //             'Save remote Image',
  //             'Failed to save Image: ' + err.message,
  //             [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  //             {cancelable: false},
  //           );
  //         })
  //         .finally(() =>  setspinner(false) );
  //     })
  //     .catch(error => {
  //       setspinner(false)
  //       Alert.alert(
  //         'Save remote Image',
  //         'Failed to save Image: ' + error.message,
  //         [{text: 'OK', onPress: () => console.log('OK Pressed')}],
  //         {cancelable: false},
  //       );
  //     });
  // }
}


 const handleDownload = async () => {
    // if device is android you have to ensure you have permission
    // if (Platform.OS === 'android') {
    //   const granted = await getPermissionAndroid();
    //   if (!granted) {
    //     return;
    //   }
    // }
    setspinner(true)
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', image)
      .then(res => {
        
        CameraRoll.saveToCameraRoll(res.data, 'photo')
          .then(() => {

            showSnackbarMessage()

            // Alert.alert(
            //   'Save remote Image',
            //   'Image Saved Successfully',
            //   [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            //   {cancelable: false},
            // );
          })
          .catch(err => {
            Alert.alert(
              'Save remote Image',
              'Failed to save Image: ' + err.message,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          })
          .finally(() =>  setspinner(false) );
      })
      .catch(error => {
        setspinner(false)
        Alert.alert(
          'Save remote Image',
          'Failed to save Image: ' + error.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };


const checkPermission = async () => {
    
  // Function to check the platform
  // If iOS then start downloading
  // If Android then ask for permission

  if (Platform.OS === 'ios') {
    downloadImage();
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message:
            'App needs access to your storage to download Photos',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // Once user grant the permission start downloading
        console.log('Storage Permission Granted.');
        downloadImage();
      } else {
        // If permission denied then show alert
        alert('Storage Permission Not Granted');
      }
    } catch (err) {
      // To handle permission related exception
      console.warn(err);
    }
  }
};


const downloadImage = () => {
  // Main function to download the image
  
  // To add the time suffix in filename
  let date = new Date();
  // Image URL which we want to download
  let image_URL = image;    
  // Getting the extention of the file
  let ext = getExtention(image_URL);
  ext = '.' + ext[0];
  // Get config and fs from RNFetchBlob
  // config: To pass the downloading related options
  // fs: Directory path where we want our image to download
  const { config, fs } = RNFetchBlob;
  let PictureDir = fs.dirs.PictureDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      // Related to the Android only
      useDownloadManager: true,
      notification: true,
      path:
        PictureDir +
        '/image_' + 
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      description: 'Image',
    },
  };
  config(options)
    .fetch('GET', image_URL)
    .then(res => {
      // Showing alert after successful downloading
      console.log('res -> ', JSON.stringify(res));
      showSnackbarMessage()
      // alert('Image Downloaded Successfully.');
    });
};


const getExtention = filename => {
// To get the file extension
return /[.]/.exec(filename) ?
         /[^.]+$/.exec(filename) : undefined;
};



useEffect(() => {
  let mounted = true;

  f1()

  return () => mounted = false;
}, [])

const f1 =() =>{
  
  if(datapre.status == '1'){
    setstatus('ON HAND')
  }else if(datapre.status =='2'){
    setstatus('MANIFEST')

  }else if(datapre.status =='3'){
    setstatus('DISPATCHED')

  }else  if(datapre.status == '4'){
    setstatus('SHIPPED')

  }else if(datapre.status == '5'){
    setstatus('PICKED UP')

  }else if(datapre.status == '6'){
    setstatus('ARRIVED')

  }



  settowing(tow)
  if(tow.title_type == '0'){
    settypetitle('NO TITLE')
  }else if(tow.title_type == '1'){
    settypetitle('EXPORTABLE')
  }else if(tow.title_type  =='2'){
    settypetitle('PENDING')

  }else if(tow.title_type  =='3'){
    settypetitle('BOS')

  }else  if(tow.title_type  == '4'){
    settypetitle('LIEN')

  }else if(tow.title_type  == '5'){
    settypetitle('MV907')

  }else if(tow.title_type  == '6'){
    settypetitle('REJECTED')

  }




  
if(status !== 'ON HAND' && status !== 'DISPATCHED'){


  setExport(exp);
  
 
   setspinner(false)

    }else{
      setspinner(false)
    }

 
  if(datapre.location == '1' ){
    setloc('LA')
  
  }else if(datapre.location == '2' ){
    setloc('GA')
  
  }else if(datapre.location == '3'){
    setloc('NJ')
  
  }else if(datapre.location == '4'){
    setloc('TX')
  
  }
}

const renderlist = ({item}) =>{
  
  return(
    
<TouchableOpacity style={{flexDirection:'row',alignSelf:'center', marginTop:5, paddingHorizontal:2, width:80 ,height:80}}
onPress={()=>{ setimage('https://admin.afgshipping.com/uploads/'+item.thumbnail) ,setSliderModel(true) }}

>
<Image style={{width:'100%',height:'100%',borderRadius:5, resizeMode:'cover'}}  source={{uri: 'https://admin.afgshipping.com/uploads/' + item.thumbnail }} />

</TouchableOpacity>

  
  
  )
  
   }




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.transplant, height: deviceHeight, }}>
<Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />
    <ImageBackground 

    
    style={{flex:1, width:deviceWidth,height:deviceHeight}}
    source={require('../images/AFGbg.jpg')}>




<Modal
          transparent={true}
          visible={SliderModel}
         >
          <SafeAreaView
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'black',
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
                onPress={() =>setSliderModel(false)}>

                  <MaterialIcons name='cancel' size={25} color='red'/>
                {/* <Image
                  style={{width: 30, height: 30}}
                  source={require('../Assets/icons/cancel.png')}
                /> */}
              </TouchableOpacity>
            </View>
            <View style={{paddingVertical: 10,width:'100%',height:'100%', paddingHorizontal: 5}}>

            <Image style={{width:'100%',height:'90%',borderRadius:2, resizeMode:'contain'}}  source={{uri: image }} />
            <View style={{justifyContent:'center'}}>
            <TouchableOpacity style={{marginLeft:15,borderRadius:10, padding:10, borderColor:'red',borderWidth:1, alignSelf:'flex-start'}}
           onPress={()=>  download()     } 

            >
            <Text style={{color:'red' , fontSize:16}}>Download</Text>

            </TouchableOpacity>
           
            </View>
            {/* <SliderBox
                images={images}
                sliderBoxHeight={500}
                dotColor="#FFEE58"
                inactiveDotColor="#90A4AE"
                resizeMethod={'resize'}  
          resizeMode={'contain'}
                
                dotStyle={{
                  width: 13,
                  height: 13,
                  borderRadius: 15,
                  marginHorizontal: -6,
                  padding: 0,
                  margin: 0,
                }}
                // resizeMethod={'resize'}
                // resizeMode={'cover'}
                // autoplay
                circleLoop
                onCurrentImagePressed={(index) =>
                  console.log(`image ${index} pressed`)
                }
              /> */}
            </View>
          </SafeAreaView>
        </Modal>
      



<View
style={{width:deviceWidth,paddingHorizontal:10,paddingVertical:8, height:deviceHeight*0.085,}}>
<TouchableOpacity
onPress={()=> navigation.goBack()}>

<Ionicons  name='chevron-back-outline' size={30}/>
</TouchableOpacity>
</View>

<View style={{ flex: 1,
backgroundColor:"white",
marginBottom: 1}}>

<ScrollView style={{width:deviceWidth, backgroundColor:"white",}}>

<View
style={{height:deviceHeight*0.18,flexDirection:'column', borderBottomWidth:0.3 }}

>
<Text style={{fontWeight:'bold',paddingTop:35,paddingBottom:10, fontSize:20, alignSelf:'center'}}>Tracking Result</Text>
<Text style={{fontWeight:'bold',alignSelf:'center',fontSize:16}}>Lot no: {data.lot_number}</Text>
</View>

<View

style={{height:40,justifyContent:'center', }}>
<Text style={{alignSelf:'center',fontWeight:'bold', fontSize:16}}>Details</Text>




</View>


<View style={{marginTop:10,paddingHorizontal:10, width:deviceWidth,flexDirection:'column'}}>
<View style={{borderColor:'grey',backgroundColor:'#F8F9F9', borderWidth:0.4,paddingVertical:10, borderRadius:20}}>
<View style={{flexDirection:'row',width:'100%',paddingHorizontal:20, paddingVertical:2,justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>Status</Text>
<Text style={{fontSize:14}}>{status}</Text>
</View>



<View style={{flexDirection:'row',width:'100%',paddingVertical:2,paddingHorizontal:20, justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>Year</Text>
<Text style={{fontSize:14}}>{data.year}</Text>
</View>



<View style={{flexDirection:'row',width:'100%',paddingVertical:2,paddingHorizontal:20, justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>Make</Text>
<Text style={{fontSize:14}}>{data.make}</Text>
</View>



<View style={{flexDirection:'row',width:'100%',paddingVertical:2,paddingHorizontal:20, justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>Model</Text>
<Text style={{fontSize:14}}>{data.model}</Text>
</View>



<View style={{flexDirection:'row',paddingVertical:2, width:'100%', paddingHorizontal:20,justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>VIN</Text>
<Text style={{fontSize:14}}>{data.vin}</Text>
</View>



<View style={{flexDirection:'row',paddingVertical:2, width:'100%',paddingHorizontal:20,justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>Lot:</Text>
<Text style={{fontSize:14}}>{data.lot_number}</Text>
</View>



<View style={{flexDirection:'row',paddingVertical:2, width:'100%',paddingHorizontal:20,justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>Ded Date:</Text>
<Text style={{fontSize:14}}>{towing.deliver_date}</Text>
</View>

<View style={{flexDirection:'row',paddingVertical:2, width:'100%',paddingHorizontal:20, justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>Title Status:</Text>
<Text style={{fontSize:14}}>{typetitle}</Text>
</View>

<View style={{flexDirection:'row',paddingVertical:2, width:'100%',paddingHorizontal:20,justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>Container no:</Text>
<Text style={{fontSize:14}}>{data.container_number}</Text>
</View>



<View style={{flexDirection:'row',paddingVertical:2, width:'100%',paddingHorizontal:20,justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>Export Date:</Text>
<Text style={{fontSize:14}}>{Export.export_date}</Text>
</View>

<View style={{flexDirection:'row',paddingVertical:2, width:'100%',paddingHorizontal:20,justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>ETA Date:</Text>
<Text style={{fontSize:14}}>{Export.eta}</Text>
</View>

<View style={{flexDirection:'row',paddingVertical:2, width:'100%',paddingHorizontal:20,justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>Location:</Text>
<Text style={{fontSize:14}}>{loc}</Text>
</View>


<View style={{flexDirection:'row',width:'100%',paddingVertical:2,paddingHorizontal:20,justifyContent:'space-between'}} > 
<Text style={{fontSize:14}}>Destination:</Text>
<Text style={{fontSize:14}}>{Export.destination}</Text>
</View>
</View>

</View>

<View style={{width:deviceWidth,justifyContent:'center', paddingHorizontal:5}}>
<FlatList
                      style={{alignSelf:'center'}}
                         contentInsetAdjustmentBehavior="automatic"
                      data={images}
                     renderItem={renderlist}
                      keyExtractor={(item,index) => index.toString()}
                      numColumns={4}

             
                    // refreshing={refreshing}
                    // onRefresh={handleRefresh}

                  />
</View>
<View style={{height:5, width:deviceWidth}}>

</View>
{/* <View style={{width:deviceWidth,justifyContent:'center',marginTop:5, marginBottom:10, }}>
  <TouchableOpacity style={{alignSelf:'center',padding:10 ,borderColor:'red',borderRadius:10,borderWidth:0.4, }}
  onPress={()=> downloadallimages()}
  >

    <Text style={{fontSize:18, color:'red'}}>Download Vehicles Images</Text>
  </TouchableOpacity>


</View> */}
</ScrollView>

</View>





    </ImageBackground>



        {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};


export default TrackingSearchDetails;
