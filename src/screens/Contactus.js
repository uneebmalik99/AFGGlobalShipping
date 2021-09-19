import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  
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
import Entypo from 'react-native-vector-icons/dist/Entypo'; 
import Ionicons from  'react-native-vector-icons/dist/Ionicons'

const Contactus = ({ navigation }) => {


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppColors.transplant, height: deviceHeight, }}>

    <ImageBackground 

    
    style={{flex:1, width:deviceWidth,height:deviceHeight}}
    source={require('../images/AFGbg.jpg')}>

<View
style={{width:deviceWidth,paddingHorizontal:10,paddingVertical:8, height:deviceHeight*0.085,}}>
<TouchableOpacity
onPress={()=> navigation.goBack()}>

<Ionicons  name='chevron-back-outline' size={30}/>
</TouchableOpacity>
</View>
<View

style={{height:deviceHeight*0.13}}>
<Image style={{ alignSelf:'center',height:'80%', resizeMode:'contain',width:'65%'}} source={require('../images/logo.png')}/>

</View>

<View
style={{width:'100%',marginTop:30,paddingHorizontal:30,  alignSelf:'center', justifyContent:'center', height:180 }}>
<View

style={{width:'100%',paddingHorizontal:10,justifyContent:'center', backgroundColor:'white',borderRadius:5,height:'100%',flexDirection:'column'}}>

<View style={{flexDirection:'row',paddingVertical:10, paddingHorizontal:30,width:'100%', }}>

<Ionicons name='mail' size={25} color='grey'/>
<Text style={{marginLeft:20,fontSize:16}}>info@afgglobalusa.com</Text>

</View>


<View style={{flexDirection:'row' ,paddingVertical:10,paddingHorizontal:30, paddingVertical:5}}>

<MaterialCommunityIcons name='message' size={25} color='grey' />
<Text style={{marginLeft:20,fontSize:16}}>+1 908 405 5910</Text>

</View>


<View style={{flexDirection:'row',paddingVertical:10,paddingHorizontal:30, paddingVertical:5}}>
<Entypo name='dots-three-horizontal' size={25} color='grey'/>
<Text style={{marginLeft:20,fontSize:16}}>AFG Global Shipping 290 NYE AVE, Irvington,NJ 071111</Text>

</View>

</View>

</View>






    </ImageBackground>



        {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};


export default Contactus;
