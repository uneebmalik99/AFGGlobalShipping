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
  Dimensions,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const alerts = ({route, navigation }) => {


  const [data, setdata] = useState([
   
  ]
)
const[del , setdel] = useState('')
const [loc , setloc] = useState('')
  const [additionalinfo ,setadditionalinfo ] =useState([])
const[spinner , setspinner ] = useState(false)
const[yesno ,setyesno] = useState(false)

const callingExportDetailApi = async () => {

  setspinner(true)

var url = 'https://admin.afgshipping.com/webapi/notification/getalerts';

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
            console.log('i'+data.additional_info);
            // console.log(Data[0].additional_info);
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

const callingdeletealertApi = async () => {

  setspinner(true)

var url = 'https://admin.afgshipping.com/webapi/notification/delete?id='+del;

    // url = AppUrlCollection.EXPORT_DETAIL + 'exportId=' + datapre ;

    fetch(url , {

    method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          'authkey': AppConstance.USER_INFO.USER_TOKEN
      },
  })
      .then((response) => response.json())
      .then((responseJson) => {

        console.warn( 'response',responseJson.data);
          if (responseJson.status == AppConstance.API_SUCESSCODE) {

            if(responseJson.data === true){
              const filteredData = data.filter(item => item.id !== del);
              setdata(filteredData)
              setspinner(false)

            }
           
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
const getlistAlerts = async()=>{
  
  AsyncStorage.getItem('savedIds', (error, result) => {
    console.log('datda is ::::::::::'+JSON.parse(result)+error);
  });
}

useEffect(() => {

 
  

  callingExportDetailApi()

  return () => {
    
  }
}, [])


const renderlist = ({item}) =>{
  
  console.log('yyyyyyy'+JSON.stringify(item.additional_info));
  let lot_no = item.additional_info.lot_no;
  let loc = item.additional_info.location;
  let des= item.additional_info.description;
  console.log(des);
  des =  des.replace(",", " ");

let location = '';
    if(loc == "1" ){
      location = 'LA'
    }else if(loc   == '2' ){
      location = 'GA'
    }else if(loc   == '3'){
      location ='NJ'
    }else if(loc   == '4'){
      location ='TX'
    }else if(loc   == '5'){
      location='TX2'
    }else if(loc   == '6'){
      location='NJ2'
    }else if(loc   == '7'){
      location='CA'
    }

  console.log(loc);
  return( <View style={{flexDirection:'row',alignSelf:'center',paddingHorizontal:5, marginTop:5, width:deviceWidth,height:70}} >

  <TouchableOpacity
  // onPress={()=>navigation.navigate('Tracking')}
  
  style={{width:'100%', paddingVertical:3,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'#fbf9e5'}}>
  <View style={{  width:'100%',height:'100%', flexDirection:'column'}}>
  
  
  
  <View style={{flexDirection:'row',paddingHorizontal:3, width:'100%',height:'33%'}}>
  
  <View style={{width:'35%'}}>
  <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:10,}}>{item.created_at}</Text>
  </View>
  
  
  <View style={{width:'35%'}}>
  <Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:10,}}>{des}</Text>
  </View>
  
  
  <View style={{width:'20%'}}>
  <Text style={{color:'black',fontWeight:'bold', paddingVertical:2, fontSize:10,}}>{lot_no}</Text>
  </View>
  
  <View style={{width:'10%',}}>
  <Text style={{color:'black',fontWeight:'bold',alignSelf:'center',paddingVertical:2, fontSize:11,}}>{location}</Text>
  </View>
  
  
  
  </View>
  
  
  
  <View style={{width:'97%',flexDirection:'row', marginTop:12, justifyContent:'space-between'}}>
  <Text style={{color:'red',fontWeight:'bold',paddingVertical:2,marginLeft:5, fontSize:10,}}>{item.message}</Text>
  <TouchableOpacity style={{alignSelf:'center' , justifyContent:'center'}}
  onPress={()=>{
setdel(item.id)
    setyesno(true)
  }}
  >
<MaterialCommunityIcons name='delete-forever' color={'red'} size={20} style={{alignSelf:'center'}} />
  </TouchableOpacity>
  </View>
  
  

  
  
  
  </View>
  
  </TouchableOpacity>
  
  
  
  
  
  
  </View>
  
  
  
  )
  
   }




    // const { type, title } = route.params;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>
    <Modal
          transparent={true}
          animationType={'none'}
          visible={yesno}
          onRequestClose={() => {
            console.log('close modal');
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingVertical: 10,
              height:deviceHeight,
              backgroundColor:'#0005',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '70%',
                flexDirection: 'column',
                backgroundColor:'white',
                borderRadius:15,
              }}>
    
           <View style={{borderBottomWidth:0.3,paddingVertical:12, borderColor:'#D0D3D4'}}>
             <Text style={{alignSelf:'center',fontSize:16, fontWeight:'400', paddingVertical:10,}}>Are You Sure you want to Delete? </Text>
           </View>

     

              <View style={{flexDirection:'row',borderTopWidth:0.5,borderColor:'grey',  width:'100%'}}>
                <TouchableOpacity style={{width:'50%',height:40,alignSelf:'center',justifyContent:'center', borderRightWidth:0.5,borderColor:'grey'}}
                onPress={()=>{setyesno(false);callingdeletealertApi() }}
                >
                  <Text style={{alignSelf:'center', fontSize:15}}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity  style={{width:'50%', height:40, justifyContent:'center', alignSelf:'center'}}
                                onPress={()=>{setyesno(false)}}

                >
                  <Text style={{fontSize:15, alignSelf:'center'}}>No</Text>
                </TouchableOpacity>
              </View>

              {/* <View
                style={{
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  height: 50,
                  flexDirection:'row',
                }}>
                <TouchableOpacity
                  // onPress={() => this.setState({error: false})}
                  style={{
                    borderRadius: 10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => this.setState({error: false})}
                  style={{
                    borderRadius: 10,
                    marginLeft:10,
                    alignSelf: 'center',
                    backgroundColor: 'red',
                    paddingVertical: 4,
                    paddingHorizontal: 4,
                  }}>
                  <Text
                    style={{
                      paddingVertical: 3,
                      fontSize: 13,
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    {' '}
                    CLOSE{' '}
                  </Text>
                </TouchableOpacity>
             
              </View> */}
           
            </View>
         
          </View>
        </Modal>

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
<View style={{justifyContent:'center'}}></View>
<Text style={{alignSelf:'center', marginLeft:6}}>Alerts </Text>
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


export default alerts;
