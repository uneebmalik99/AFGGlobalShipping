import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Dimensions,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import RNFetchBlob from 'rn-fetch-blob';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import Spinner from 'react-native-loading-spinner-overlay';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Pdf from 'react-native-pdf';
import Snackbar from 'react-native-snackbar';


 var source = {uri:'',cache:false};

const Prices = ({route, navigation }) => {

  const [spinner , setspinner] =useState(false)
  const [pdf ,setpdf] = useState(false)
  const[source , setsource] =useState({uri:'',cache:true})
  const [data, setdata] = useState([
    

   

  ]
)

const checkPermission = async () => {
setspinner(true)
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
  let image_URL = source.uri;    
  // Getting the extention of the file
  let ext = getExtention(image_URL);
  ext = '.' + ext[0];
  // Get config and fs from RNFetchBlob
  // config: To pass the downloading related options
  // fs: Directory path where we want our image to download
  const { config, fs } = RNFetchBlob;
  // const aPath = Platform.select({ ios: DocumentDir, android: DownloadDir });
  // console.log('aPath', aPath);
  // const date = new Date();
  // const file_name = Math.floor(date.getTime() + date.getSeconds() / 2);
  // const fPath = `${aPath}/${file_name}.pdf`;
  let PictureDir = fs.DocumentDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      // Related to the Android only
      useDownloadManager: true,
      notification: true,
      path:
        PictureDir +
        '/me_' + 
        Math.floor(date.getTime() + date.getSeconds() / 2) +
        ext,
      description: 'PDF',
    },
  };
  config(options)
    .fetch('GET', image_URL)
    .then(res => {
      // Showing alert after successful downloading
      console.log('res -> ', JSON.stringify(res));
      setspinner(false)

      showSnackbarMessage()
      // alert('Image Downloaded Successfully.');
    });
};
const showSnackbarMessage = () => {
  setTimeout(() => {
    setspinner(false),
    Snackbar.show({
      
      backgroundColor: '#008B8B',
      title: 'PDF Downloaded Successfully',
      duration: Snackbar.LENGTH_SHORT,
    });
  }, 300);
};

const getExtention = filename => {
// To get the file extension
return /[.]/.exec(filename) ?
         /[^.]+$/.exec(filename) : undefined;
};


useEffect(() => {
  // Update the document title using the browser API
 // const subscription = props.source.subscribe();
  callingPricingApi()
  // return () => {
  //   // Clean up the subscription
  //   subscription.unsubscribe();
  // };
  
}, []);   
const  callingPricingApi = () => {
  setspinner(true)

    var url = ''
    
    url = AppUrlCollection.PRICING 

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'multipart/form-data',
             'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
            //this.setState({ isLoading: false })
            console.log('Response data price is  :: ', responseJson.data)
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
                if (responseJson.data.length > 0) {
                      setdata(responseJson.data)
                      setspinner(false)
                      console.log('data export is : =-----'+data);

  

  
                    
                }
                else 
                {
                  setdata('')
                  setspinner(false) 
                }
                    
  
                
            } else {
              alert(responseJson.message)
              setspinner(false)
  
               // AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
          setspinner(false)
  
          alert(error)
            console.warn(error)
        });
  
  
      }


const renderlist = ({item}) =>{

  let price = '';
  if(item.pricing_type == '1'){
    price ='Towing Price'
  }else if(item.pricing_type == '2'){
    price ='Ocean Freight Price'
  }else if(item.pricing_type == '3'){
    status ='Bike towing'
  } else{
    price = '';
  }






  let status='';
  if(item.status == '1'){
    status ='Towing Price'
  }else if(item.status =='2'){
    status ='Ocean Freight Price'
  }else if(item.status =='3'){
    status ='Bike towing'
  }

  return(
    
<View style={{flexDirection:'row',alignSelf:'center', marginTop:5, paddingHorizontal:5, width:'100%',height:55}} >

<TouchableOpacity
// onPress={()=>navigation.navigate('CarDetails')}

style={{width:'57%', paddingVertical:3,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>

<View style={{ height:'100%',marginLeft:4,alignSelf:'center', paddingVertical:2, width:'62%'}}>

<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{price}</Text>
<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>{item.month}</Text>


</View>

</View>




</View>

</TouchableOpacity>


<View
style={{width:'1.3%'}}>

</View>


<TouchableOpacity
onPress={()=> { source.uri=item.upload_file; checkPermission() } }

style={{width:'20%', paddingVertical:2,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<MaterialCommunityIcons name='download-circle' style={{alignSelf:'center'}} size={50} />




</View>
</TouchableOpacity>
<View
style={{width:'1.3%'}}>

</View>

<TouchableOpacity
onPress={()=> { source.uri=item.upload_file ; setpdf(true)} }

style={{width:'20%', paddingVertical:2,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<MaterialCommunityIcons name='file-download-outline' style={{alignSelf:'center'}} size={50} />




</View>

</TouchableOpacity>

</View>

  
  
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
          transparent={false}
          visible={pdf}
         >
           <SafeAreaView style={{height:'100%',flex:1,flexDirection:'column', width:deviceWidth}}>
           <TouchableOpacity
           style={{width:50,height:50,justifyContent:'center' ,alignSelf:'flex-end'}}
                onPress={() =>setpdf(false)}>

                  <MaterialIcons name='cancel' size={25} color='red'/>
                {/* <Image
                  style={{width: 30, height: 30}}
                  source={require('../Assets/icons/cancel.png')}
                /> */}
              </TouchableOpacity>
                        <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={{
                      
                      width:'100%',
                      height:"95%",}}/>
                      </SafeAreaView>
        </Modal>
      



<View
style={{width:deviceWidth,flexDirection:'row', backgroundColor:'red', paddingHorizontal:13,paddingVertical:5, height:deviceHeight*0.056,}}>
<TouchableOpacity
style={{justifyContent:'center'}}
onPress={()=>navigation.navigate('Dashboard')}

>
<MaterialIcons  name='keyboard-backspace' color='white' size={20}/>
</TouchableOpacity>
<View style={{justifyContent:'center'}}>
<Text style={{marginLeft:10,color:'white'}}>Ocean Freight and Towing Fee</Text>
</View>

</View>
<View

style={{height:deviceHeight*0.04, backgroundColor:'white',justifyContent:'center'}}>
</View>
<View style={{width:deviceWidth, flex:1, backgroundColor:AppColors.blue}}>


                      
<FlatList
                         contentContainerStyle={{ paddingBottom: 50}}
                         contentInsetAdjustmentBehavior="automatic"
                      data={data}
                     renderItem={renderlist}
                     keyExtractor={(item,index) => index.toString()}
                    
 
                     
 
                  />
</View>
    </SafeAreaView>

  );
};


export default Prices;
