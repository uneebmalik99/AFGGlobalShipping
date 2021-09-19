import React,{useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  TextInput,
  StatusBar,
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
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import FontAwesome5 from  'react-native-vector-icons/dist/FontAwesome5'
import Spinner from 'react-native-loading-spinner-overlay';
import { useSafeArea } from 'react-native-safe-area-context';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';


const Tracking = ({ navigation }) => {

  const[spinner , setspinner ] = useState(false)
  const [search , setsearch] = useState('')

const onChangeText = (Text) =>{

  setsearch(Text)

}
const searchingApi =()=>{

   setspinner(true)
  if(search != ''){


  var url = '';
      url = AppUrlCollection.VEHICLE_CONTAINER + 'search_str=' + search;
  
  
  
      fetch(url , {
      method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'authkey': AppConstance.USER_INFO.USER_TOKEN
        },
    })
        .then((response) => response.json())
        .then((responseJson) => {
  
          console.warn( 'response');
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
              console.warn('response of trackinh seach is :::::::::::'+responseJson.data.vehicleList);
              let data = responseJson.data.vehicleList[0];


              if(data != null){
                if(data.status !== '1' && data.status !== '3'){
                  let vexp =responseJson.data.vehicleList[0].vehicleExport;
                  let exp =responseJson.data.vehicleList[0].vehicleExport.export;
                  let img =responseJson.data.vehicleList[0].images;
                  let towing = responseJson.data.vehicleList[0].towingRequest;

                  navigation.navigate('TrackingSearchDetails',{datapre : data, img:img , exp:exp,tow:towing, vexp,vexp})
                  setspinner(false)


                }else{
                  let img =responseJson.data.vehicleList[0].images;
                  let towing = responseJson.data.vehicleList[0].towingRequest;

                  navigation.navigate('TrackingSearchDetails',{datapre : data, img:img ,tow:towing, exp:'0', vexp:'0'})
                  setspinner(false)


                }

          
                // alert(exports)

              }else{
                alert('No Data Found')
                setspinner(false)

              }
               
              // navigation.navigate('TrackingSearchDetails',{})
                //this.setState({ noMoreDataFound: false })
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
      else{
        alert('Please enter lot number ')
        setspinner(false)
      }




}

  return (
    <SafeAreaView style={{  backgroundColor: AppColors.transplant, height: deviceHeight, }}>

    <ImageBackground 

    
    style={{flex:1, width:deviceWidth,height:deviceHeight}}
    source={require('../images/AFGbg.jpg')}>
 <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />

<View
style={{width:deviceWidth,paddingHorizontal:10,paddingVertical:8, height:deviceHeight*0.085,}}>
<TouchableOpacity
onPress={()=> navigation.navigate('DrawerWithoutlogin')}>

<Icon  name='menu' size={30}/>
</TouchableOpacity>
</View>
<View

style={{height:deviceHeight*0.13}}>
<Image style={{ alignSelf:'center',height:'80%', resizeMode:'contain',width:'65%'}} source={require('../images/logo.png')}/>

</View>

<View
style={{width:'100%',marginTop:10,  height:deviceHeight*0.15, flexDirection:'column'}}>
<Text style={{alignSelf:'center',color:'#e3f2ff',fontSize:18, fontWeight:'bold'}}>Welcome</Text>
<Text style={{alignSelf:'center',color:'#e3f2ff',fontSize:18, fontWeight:'bold'}}>TO</Text>
<Text style={{alignSelf:'center',color:'#e3f2ff',fontSize:18, fontWeight:'bold'}}>AFG GLOBAL SHIPPING</Text>

<Text style={{alignSelf:'center',color:'white',fontSize:14, fontWeight:'bold'}}>www.afgshipping.com</Text>



</View>

<View style={{width:'100%',flexDirection:'column',marginTop:15, height:70, paddingHorizontal:40}}>

<View
style={{width:'100%',height:40,marginVertical:10,backgroundColor:'white',justifyContent:'center', borderRadius:20,paddingHorizontal:10, flexDirection:'row'}} >
<View style={{width:'7%',  height:'100%', justifyContent:'center'}}>


<AntDesign style={{alignSelf:'center',}} size={20} color='grey' name='lock'/>

</View>

<TextInput
      style={{ height: 39, paddingVertical:2, width:'86%', paddingHorizontal:35,alignSelf:"center",  backgroundColor:'white' }}
      onChangeText={text => onChangeText(text)}
      placeholder="Enter VIN or LOT No."
      placeholderTextColor='grey'
        underlineColorAndroid="transparent"
    />

<TouchableOpacity style={{width:'7%',justifyContent:'center', }}
onPress={()=> searchingApi()}
>
{/* navigation.navigate('TrackingSearchDetails') */}
    <Feather style={{alignSelf:'center',}} size={20} color='grey'  name='search'/>
</TouchableOpacity>

    </View>

    </View>

<View style={{ 
 
justifyContent: 'flex-end',
flex:1,
marginBottom: Platform.OS === 'ios' ? 40 : 70,}}>



<View
style={{width:deviceWidth, paddingHorizontal:15, height:150, flexDirection:'column'}}>



<View style={{flexDirection:'row',alignSelf:'center', width:'100%',height:'50%'}} >

<TouchableOpacity
onPress={()=>navigation.navigate('Tracking')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>
<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<AntDesign style={{alignSelf:'center',paddingVertical:3 }} color={AppColors.purple} name='setting' size={23}/>
<Text style={{alignSelf:'center',color:AppColors.purple,fontSize:12}}>Tracking</Text>

</View>

</TouchableOpacity>
<View
style={{width:'7.2%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('Contactus')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>


<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Feather style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='home' size={23}/>
<Text style={{alignSelf:'center',color:AppColors.purple,fontSize:12}}>Contact Us</Text>

</View>
</TouchableOpacity>
<View
style={{width:'7.2%'}}>

</View>

<TouchableOpacity
onPress={()=>navigation.navigate('Signin')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>

<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<MaterialIcons style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='person-outline' size={25}/>
<Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Login in</Text>

</View>

</TouchableOpacity>

</View>

<View style={{flexDirection:'row',marginTop:15, width:'100%',height:'50%'}} >

<TouchableOpacity
onPress={()=>navigation.navigate('Towing')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>

<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<MaterialCommunityIcons style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='tow-truck' size={24}/>
<Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Towing</Text>

</View>

</TouchableOpacity>
<View
style={{width:'7.2%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('Shipping')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>

<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Fontisto style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='ship' size={24}/>
<Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Shipping</Text>

</View>

</TouchableOpacity>
<View
style={{width:'7.2%'}}>

</View>

<TouchableOpacity
onPress={()=>navigation.navigate('Warehousing')}

style={{width:'28.5%',height:'100%',borderRadius:15, backgroundColor:'white'}}>

<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<FontAwesome5 style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='warehouse' size={23}/>
<Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Warehousing</Text>

</View>

</TouchableOpacity>

</View>



</View>





</View>





    </ImageBackground>



        {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};


export default Tracking;
