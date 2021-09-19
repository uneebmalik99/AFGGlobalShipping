import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  ImageBackground,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import LinearGradient from 'react-native-linear-gradient';
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
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';
import DeviceInfo from 'react-native-device-info';
import NetInfo from "@react-native-community/netinfo";



const Signin = ({ navigation }) => {

  // const [email ,setemail] = useState('afrasiar1@gmail.com')
  // const [email ,setemail] = useState('afgglobal786@gmail.com')

  const [email ,setemail] = useState('')

  // const [pass ,setpass] =useState('20002001')
  const [pass ,setpass] =useState('')

  // const [pass ,setpass] =useState('')
  const [deviceId, setDeviceId] =  useState('Click below to get unique Id');
  const [spinner , setspinner] =useState(false)
 
 const  callingLoginApi = () => {


  
    // var uniqueId = DeviceInfo.getUniqueId();
    // // deviceId = uniqueId;
    // console.log('Device id Is '+uniqueId);
setspinner(true)
    if (email.trim().length == 0) {

    alert('username can not be blank'); 
    setspinner(false)

    } else if (pass.trim().length == 0) {
        alert("password can not be blank"); 
        setspinner(false)

    } else {
      // NetInfo.fetch().then(state => {
      //   console.log("Connection type", state.type);
      //   console.log("Is connected?", state.isConnected);
      //   alert(isConnected)
      // });
     
          var token= AppConstance.USER_TOKEN;
          var uniqueId = DeviceInfo.getUniqueId();

    console.warn('deivce id is :::::::::::'+token)
            console.warn("working1")
                // this.setState({ isLoading: true });

            // var url = 'https://customer.afgglobalshipping.com/webapi/login';
                var url = AppUrlCollection.BASE_URL+ 'login';

                var value = new FormData();
                // value.append('username', 'info@impulsiontechnologies.com');
                // value.append('password', '20190021');
                value.append('username',email);
                value.append('password', pass);
                // value.append('token', token);
                value.append('device_id', token);

                console.log('Login_key_vale ',value)
                fetch(url, {
                    method: 'POST',
                    headers: {
                       
                       'Content-Type': 'multipart/form-data',
                    },
                    body: value,
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                      
                      setspinner(false)
                     
                        console.log(responseJson);
                        loginServiceCall(responseJson)
                      
                        // this.setState({ isLoading: false })
                       
                    })
                    .catch((error) => {
                      setspinner(false)
                      alert('Error while login'+ error)
                        // this.setState({ isLoading: false })
                        console.warn(error)
                    });
           



    }
    //  this.props.navigation.navigate('NavigationSideScreen')
}


const loginServiceCall = (responseJson) => {
  console.warn(responseJson)

  if (responseJson.status == AppConstance.API_SUCESSCODE) {

   AppConstance.IS_USER_LOGIN='1';
      // this.props.navigation.push('Dashboard');
      let role1 = '1';
      console.log('-------=='+JSON.stringify(responseJson.data.role));
      //AppConstance.showSnackbarMessage(responseJson.message)
      if(responseJson.data.role.customer){
        AppConstance.USER_ROLE = '1'
        AsyncStorage.setItem('Role','1')
        role1 = '1';
      }else if (responseJson.data.role.super_admin){
        AsyncStorage.setItem('Role','0')

        AppConstance.USER_ROLE = '0'
        role1 = '0';
      }else if (responseJson.data.role.admin){
                AppConstance.USER_ROLE = '0'
                role1 = '0';
      }
      // responseJson.data.role.customer ? AppConstance.USER_ROLE = '1': AppConstance.USER_ROLE = '0'

    callingUserService(responseJson.data.auth_key,role1)
  } else {
      
      alert(responseJson.message);
  }
}

const callingUserService = async (authKey,role) => {
  var url = AppUrlCollection.USER;
  fetch(url, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          
          'authkey': authKey
      },
      // body: value,
  })
      .then((response) => response.json())
      .then((responseJson) => {
        
          console.warn('USER::: ', responseJson)
          AsyncStorage.setItem(AppConstance.USER_ROLE, role)

          AsyncStorage.setItem(AppConstance.USER_INFO_OBJ, JSON.stringify(responseJson.data))
           
          

        //  this._storeData();
        AsyncStorage.setItem('IS_USER_LOGIN1', '1')

        let paid = responseJson.data.invoice.paid_amount;
        let Unpaid = responseJson.data.invoice.total_amount;
        let total = responseJson.data.invoice.balance;


        AsyncStorage.setItem('paid',paid)
        AsyncStorage.setItem('Unpaid',Unpaid)
        AsyncStorage.setItem('total',total)


        AppConstance.PAID = paid;
        AppConstance.UNPAID = Unpaid;
        AppConstance.TOTAL =total; 
          
          let data = responseJson.data
          console.warn('json value', data)
          AppConstance.USER_INFO.USER_ID = data.id;
          AppConstance.USER_INFO.USER_NAME = data.username;
          AppConstance.USER_INFO.USER_TOKEN = data.auth_key;
          AppConstance.USER_INFO.USER_EMAIL = data.email;
          AppConstance.USER_INFO.USER_STATUS = data.status;
          AppConstance.USER_INFO.USER_DELETED = data.is_deleted;
          AppConstance.USER_INFO.USER_ADDRESS1 = data.address_line_1;
          AppConstance.USER_INFO.USER_ADDRESS2 = data.address_line_2;
          AppConstance.USER_INFO.USER_CITY = data.city;
          AppConstance.USER_INFO.USER_STATE = data.state;
          AppConstance.USER_INFO.USER_ZIP_CODE = data.zip_code;
          AppConstance.USER_INFO.USER_MOBILE = data.phone;
          AppConstance.USER_INFO.USER_FAX = data.fax;
          AppConstance.USER_INFO.USER_CUSTOMER_NAME = data.customer_name;
          AppConstance.USER_INFO.USER_IS_BLOCK = data.is_blocked;


AsyncStorage.setItem('k','1')

          navigation.navigate('Dashboard')

          setspinner(false)


          // //this.props.navigation.goBack();
          // this.props.navigation.navigate('NavigationSideScreen')
      })
      .catch((error) => {
          this.setState({ isLoading: false })
          console.warn('user error'+error)
      });
}



useEffect(() => {

  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
  });
  
  // Unsubscribe
  unsubscribe();

  
}, []);   




  return (
    <SafeAreaView style={{  backgroundColor: AppColors.transplant, height: deviceHeight, }}>
 <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />

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
style={{width:'100%',marginTop:10,  height:deviceHeight*0.15, flexDirection:'column'}}>
<Text style={{alignSelf:'center',color:'#e3f2ff',fontSize:18, fontWeight:'bold'}}>Welcome</Text>
<Text style={{alignSelf:'center',color:'#e3f2ff',fontSize:18, fontWeight:'bold'}}>TO</Text>
<Text style={{alignSelf:'center',color:'#e3f2ff',fontSize:18, fontWeight:'bold'}}>AFG GLOBAL SHIPPING</Text>

<Text style={{alignSelf:'center',color:'white',fontSize:14, fontWeight:'bold'}}>www.afgshipping.com</Text>



</View>

<View style={{width:'100%',flexDirection:'column', paddingHorizontal:40}}>

<View
style={{width:'100%',}} >

<TextInput
      style={{ height: 40,width:'100%', paddingHorizontal:25, borderRadius:20, backgroundColor:'white' }}
      // onChangeText={text => onChangeText(text)}
      onChangeText={(text) => {setemail(text) }}
      
      placeholder="Email"
        underlineColorAndroid="transparent"
    />
    </View>

<TextInput
      style={{ height: 40, borderRadius:20,paddingHorizontal:25, marginTop:10, backgroundColor:'white' }}
      onChangeText={(text) =>  setpass(text)}
      placeholder="Password"
      secureTextEntry={true}
      inlineImageLeft='search_icon'
    />



</View>
<View style={{width:'100%',marginTop:15, justifyContent:'center'}}>

<TouchableOpacity
                        onPress={() => callingLoginApi()}

// onPress={()=> {AppConstance.IS_USER_LOGIN='1';navigation.navigate('Dashboard')}}
 style={{width: '45%',alignSelf:'center',
    height: 43,}}>
      <LinearGradient colors={['#43D4FF', '#38ABFD', '#2974FA']} style={{ flex: 1,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 25}}>
        <Text style={{  color: 'white',
    fontSize: 16}}>SIGN IN</Text>
      </LinearGradient>
      </TouchableOpacity>
</View>
<View style={{
justifyContent: 'flex-end',

flex:1,

marginBottom: Platform.OS === 'ios' ? 40 : 70,}}>



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


export default Signin;
