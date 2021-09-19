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
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Fontisto from  'react-native-vector-icons/dist/Fontisto'
import FontAwesome5 from  'react-native-vector-icons/dist/FontAwesome5'
import AntDesign from  'react-native-vector-icons/dist/AntDesign'
import AsyncStorage from '@react-native-community/async-storage'






const Drawer = ({route, navigation }) => {






  return (
    <SafeAreaView style={{ flex: 1,paddingHorizontal:10,width:deviceWidth, backgroundColor: AppColors.blue, height: deviceHeight, }}>




<View style={{flexDirection:'column',backgroundColor:'white', borderRadius:10, alignSelf:'center', marginTop:2, width:'100%',height:deviceHeight}} >


<View style={{width:'100%' ,borderBottomWidth:1,paddingBottom:10, borderBottomColor:'grey', flexDirection:'row', marginVertical:10, height:deviceHeight*0.09,backgroundColor:'white'}}> 
<TouchableOpacity
onPress={()=>navigation.goBack()}
style={{marginLeft:10, alignSelf:'center'}}
>
<Icon  name='menu' color='grey' size={27}/>
</TouchableOpacity>

<Image style={{width:40,marginLeft:15, height:40,alignSelf:'center', resizeMode:'cover', borderRadius:400/1}} source={require('../images/AFGLogofinal.jpg')}/>

<Text style={{alignSelf:'center',fontWeight:'bold', marginLeft:15}} >AFG GLOBAL SHIPPING</Text>


</View>

<View>

<View  style={{width:'100%',height:deviceHeight*0.08, flexDirection:'row'}}> 
<TouchableOpacity
onPress={()=>navigation.navigate('FindVehcileCarlist',{    type: 'Containers',
            otherParam: 'anything you want here',})}
style={{width:'100%',flexDirection:'row'}}

>
<View style={{width:'13%',}}></View>
<View style={{width:'16%',height:'100%', justifyContent:'center', }}>
<SimpleLineIcons style={{alignSelf:'center',marginLeft:25}} size={20} name='grid' color='grey'/>
</View>
<View style={{width:'30%',justifyContent:'center'}}>
    <Text style={{marginLeft:15,}} >Find Vehicle</Text>
    </View>
</TouchableOpacity>
</View>

<View  style={{width:'100%',height:deviceHeight*0.08, flexDirection:'row'}}> 

<TouchableOpacity 
onPress={()=>navigation.navigate('ContainerCarlist',{    type: 'Export',
            otherParam: 'anything you want here',})}
style={{width:'100%',flexDirection:'row'}}
>
<View style={{width:'13%',}}></View>
<View style={{width:'16%',height:'100%', justifyContent:'center', }}>
<Entypo style={{alignSelf:'center',marginLeft:25}} name='sound-mix' size={25} color='grey'/>
</View>
<View style={{width:'35%',justifyContent:'center'}}>
    <Text style={{marginLeft:15,}} >Find Container</Text>
    </View>
</TouchableOpacity>
</View>







<View  style={{width:'100%',height:deviceHeight*0.08, flexDirection:'row'}}> 

<TouchableOpacity 
onPress={()=>navigation.navigate('Exportlist',{    type: 'Export',
            otherParam: 'anything you want here',})}
style={{width:'100%',flexDirection:'row'}}
>
<View style={{width:'13%',}}></View>
<View style={{width:'16%',height:'100%', justifyContent:'center', }}>
<Entypo style={{alignSelf:'center',marginLeft:25}} name='sound-mix' size={25} color='grey'/>
</View>
<View style={{width:'30%',justifyContent:'center'}}>
    <Text style={{marginLeft:15,}} >Export</Text>
    </View>
</TouchableOpacity>
</View>











<View  style={{width:'100%',height:deviceHeight*0.08, flexDirection:'row'}}> 
<TouchableOpacity 
onPress={()=>navigation.navigate('Accounts',{    type: 'Containers',
            otherParam: 'anything you want here',})}
style={{width:'100%',flexDirection:'row'}}
>
<View style={{width:'13%',}}></View>
<View style={{width:'16%',height:'100%', justifyContent:'center', }}>
<Ionicons style={{alignSelf:'center',marginLeft:25}} size={25} name='md-people-outline' color='grey'/>
</View>
<View style={{width:'30%',justifyContent:'center'}}>
    <Text style={{marginLeft:15,}} >Accounts</Text>
    </View>
</TouchableOpacity>
</View>



<View  style={{width:'100%',height:deviceHeight*0.08, flexDirection:'row'}}> 
<TouchableOpacity 

onPress={()=>navigation.navigate('Prices',{    type: 'Containers',
            otherParam: 'anything you want here',})}
style={{width:'100%',flexDirection:'row'}}
>
<View style={{width:'13%',}}></View>
<View style={{width:'16%',height:'100%', justifyContent:'center', }}>
<FontAwesome5 style={{alignSelf:'center',marginLeft:25}} size={19} name='money-check' color='grey'/>
</View>
<View style={{width:'30%',justifyContent:'center'}}>
    <Text style={{marginLeft:15,}} >Prices</Text>
    </View>
</TouchableOpacity>
</View>




 
<View  style={{width:'100%',height:deviceHeight*0.08, flexDirection:'row'}}> 
<TouchableOpacity 
onPress={()=>navigation.navigate('Notifications',{    type: 'Containers',
            otherParam: 'anything you want here',})}
style={{width:'100%',flexDirection:'row'}}
>
<View style={{width:'13%',}}></View>
<View style={{width:'16%',height:'100%', justifyContent:'center', }}>
<AntDesign style={{alignSelf:'center',marginLeft:25}} size={22} name='message1' color='grey'/>
</View>
<View style={{width:'30%',justifyContent:'center'}}>
    <Text style={{marginLeft:15,}} >Notification</Text>
    </View>
</TouchableOpacity>
</View>


<View  style={{width:'100%',height:deviceHeight*0.08, flexDirection:'row'}}> 
<TouchableOpacity 
onPress={()=>navigation.navigate('Setting',{    type: 'Containers',
            otherParam: 'anything you want here',})}
style={{width:'100%',flexDirection:'row'}}
>
<View style={{width:'13%',}}></View>
<View style={{width:'16%',height:'100%', justifyContent:'center', }}>
<Ionicons style={{alignSelf:'center',marginLeft:25}} size={23} name='people-outline' color='grey'/>
</View>
<View style={{width:'30%',justifyContent:'center'}}>
    <Text style={{marginLeft:15,}} >Setting</Text>
    </View>
</TouchableOpacity>
</View>




<View  style={{width:'100%',height:deviceHeight*0.08, flexDirection:'row'}}> 
<TouchableOpacity
onPress={()=>navigation.navigate('Tracking')}
style={{width:'100%',flexDirection:'row'}}
>
<View style={{width:'13%',}}></View>
<View style={{width:'16%',height:'100%', justifyContent:'center', }}>
<Fontisto style={{alignSelf:'center',marginLeft:25}} size={20} name='date' color='grey'/>
</View>
<View style={{width:'30%',justifyContent:'center'}}>
    <Text style={{marginLeft:15,}} >Auto Tracking</Text>
    </View>
</TouchableOpacity>
</View>








<View  style={{width:'100%', height:deviceHeight*0.08, flexDirection:'row'}}> 
<TouchableOpacity
onPress={()=>{navigation.navigate('Welcome',{login:'0'}); 
AsyncStorage.setItem('IS_USER_LOGIN1', '0');
AppConstance.IS_USER_LOGIN = '0';
AsyncStorage.setItem('Role','1')
AppConstance.USER_ROLE = '';
// AsyncStorage.setItem(AppConstance.USER_ROLE,'1');
AsyncStorage.removeItem(AppConstance.USER_INFO_OBJ);}}
style={{width:'100%',flexDirection:'row'}}
>
<View style={{width:'13%',}}></View>
<View style={{width:'16%',height:'100%', justifyContent:'center', }}>
<SimpleLineIcons style={{alignSelf:'center',marginLeft:25}} size={20} name='logout' color='grey'/>
</View>
<View style={{width:'30%',justifyContent:'center'}}>
    <Text style={{marginLeft:15,}} >Logout</Text>
    </View>
</TouchableOpacity>
</View>



</View>
</View>


    </SafeAreaView>

  );
};


export default Drawer;






