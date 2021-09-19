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
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage';


const Notifications = ({route, navigation }) => {
AppConstance.NOTIFICATION = '0'
  const [spinner , setspinner]  = useState(false)

  const [data, setdata] = useState([])


useEffect(() => {
  let mounted = true;
  callingNotificationApi()

  return () => mounted = false;
}, [])

const callingNotificationApi = async () => {

  setspinner(true)

var url = 'https://admin.afgshipping.com/webapi/notification';

    // url = AppUrlCollection.EXPORT_DETAIL + 'exportId=' + datapre ;

    fetch(url , {

    method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'authkey': AppConstance.USER_INFO.USER_TOKEN
      },
  })
      .then((response) => response.json())
      .then((responseJson) => {

        console.warn( 'response',responseJson.data);
          if (responseJson.status == AppConstance.API_SUCESSCODE) {

            let Data = responseJson.data;
            setdata(Data)
            // console.log('i'+data.additional_info);
            // // console.log(Data[0].additional_info);
            setspinner(false)

            // setadditionalinfo(responseJson.data.additional_info)
              // console.log('----'+Data.additional_info.location);
            // if(additionalinfo.location == "1" ){
  //   setloc('LA')
  //   }else if(additionalinfo.location   == '2' ){
  //     setloc('GA')
  //   }else if(additionalinfo.location   == '3'){
  //     setloc('NJ')
  //   }else if(additionalinfo.location   == '4'){
  //     setloc('TX')
  //   }else if(additionalinfo.location   == '5'){
  //     setloc('TX2')
  //   }else if(additionalinfo.location   == '6'){
  //     setloc('NJ2')
  //   }else if(additionalinfo.location   == '7'){
  //     setloc('CA')
  //   }
  //               alert(loc)
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


const renderlist = ({item}) =>{


  const regex = /(<([^>]+)>)/ig;
const result = item.message.replace(regex, '');



  return( <SafeAreaView style={{flexDirection:'row',alignSelf:'center',paddingHorizontal:5, marginTop:5, width:deviceWidth}} >

  <TouchableOpacity
  // onPress={()=>navigation.navigate('Tracking')}
  
  style={{width:'100%', paddingVertical:3,paddingHorizontal:2,borderRadius:6, backgroundColor:'#fbf9e5'}}>
  <View style={{  width:'100%', flexDirection:'column'}}>
  
  <View style={{flexDirection:'row',paddingHorizontal:3, width:'100%'}}>
  
  <View style={{width:'70%'}}>
  <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:10,}}>{item.subject}</Text>
  </View>  
  
  <View style={{width:'30%', }}>
  <Text style={{color:'black',fontWeight:'bold', paddingVertical:2, fontSize:9,}}>{item.created_at}</Text>
  </View>
 

  
  
  
  </View>
  

  
  
  
  
  
  <View style={{flexDirection:'row',paddingRight:8,marginTop:3, width:'100%',}}>
  
  <View style={{width:'95%'}}>
  <Text style={{color:'black',fontWeight:'bold',paddingVertical:2,marginLeft:3, fontSize:10,}}>{result} </Text>
  </View>
  
  
  
  
  
  </View>
  
 
  

  
  
  
  
  </View>
  
  </TouchableOpacity>
  
  
  
  
  
  
  </SafeAreaView>
  
  
  
  )
  
   }




    // const { type, title } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>

<Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />

<View
style={{width:deviceWidth,flexDirection:'row', backgroundColor:'red', paddingHorizontal:13,paddingVertical:5, height:deviceHeight*0.056,}}>
<TouchableOpacity
style={{justifyContent:'center'}}
onPress={()=>navigation.navigate('Dashboard')}

>
<MaterialIcons  name='keyboard-backspace' size={23}/>
</TouchableOpacity>

<Text style={{marginLeft:10, color:'white' , alignSelf:'center'}}>Notifications </Text>
</View>
<View

style={{height:deviceHeight*0.03, backgroundColor:'white',justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center',marginRight:8}}></Text>
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


export default Notifications;
