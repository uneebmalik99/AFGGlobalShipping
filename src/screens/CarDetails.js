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
  StatusBar,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  Dimensions,
  Platform
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
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Pdf from 'react-native-pdf';
import { TextInput } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import { FA5Style } from 'react-native-vector-icons/dist/lib/create-icon-set-from-fontawesome5';
// import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';

import fileBase641 from './fileBase64';
import ShareImages from 'react-native-files-share';

var baseImagePath = '';
let settitle = '';
let v = 1;
const images1 = [

  "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?girl",
        "https://source.unsplash.com/1024x768/?tree",
    
    
];
const CarDetails = ({route, navigation }) => {


  const { type  , datapre , Status } = route.params;

  // useState // 
  const [vehicleDetails , setvehicleDetails] = useState([ ])
  const [pdf ,setpdf] = useState(false)
  const[source , setsource] =useState({uri:'',cache:true})
  const [imgpos, setimgpos] = useState(0)
  const[ img , setimg] = useState([])
  const[updatebtnv ,setupdatebtnv ] = useState(false)
  const [images , setimages] = useState([])
  const[newkey1 , setnewkey1] = useState(false);
  const [titlemodal ,settitlemodal ] = useState(false);
  const [notemodal , setnotemodal] = useState('');
  const[newtitle , setnewtitle] = useState('')
  const [loc , setloc] = useState('')
  const [oldnote , setoldnote] = useState('')
  const [keymodal, setkeymodal]= useState(false)
  const [newkey , setnewkey] = useState('')
  const [size ,setsize] = useState('')
  const [newnote , setnewnote]= useState('');
  const[note , setnote] = useState('')
  // const [title ,settitle] = useState('')
  const [towingRequest ,settowingRequest] =useState([''])
  const [vehicleexport ,setvehicleexport] =useState([])
  const[spinner , setspinner ] = useState(false)
  const[SliderModel , setSliderModel] = useState(false)
  const [width, setwidth] =useState('100%')
  const [currentimg, setcurrentimg] = useState('')
const [Export, setExport] = useState(false)
const [data, setdata] = useState([])
const [status, setstatus] = useState(Status)
const [Exportvisible , setExportvisible] = useState(true)
const [titlenew ,settitlenew] = useState('')





///////////////////////// Mehtods ////////////////////////////////////////////////////////////////////////////////////////// 

  const showSnackbarMessage = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#008B8B',
        title: 'Downloaded Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 200);
  };


  const showSnackbarMessageRUT = () => {
    setTimeout(() => {
      Snackbar.show({
        backgroundColor: '#008B8B',
        title: 'Recored Updated Successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    }, 400);
  };


const download = (img)=>{
  if(Platform.OS === 'android'){
    checkPermission(img)
  }else{
    handleDownload(img)
  }
``}


 const handleDownload = async (img) => {
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
      .fetch('GET', img)
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
        this.setState({saving: false});
        Alert.alert(
          'Save remote Image',
          'Failed to save Image: ' + error.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
};


const updatefunction =()=>{

  var urleditdata = '';
  
  let newtitle = '';
  if(settitle == 'EXPORTABLE'){
    
    newtitle='1'

  }else if(settitle == 'PENDING'){
    newtitle='2'
      
  } else if(settitle == 'BOS'){
    newtitle='3'
      
  } else if(settitle == 'LIEN'){
    newtitle='4'
      
  } else if(settitle == 'MV907'){
    newtitle ='5'
      
  }


  if(newkey == 'Yes'){
    setnewkey1('1')

  }else{
    setnewkey1('0')
  }

  

  urleditdata = 'http://admin.afgshipping.com/webapi/vehicle/editvehicledetails?'+ 'vehicleId=' + datapre + '&keys='+newkey1 + '&note=' + oldnote+ '&title_type='+ newtitle;
   fetch(urleditdata , {

  method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'authkey': AppConstance.USER_INFO.USER_TOKEN
    },
})
    .then((response) => response.json())
    .then((responseJson) => {

      console.warn( 'response',responseJson);

      if(responseJson.data == 'records updated'){
        showSnackbarMessageRUT()

      }
      //   if (responseJson.status == AppConstance.API_SUCESSCODE) {
      // setspinner(false)
      // console.warn('export data is '+ responseJson.data.export);
      // setspinner(false)

      // } else {
          
      //     setspinner(false)
    
      //   }
    })
    .catch((error) => {
      setspinner(false)

      alert(error)
        console.warn(error)
    });
  
}


const checkPermission = async (image) => {
    
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage(image);
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
          downloadImage(image);
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


const downloadImage = (img) => {
    // Main function to download the image
    
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = img;    
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

const onShare = async () => {
// ShareImages.show({
//   images: [''], // list images base64 or pdf base64
//   exclude: [''],
//   isPDF: true | false,
//   title: "" // remove if use default 
// });
    // const shareOptions = {
    //   title: 'Share file',
    //   failOnCancel: false,
    //   message: 'jj',
    // };

    // If you want, you can use a try catch, to parse
    // the share response. If the user cancels, etc.
    // try {
    //   const ShareResponse = await Share.open(shareOptions);
    //   // setResult(JSON.stringify(ShareResponse, null, 2));
    // } catch (error) {
    //   console.log('Error =>', error);
    //   alert(error)
    //   // setResult('error: '.concat(getErrorString(error)));
    // }
  
  try {
    const result = await Share.share({
      message:
        vehicleDetails.year + vehicleDetails.make+ vehicleDetails.model+ '\n'+
        ' VIN: '+ vehicleDetails.vin,
        title :'AFG Shipping',

        
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};

const callingVehicleDetailApi = async () => {
  setspinner(true)
//  console.log('MAIN API :;', AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)
  // fetch(AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId, {
console.log('------------'+img);
var url = '';

    url = AppUrlCollection.VEHICLE_DETAIL +'?id=' +datapre ;

    fetch(url , {

    method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'authkey': AppConstance.USER_INFO.USER_TOKEN
      },
  })
      .then((response) => response.json())
      .then((responseJson) => {

        console.warn( 'response',responseJson);
          if (responseJson.status == AppConstance.API_SUCESSCODE) {
              baseImagePath = responseJson.data.other.vehicle_image;
              let data = responseJson.data.vehicle;
              setvehicleDetails(data)

            
           
            
              if(data.keys == "1"){
                setnewkey('Yes')
              }else if(data.keys == "0"){
                setnewkey('No')
              }else{
                setnewkey('')
              }
             
              images.splice(0,images.length)


              console.log('----0-----'+JSON.stringify(responseJson.data.vehicle.images));
              if (responseJson.data.vehicle.images != undefined ) {
                console.log('----img length---'+images);
                if(images.length < 1){
                setimg(responseJson.data.vehicle.images)
                for (let index = 0; index < responseJson.data.vehicle.images.length; index++) {
                
                    const element = responseJson.data.vehicle.images[index];
                    images.push(baseImagePath + element.thumbnail)
                    console.log('Image vehicle response :;;', baseImagePath + element.thumbnail)
                }
              }
            
              }else{

                for (let index = 0; index < vehicleDetails.images.length; index++) {
                  const element = vehicleDetails.images[index];
                  images.push(baseImagePath + element.thumbnail)
                  console.log('Image vehicle vehicledetails :;; ', baseImagePath + element.thumbnail)
              }
            }
                
              if(data.location == "1" ){
                setloc('LA')
                }else if(data.location == '2' ){
                  setloc('GA')  
                }else if(data.location == '3'){
                  setloc('NJ')
                }else if(data.location == '4'){
                  setloc('TX') 
                }else if(data.location == '5'){
                  setloc('TX2')
                }else if(data.location == '6'){
                  setloc('NJ2')
                }else if(data.location == '7'){
                  setloc('CA')
                }

                if(data.towingRequest.title_type == '0'){
                 settitle ='NO TITLE'
                }else if(data.towingRequest.title_type == '1'){
                  settitle ='EXPORTABLE'
                }else if(data.towingRequest.title_type =='2'){
                  settitle='PENDING'

                }else if(data.towingRequest.title_type =='3'){
                  settitle='BOS'

                }else  if(data.towingRequest.title_type == '4'){
                  settitle='LIEN'

                }else if(data.towingRequest.title_type =='5'){
                  settitle='MV907'

                }else if(data.towingRequest.title_type =='6'){
                  settitle='REJECTED'

                }
console.warn(settitle);
                if(data.towingRequest.note !== ''){
                  setoldnote(data.towingRequest.note)
                }else {
                  setoldnote('')
                }


              console.log('id is :::::::::'+datapre+'------status '+Status);

              let towReq = responseJson.data.vehicle.towingRequest;
              
              settowingRequest(towReq)


              if(Status !== 'ON HAND' && Status !== 'DISPATCHED'){

              let exp ='';
              exp =  responseJson.data.vehicle.vehicleExport.export;
              
            
              if(exp !== ''){
              setvehicleexport(exp)
              }
      
         

                  if(responseJson.data.vehicle.vehicleExport.export.container_type == "1"){
                    setsize('20\'')
                  }else if(responseJson.data.vehicle.vehicleExport.export.container_type == "2"){

                    setsize('45\'')

                  }else if(responseJson.data.vehicle.vehicleExport.export.container_type == "3"){

                    setsize('40\'')

                  }else{
                    setsize("")
                  }

                  
                  // callingexportapi();
                    setspinner(false)
                  // console.warn('vehixlexport is : '+vehicleexport);
              let expid = responseJson.data.vehicle.vehicleExport.export_id;


              callingVehicleExportApi(expid)

              // console.warn('id is'+ expid);

                }else{
                  setspinner(false)
                }

                } else {
            
                   setspinner(false)

             // this.setState({ isLoading: false, isFooterLoading: false })
             // this.setState({ isStopCallingAPI: true, noMoreDataFound: true, })
              // AppConstance.showSnackbarMessage(responseJson.message)
          }
      })
      .catch((error) => {
        setspinner(false)

        alert(error)
          console.warn(error)
      });
}

const callingVehicleExportApi =(export_id) =>{
  var urlexport = '';

  urlexport = AppUrlCollection.EXPORT_DETAIL + 'exportId=' + export_id ;

  fetch(urlexport , {

  method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'authkey': AppConstance.USER_INFO.USER_TOKEN
    },
})
    .then((response) => response.json())
    .then((responseJson) => {

      console.warn( 'response',responseJson);
        if (responseJson.status == AppConstance.API_SUCESSCODE) {
      setspinner(false)
      console.warn('export data is '+ responseJson.data.export);
      let exportdata = responseJson.data.export;
      if (exportdata.vehicle != undefined && exportdata.vehicle != undefined) {
        for (let index = 0; index < exportdata.vehicle.length; index++) {
            const element = exportdata.vehicle[index];
            data.push(element)
            console.log('make is '+element.make);
        }
    console.log('length' + data.length);
    console.log('data is :::::::'+data);

      }
      setspinner(false)

      } else {
          
          setspinner(false)

      
        }
    })
    .catch((error) => {
      setspinner(false)

      alert(error)
        console.warn(error)
    });



}



// /////////////////////////////////////////// UseEffect ////////////////////////////////////////////////////////////////////////////////////////////



useEffect(() => {

  const unsubscribe = navigation.addListener('focus', () => {
    callingVehicleDetailApi()
  });


 
  // const unsubscribe = navigation.addListener('focus', () => {
  //   if(type === 'Containers'){
  //     setExport(true)
  //   } 
  //   callingVehicleDetailApi()
  //   alert('working Unsubscribe ')
  //   // The screen is focused
  //   // Call any action
  // });

  // if(type === 'Containers'){
  //   setExport(true)
  // }

  // callingVehicleDetailApi(true)



  

}, [])

// /////////////////////////////////////////// list Return ////////////////////////////////////////////////////////////////////////////////////////////


const renderlist = ({item}) =>{

  return(
    
<View style={{flexDirection:'row',alignSelf:'center',  width:'100%',height:45}} >

<TouchableOpacity
// onPress={()=>navigation.navigate('CarDetails')}

style={{width:'58%', paddingVertical:1,paddingHorizontal:2,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>

<View style={{ height:'100%',marginLeft:4, paddingVertical:1, width:'100%'}}>

<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>{item.year} {item.make} {item.model}</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>Lot: {item.lot_number}</Text>
</View>

</View>




</View>

</TouchableOpacity>


<View
style={{width:'1%'}}>

</View>


<TouchableOpacity
// onPress={()=>navigation.navigate('CarDetails')}

style={{width:'41%', paddingVertical:2,justifyContent:'center', height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Text style={{color:'black', alignSelf:'center',  fontSize:11,}}>{item.vin}</Text>




</View>

</TouchableOpacity>

</View>

  
  
  )
  
   }


// /////////////////////////////////////////// Main Return ////////////////////////////////////////////////////////////////////////////////////////////


return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
 <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />



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
            <View style={{paddingVertical: 10, paddingHorizontal: 5}}>
              <SliderBox
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
              />
            </View>
          </SafeAreaView>
        </Modal>
      

<Modal
    transparent={true}
    visible={titlemodal}
>
<SafeAreaView style={{height:deviceHeight , width:deviceWidth,backgroundColor:'#0006', justifyContent:'center'}}>

  <View style={{justifyContent:'center',width:'80%', borderRadius:15, flexDirection:'column', padding:20, alignSelf:'center', backgroundColor:'white'}}>
<Text style={{alignSelf:'center', fontSize:16, marginBottom:5}}>Please Select Title</Text>

  <TouchableOpacity 
  
  onPress={()=> { {settitle !== 'EXPORTABLE' ? setupdatebtnv(true):null };settitlemodal(false); settitle='EXPORTABLE';}}
  style={{ marginVertical:10,}}>

  <Text>EXPORTABLE</Text>
</TouchableOpacity>

<TouchableOpacity 
  onPress={()=>{{settitle !== 'PENDING' ? setupdatebtnv(true):null }; settitlemodal(false); settitle='PENDING'}}

style={{ marginVertical:10,}}>

  <Text>PENDING</Text>
</TouchableOpacity>


<TouchableOpacity 
  onPress={()=>{{settitle !== 'BOS' ? setupdatebtnv(true):null };settitlemodal(false);  settitle='BOS'}}

style={{ marginVertical:10,}}>

  <Text>BOS</Text>
</TouchableOpacity>



<TouchableOpacity 
  onPress={()=> {{settitle !== 'LIEN' ? setupdatebtnv(true):null }; settitlemodal(false);settitle='LIEN'}}

style={{ marginVertical:10,}}>

  <Text>LIEN</Text>
</TouchableOpacity>





<TouchableOpacity

onPress={()=> {{settitle !== 'MV907' ? setupdatebtnv(true):null };settitlemodal(false); settitle='MV907'}}
style={{ marginVertical:10,}}>

  <Text>MV907</Text>
</TouchableOpacity>





<TouchableOpacity 
onPress={()=> {settitlemodal(false);}}
style={{width:'45%',backgroundColor:'red',padding:10,borderRadius:20,marginTop:10, alignSelf:'center', justifyContent:'center'}}>
<Text style={{alignSelf:'center',color:'white'}}>Cancel</Text>
</TouchableOpacity>
</View>
</SafeAreaView>


  
</Modal>


<Modal
    transparent={true}
    visible={keymodal}
>
<SafeAreaView style={{height:deviceHeight , width:deviceWidth,backgroundColor:'#0006', justifyContent:'center'}}>

  <View style={{justifyContent:'center',padding:20,borderRadius:20, alignSelf:'center', backgroundColor:'white'}}>
<View style={{marginVertical:10,justifyContent:'center'}}>

  <Text style={{alignSelf:'center'}} >Do You Have Vehicle Keys?</Text>
</View>

<View style={{flexDirection:'row', marginTop:10, width:'100%'}}> 
<TouchableOpacity 
onPress={()=> {setkeymodal(false);{newkey !== 'No' ? setupdatebtnv(true):null} setnewkey('No')}}
style={{width:'45%',backgroundColor:'red',padding:10,borderRadius:20, justifyContent:'center'}}>
<Text style={{alignSelf:'center',color:'white'}}>No</Text>
</TouchableOpacity>
<View style={{width:'10%'}}>

</View>

<TouchableOpacity 

onPress={()=>{setkeymodal(false); {newkey !== 'Yes' ? setupdatebtnv(true):null};setnewkey('Yes')}}
style={{width:'45%',backgroundColor:'green',padding:10,borderRadius:20, justifyContent:'center'}}>
  <Text style={{alignSelf:'center',color:'white'}}>Yes</Text>
</TouchableOpacity>


</View>

</View>
</SafeAreaView>


  
</Modal>


<Modal
    transparent={true}
    visible={notemodal}
>
<SafeAreaView style={{height:deviceHeight , width:deviceWidth,backgroundColor:'#0006', justifyContent:'center'}}>

  <View style={{justifyContent:'center',padding:20,borderRadius:20, alignSelf:'center', backgroundColor:'white'}}>
<TouchableOpacity style={{marginVertical:10,}}>

  <Text>Please Type Note Here</Text>
</TouchableOpacity>

<TextInput  
            multiline={true}
            onChangeText={(text) => {setnewnote(text)}}
            style={{borderRadius:10,borderWidth:0.5, padding:5}}

placeholder={towingRequest.note}
/>

<View style={{flexDirection:'row', marginTop:10, width:'100%'}}> 
<TouchableOpacity 
onPress={()=> {setnotemodal(false);setnewnote('')}}
style={{width:'45%',backgroundColor:'red',padding:10,borderRadius:20, justifyContent:'center'}}>
<Text style={{alignSelf:'center',color:'white'}}>Cancel</Text>
</TouchableOpacity>
<View style={{width:'10%'}}>

</View>

<TouchableOpacity 

onPress={()=>{setnotemodal(false); {newnote !== oldnote ?  setupdatebtnv(true): null};setoldnote(newnote)}}
style={{width:'45%',backgroundColor:'green',padding:10,borderRadius:20, justifyContent:'center'}}>
  <Text style={{alignSelf:'center',color:'white'}}>Save</Text>
</TouchableOpacity>


</View>

</View>
</SafeAreaView>


  
</Modal>


<View
style={{width:deviceWidth,flexDirection:'row', backgroundColor:'red',justifyContent:'space-between', paddingHorizontal:13,paddingVertical:5, height:deviceHeight*0.056,}}>

<View style={{flexDirection:'row'}}>
<TouchableOpacity
style={{justifyContent:'center'}}
onPress={()=>navigation.goBack(null)}

>
<MaterialIcons  name='keyboard-backspace' size={23}/>
</TouchableOpacity>

<Text style={{marginLeft:6,alignSelf:'center'}}>View Vehicle</Text>
</View>
<View style={{alignItems:'flex-end',justifyContent:'center', marginRight:5}}>
<TouchableOpacity
style={{justifyContent:'center'}}
onPress={()=>onShare()}
>
<Entypo style={{alignSelf:'center'}} name='share' size={20}/>
</TouchableOpacity>
</View>
</View>



<ScrollView style={{width:deviceWidth,backgroundColor:AppColors.blue, }}>

<SliderBox 
          images={images}
          sliderBoxHeight={180}
          
          dotColor="#FFEE58"
  inactiveDotColor="#90A4AE"
  dotStyle={{
    width: 10,
    height: 10,
    borderRadius: 15,
    marginHorizontal: -6,
    padding: 0,
    margin: 0
  }}
          resizeMethod={'resize'}  
          resizeMode={'cover'}
  circleLoop
  currentImageEmitter={index => { setimgpos(index); 
   }}

          onCurrentImagePressed={index =>
          //setcurrentimg()
            // console.warn(`image ${index} pressed`)
            setSliderModel(true)
          }
  paginationBoxStyle={{
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignSelf: "center",
  }}
  ImageComponentStyle={{borderRadius: 15, width: '95%', marginTop: 8}}

        />







        <View style={{marginRight:3, width:80,marginTop:-175,alignSelf:'flex-end', height:180,}}>
<TouchableOpacity style={{ alignSelf:'center',}}

onPress={()=>

  download(images[imgpos])
// alert(images1[imgpos])
// {if(Platform.OS ===' android')
// }
// handleDownload(images[imgpos])
}
>
  <MaterialIcons name='cloud-download' size={22} color='yellow'/>
 {/* <Image
                  style={{width: 140, height:30, marginRight:-30}}
                  source={require('../images/dlimage.png')}
                />   */}
                
                {/* <Text style={{fontWeight:'bold',fontSize:16, color:'yellow',}}>Download</Text> */}
</TouchableOpacity>
</View>

<View style={{flexDirection:'column',justifyContent:'center', marginTop:1,paddingHorizontal:10, width:'100%',}} >



<View
style={{width:'100%', marginTop:3,paddingHorizontal:10, height:deviceHeight*0.13,borderWidth:0.5, paddingVertical:3, borderRadius:5, flexDirection:'row', backgroundColor:'white'}} >

<View style={{flexDirection:'column',width:'70%',justifyContent:'center'}}>
<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{vehicleDetails.year != null ? vehicleDetails.year : ''} {vehicleDetails.make} {vehicleDetails.model}</Text>
<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>Lot: {vehicleDetails.lot_number}</Text>
<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{vehicleDetails.vin}</Text>


</View>
<View style={{flexDirection:'column',width:'30%',justifyContent:'center'}}>
<Text style={{color:'grey',paddingVertical:2, fontSize:16,}}>{status}</Text>

<View >

{AppConstance.USER_ROLE == '0' ? 
<TouchableOpacity
style={{backgroundColor:'red', alignSelf:'flex-start', justifyContent:'center',}}
  onPress={()=>{ 
    
    // selectOneFile();
     navigation.push('CarEditimages2',{images:img,vehicleid:datapre,})
  }}

>

<Image  style={{width:30 , height:30 , alignSelf:'flex-start', }}   source={require('../images/Unknown.jpg')} />

{/* <Text>Edit Images</Text> */}

</TouchableOpacity>

: null} 
</View>



</View>
</View>


{/* {type === 'Containers' ? <View
style={{width:'100%', marginTop:5,borderRadius:5,height:deviceHeight*0.075,borderWidth:0.5, paddingHorizontal:30,justifyContent:'space-between', flexDirection:'row', backgroundColor:'white'}} >

<TouchableOpacity
style={{justifyContent:'center',flexDirection:'row'}}
onPress={()=> setExport(true)}
>
<MaterialCommunityIcons name='folder-open-outline' size={25} color='#5b8de2' style={{alignSelf:'center'}} />
    <Text style={{alignSelf:'center',marginLeft:5,color:'#5b8de2', fontSize:16}}>Export</Text>
</TouchableOpacity>
</View>
:<View
style={{width:'100%', marginTop:5,borderRadius:5,height:deviceHeight*0.075,borderWidth:0.5, paddingHorizontal:30,justifyContent:'space-between', flexDirection:'row', backgroundColor:'white'}} >

<TouchableOpacity
style={{justifyContent:'center',flexDirection:'row'}}
onPress={()=> setExport(false)}
>
<MaterialCommunityIcons name='folder-open-outline' color='#5b8de2' size={25} style={{alignSelf:'center'}} />

    <Text style={{alignSelf:'center',marginLeft:5,color:'#5b8de2', fontSize:16}} >Details</Text>
    </TouchableOpacity>

    {status != 'ON HAND' || status != 'DISPATCHED' ?<TouchableOpacity
style={{justifyContent:'center',flexDirection:'row'}}
onPress={()=> setExport(true)}
>
<MaterialCommunityIcons name='folder-open-outline' size={25} color='#5b8de2' style={{alignSelf:'center'}} />
    <Text style={{alignSelf:'center',marginLeft:5,color:'#5b8de2', fontSize:16}}>Export</Text>
</TouchableOpacity>:<Text>HI</Text>}



</View>
} */}



{/* <View
style={{width:'100%', marginTop:5,borderRadius:5,height:deviceHeight*0.075,borderWidth:0.5, paddingHorizontal:30,justifyContent:'space-between', flexDirection:'row', backgroundColor:'white'}} >
{type === 'Containers' ? 
<TouchableOpacity
style={{justifyContent:'center',flexDirection:'row'}}
onPress={()=> setExport(true)}
>
<MaterialCommunityIcons name='folder-open-outline' size={25} color='#5b8de2' style={{alignSelf:'center'}} />
    <Text style={{alignSelf:'center',marginLeft:5,color:'#5b8de2', fontSize:16}}>Export</Text>
</TouchableOpacity>}
</View> */}


<View
style={{width:'100%', marginTop:5,borderRadius:5,height:deviceHeight*0.075,borderWidth:0.5, paddingHorizontal:30,justifyContent:'space-between', flexDirection:'row', backgroundColor:'white'}} >

{type !== 'Containers' ? <TouchableOpacity
style={{justifyContent:'center',flexDirection:'row'}}
onPress={()=> setExport(false)}
>
<MaterialCommunityIcons name='folder-open-outline' color='#5b8de2' size={25} style={{alignSelf:'center'}} />

    <Text style={{alignSelf:'center',marginLeft:5,color:'#5b8de2', fontSize:16}} >Details</Text>
    </TouchableOpacity> : null}




    {status != 'DISPATCHED' && status != 'ON HAND' ?<TouchableOpacity
style={{justifyContent:'center',flexDirection:'row'}}
onPress={()=> setExport(true)}
>
<MaterialCommunityIcons name='folder-open-outline' size={25} color='#5b8de2' style={{alignSelf:'center'}} />
    <Text style={{alignSelf:'center',marginLeft:5,color:'#5b8de2', fontSize:16}}>Export</Text>
</TouchableOpacity>:null}


</View>






{Export === true ? 
  <View
style={{width:'100%', marginTop:5,paddingVertical:10,borderWidth:0.5, borderRadius:10,marginBottom:10, paddingHorizontal:30, flexDirection:'column', backgroundColor:'white'}} >

<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>Point of loading</Text>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>{vehicleexport.port_of_loading}</Text>
</View>



<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>Point of Discharge</Text>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>{vehicleexport.port_of_discharge}</Text>
</View>


<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>Container no</Text>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>{vehicleexport.container_number}</Text>
</View>



<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>Booking no</Text>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>{vehicleexport.booking_number}</Text>
</View>




<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>AR number</Text>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>{vehicleexport.ar_number}</Text>
</View>




<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>Size</Text>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>{size}</Text>
</View>


<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>ETA</Text>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>{vehicleexport.eta}</Text>
</View>







{/* <FlatList
                         contentContainerStyle={{ paddingBottom: 50}}
                         contentInsetAdjustmentBehavior="automatic"
                      data={data}
                      extraData={data}
                     renderItem={renderlist}
                     keyExtractor={(item,index) => index.toString()}
                    
 
                     
 
                  /> */}




<TouchableOpacity

onPress={()=>
  // alert(images1[imgpos])
  download('https://customer.afgglobalshipping.com/uploads/'+vehicleexport.export_invoice)
  
  }
  
  >

<Text style={{fontWeight:'bold',marginRight:-15, textAlign:'right'}}>Download Invoice</Text>

</TouchableOpacity>


</View>
:
<View
style={{width:'100%', marginTop:5,paddingVertical:10,borderWidth:0.5,marginBottom:10, borderRadius:10, paddingHorizontal:30, flexDirection:'column', backgroundColor:'white'}} >

<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'45%', color:'black',fontSize:15}}>Description</Text>
<Text style={{textAlign:'left',width:'55%', color:'black',fontSize:15}}>{vehicleDetails.year ? vehicleDetails.year : ''} {vehicleDetails.make} {vehicleDetails.model}</Text>
</View>


<View style={{flexDirection:'row',paddingVertical:5,width:'100%', }}>
<Text style={{textAlign:'left',width:'45%', color:'black',fontSize:15}}>VIN</Text>
<Text style={{textAlign:'left',width:'55%',color:'black',fontSize:15}}>{vehicleDetails.vin}</Text>
</View>



<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'45%', color:'black',fontSize:15}}>Lot</Text>
<Text style={{textAlign:'left',width:'55%', color:'black',fontSize:15}}>{vehicleDetails.lot_number}</Text>
</View>




<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'45%', color:'black',fontSize:15}}>City</Text>
<Text style={{textAlign:'left',width:'55%', color:'black',fontSize:15}}>{loc}</Text>
</View>




<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'45%', color:'black',fontSize:15}}>Buyer number</Text>
<Text style={{textAlign:'left',width:'55%', color:'black',fontSize:15}}>{vehicleDetails.license_number}</Text>
</View>


<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'45%', color:'black',fontSize:15}}>Tow Date</Text>
<Text style={{textAlign:'left',width:'55%', color:'black',fontSize:15}}>{towingRequest.towing_request_date}</Text>
</View>


<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'45%', color:'black',fontSize:15}}>Del Date</Text>
<Text style={{textAlign:'left',width:'55%', color:'black',fontSize:15}}>{towingRequest.deliver_date}</Text>
</View>
{/* <RNPickerSelect
            onValueChange={(value) => console.log(value)}
            pickerProps={{
              accessibilityLabel: title,
          }}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
            value={title}
        /> */}




{/* <ModalDropdown options={['option 1', 'option 2']}/> */}

<View style={{flexDirection:'row', paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'45%', color:'black',fontSize:15}}>Title</Text>


{/* <DropDownPicker
    // items={[
    //     {label: 'USA', value: 'usa', icon: () => <Icon name="flag" size={18} color="#900" />, hidden: true},
    //     {label: 'UK', value: 'uk', icon: () => <Icon name="flag" size={18} color="#900" />},
    //     {label: 'France', value: 'france', icon: () => <Icon name="flag" size={18} color="#900" />},
    // ]}
    defaultValue={title}
    containerStyle={{height: 40}}
    style={{backgroundColor: '#fafafa'}}
    itemStyle={{
        justifyContent: 'flex-start'
    }}
    dropDownStyle={{backgroundColor: '#fafafa'}}
    // onChangeItem={item => settitle(item.value)
    // }
/> */}



<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>{settitle}</Text>

{AppConstance.USER_ROLE == '0' ?

<TouchableOpacity  onPress={()=>  settitlemodal(true) }>
  <MaterialIcons  name='edit' size={20} color='grey' />
</TouchableOpacity>
:null}
</View>

<View style={{flexDirection:'row',paddingVertical:5,}}>
<Text style={{textAlign:'left',width:'45%', color:'black',fontSize:15}}>Keys</Text>
<Text style={{textAlign:'left',width:'50%', color:'black',fontSize:15}}>{newkey}</Text>
{AppConstance.USER_ROLE == '0' ?

<TouchableOpacity  onPress={()=> setkeymodal(true)}>
  <MaterialIcons  name='edit' size={20} color='grey' />
</TouchableOpacity>
:null}
</View>

<View style={{flexDirection:'row',paddingVertical:5,}}>
  
<Text style={{textAlign:'left',width:'45%', color:'black',fontSize:15}}>Note</Text>

 <Text style={{textAlign:'left',width:'50%', color:'black',  fontSize:15}}>{oldnote}</Text>

 {AppConstance.USER_ROLE == '0' ?
<TouchableOpacity  onPress={()=> {setnotemodal(true);setnewnote('')}}>
  <MaterialIcons  name='edit' size={20} color='grey' />
</TouchableOpacity>
: null}
</View>



{updatebtnv === true ?  
<TouchableOpacity 
  onPress={()=> updatefunction()}
  style={{backgroundColor:'white',marginTop:10, borderRadius:20,borderWidth:1,justifyContent:'center', width:'100%', marginHorizontal:5}}>
  <Text style={{padding:10,alignSelf:'center', color:'grey'}}>Update</Text>

</TouchableOpacity>
:null }







</View>


 }












</View>

</ScrollView>








    </SafeAreaView>

  );
};


export default CarDetails;
