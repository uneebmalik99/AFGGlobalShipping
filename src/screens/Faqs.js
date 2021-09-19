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

const Faqs = ({ navigation }) => {


  return (
    <SafeAreaView style={{  backgroundColor: AppColors.transplant, height: deviceHeight, }}>

    <ImageBackground 

    
    style={{position:'absolute', width:deviceWidth,height:deviceHeight}}
    source={require('../images/AFGbg.jpg')}/>

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

{/* <View
style={{width:'100%',marginTop:30,paddingHorizontal:30,  alignSelf:'center', justifyContent:'center', height:250 }}> */}
{/* <View

style={{width:'100%',paddingHorizontal:10,justifyContent:'center', backgroundColor:'white',borderRadius:5,height:'100%',flexDirection:'column'}}> */}

<ScrollView   >
<View style={{backgroundColor:'white',marginHorizontal:20, paddingHorizontal:10, paddingVertical:10}}>
<Text>FAQS</Text>

<Text style={{marginTop:5}}>What is the cheapest way to ship a car?
</Text>
<Text style={{marginTop:5}}>Ocean freight Container transport is roughly 50% cheaper than the RoRo. About 90% of all vehicle shipments go by Container shipping from United States, which is actually very safe.</Text>


<Text style={{marginTop:5}}>Can I track the progress of my shipment online?
</Text>
<Text style={{marginTop:5}}> Yes, online tracking is available to you 24 hours a day and is updated regularly. Upon scheduling your shipment, you will receive an email from us that will allow you to track the status of your shipment online. 
</Text>

<Text style={{marginTop:5}}>How do I pay for my auto shipping?</Text>
<Text style={{marginTop:5}}>We accept electronic transfer, postal money order, and bank/certified check for the deposit or full pre-payment of your shipment. If a balance is due upon delivery, it can be paid directly in bank/certified check, or postal money order</Text>



</View>















</ScrollView>







{/* </View> */}

{/* </View> */}









        {/* {this.renderMainContent()} */}
    </SafeAreaView>

  );
};


export default Faqs;
