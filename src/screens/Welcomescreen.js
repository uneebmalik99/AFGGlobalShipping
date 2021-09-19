import React,{useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  Linking,
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
import Fontisto from 'react-native-vector-icons/dist/Fontisto';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons'; 
import AsyncStorage from '@react-native-community/async-storage'
import Feather from  'react-native-vector-icons/dist/Feather'
import FontAwesome5 from  'react-native-vector-icons/dist/FontAwesome5'
import FontAwesome from  'react-native-vector-icons/dist/FontAwesome'
import { useState } from 'react/cjs/react.development';




const Welcomescreen = ({ navigation }) => {
  // const { login} = route.params;
  // const [login , setlogin ] = useState(true)
  // const [Login ,setLogin] = useState('')


  useEffect(() => {

    // AsyncStorage.getItem('IS_USER_LOGIN1').
    // then((value) => {
    //   if (value !== null ){

      
    //   setLogin(value)
    //   }
    //   console.warn(login+'--------'+value);
    // })
    // const unsubscribe = navigation.addListener('focus', () => {
    //   // Screen was focused
    //   // Do something

    // });

    
  }, [])

 const sendWhatsApp = () => {
    let msg = '';
    let phoneWithCountryCode = '+1 908-405-5910';

    let mobile = Platform.OS == 'ios' ? phoneWithCountryCode : '+' + phoneWithCountryCode;
    if (mobile) {
        let url = 'whatsapp://send?text=' + msg + '&phone=' + mobile;
        Linking.openURL(url).then((data) => {
          console.log('WhatsApp Opened');
        }).catch(() => {
          alert('Make sure WhatsApp installed on your device');
        });
     
    } else {
      alert('Please insert mobile no');
    }
  }

  return (
    <SafeAreaView style={{  height: deviceHeight, }}>

    <ImageBackground 

    
    style={{flex:1, width:deviceWidth,height:deviceHeight}}
    source={require('../images/AFGbg.jpg')}>

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
style={{width:'100%',marginTop:5,  height:deviceHeight*0.15, flexDirection:'column'}}>
<Text style={{alignSelf:'center',color:'#e3f2ff',fontSize:18, fontWeight:'bold'}}>Welcome</Text>
<Text style={{alignSelf:'center',color:'#e3f2ff',fontSize:18, fontWeight:'bold'}}>TO</Text>
<Text style={{alignSelf:'center',color:'#e3f2ff',fontSize:18, fontWeight:'bold'}}>AFG GLOBAL SHIPPING</Text>

<Text style={{alignSelf:'center',color:'white',fontSize:14, fontWeight:'bold'}}>www.afgshipping.com</Text>


</View>

<View style={{ flex: 1,
justifyContent: 'flex-end',
marginBottom: Platform.OS === 'ios' ? 40 : 70,}}>
<View style={{justifyContent:'flex-start', width:'25%', }}
>
<TouchableOpacity onPress={()=> sendWhatsApp()} 
style={{alignSelf:'center' }}
>
<FontAwesome name='whatsapp' size={45} style={{alignSelf:'flex-start'}} color='#4FCE5D'/>
</TouchableOpacity>

</View>


<View
style={{width:deviceWidth,marginTop:30, paddingHorizontal:15, height:150, flexDirection:'column'}}>



<View style={{flexDirection:'row',alignSelf:'center',  width:'100%',height:'50%'}} >

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
{login === true ? 
<TouchableOpacity
onPress={()=>navigation.navigate('Signin')}
style={{width:'28.5%',height:'100%',borderRadius:15,justifyContent:'center', backgroundColor:'white'}}>

<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<MaterialIcons style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='person-outline' size={25}/>
<Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Login in</Text>

</View>

</TouchableOpacity>
:
<TouchableOpacity
onPress={()=>navigation.navigate('Dashboard')}
style={{width:'28.5%',height:'100%',borderRadius:15,justifyContent:'center', backgroundColor:'white'}}>

<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<MaterialIcons style={{alignSelf:'center',paddingVertical:3}} color={AppColors.purple} name='person-outline' size={25}/>
<Text style={{alignSelf:'center',color:AppColors.purple, fontSize:12}}>Dashboard</Text>

</View>

</TouchableOpacity>
}

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

<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center',  flexDirection:'column'}}>

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


export default Welcomescreen;
