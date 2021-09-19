import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Alert,
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
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-community/async-storage'


const Dashboard = ({ navigation }) => {
const[ d , setd ] = useState()
  const [Dashboarddata , setDashboarddata] = useState(


 {"all": {
      "all": "0",
      "on_hand": "",
      "manifest": "",
      "picked_up": "",
      "car_on_way": "",
      "shipped": "",
      "arrived": "",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "16",
      "not_towed": "0",
      "with_title": "16",
      "with_out_title": "0",
      "towed_with_title": "16",
      "towed_with_out_title": "0"
  },
  "LA": {
      "all": "4",
      "on_hand": "",
      "manifest": "",
      "picked_up": "",
      "car_on_way": "",
      "shipped": "",
      "arrived": "",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "4",
      "not_towed": "0",
      "with_title": "4",
      "with_out_title": "0",
      "towed_with_title": "4",
      "towed_with_out_title": "0"
  },
  "GA": {
      "all": "1",
      "on_hand": "",
      "manifest": "",
      "picked_up": "",
      "car_on_way": "",
      "shipped": "",
      "arrived": "",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "1",
      "not_towed": "0",
      "with_title": "1",
      "with_out_title": "0",
      "towed_with_title": "1",
      "towed_with_out_title": "0"
  },
  "NY": {
      "all": "10",
      "on_hand": "",
      "manifest": "",
      "picked_up": "",
      "car_on_way": "",
      "shipped": "",
      "arrived": "",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "1",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "10",
      "not_towed": "0",
      "with_title": "10",
      "with_out_title": "0",
      "towed_with_title": "10",
      "towed_with_out_title": "0"
  },
  "TX": {
      "all": "1",
      "on_hand": "",
      "manifest": "",
      "picked_up": "",
      "car_on_way": "",
      "shipped": "",
      "arrived": "",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "1",
      "not_towed": "0",
      "with_title": "1",
      "with_out_title": "0",
      "towed_with_title": "1",
      "towed_with_out_title": "0"
  },
  "TX2": {
      "all": "0",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "0",
      "not_towed": "0",
      "with_title": "0",
      "with_out_title": "0",
      "towed_with_title": "0",
      "towed_with_out_title": "0"
  },
  "NJ2": {
      "all": "0",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "0",
      "not_towed": "0",
      "with_title": "0",
      "with_out_title": "0",
      "towed_with_title": "0",
      "towed_with_out_title": "0"
  },
  "CA": {
      "all": "0",
      "on_hand": "0",
      "manifest": "0",
      "picked_up": "0",
      "car_on_way": "0",
      "shipped": "0",
      "arrived": "4",
      "on_hand_with_towed": "0",
      "on_hand_with_title": "0",
      "on_hand_with_out_title": "0",
      "on_hand_with_out_towed": "0",
      "towed": "0",
      "not_towed": "0",
      "with_title": "0",
      "with_out_title": "0",
      "towed_with_title": "0",
      "towed_with_out_title": "0"
  }
}
  )
  
  const [Allexportable , setAllexportable] = useState('0')
  const [Allpending , setAllpending] = useState('0')
  const [Allbos , setAllbos] = useState('0')
  const [Alllien , setAlllien] = useState('0')
  const [Allmv907 , setAllmv907] = useState('0')



  const [GAexportable , setGAexportable] = useState('0')
  const [GApending , setGApending] = useState('0')
  const [GAbos , setGAbos] = useState('0')
  const [GAlien , setGAlien] = useState('0')
  const [GAmv907 , setGAmv907] = useState('0')


  const [NYexportable , setNYexportable] = useState('0')
  const [NYpending , setNYpending] = useState('0')
  const [NYbos , setNYbos] = useState('0')
  const [NYlien , setNYlien] = useState('0')
  const [NYmv907 , setNYmv907] = useState('0')

  const [TXexportable , setTXexportable] = useState('0')
  const [TXpending , setTXpending] = useState('0')
  const [TXbos , setTXbos] = useState('0')
  const [TXlien , setTXlien] = useState('0')
  const [TXmv907 , setTXmv907] = useState('0')

  // const [CAexportable , setCAexportable] = useState('0')
  // const [CApending , setCApending] = useState('0')
  // const [CAbos , setCAbos] = useState('0')
  // const [CAlien , setCAlien] = useState('0')
  // const [CAmv907 , setLAmv907] = useState('0')


  const [LAexportable , setLAexportable] = useState('0')
  const [LApending , setLApending] = useState('0')
  const [LAbos , setLAbos] = useState('0')
  const [LAlien , setLAlien] = useState('0')
  const [LAmv907 , setLAmv907] = useState('0')


  
  

  const[spinner , setspinner] = useState(false)

  const  callingdashboardApi = () => {
    setspinner(true)
    var url = ''
    AsyncStorage.getItem('IS_USER_LOGIN1').
    then((value) => {
      AsyncStorage.getItem(AppConstance.USER_INFO_OBJ).
      then((value2)=>{
        console.warn('--------'+value+'--------'+value2);

      })
    })     
        url = AppUrlCollection.BASE_URL + 'vehicle/dashboard-report' 
    
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
            if (responseJson.status == AppConstance.API_SUCESSCODE) {
            setDashboarddata(responseJson.data);

              let All;
             All = responseJson.data.all.all_titles;
             console.log('---all---'+All);
            if(All != null){
              for(var i = 0 ; i < responseJson.data.all.all_titles.length; i++){
                let element = responseJson.data.all.all_titles[i].title_name;
                let value = responseJson.data.all.all_titles[i].count;
                console.log('===='+element);

                switch(element) {
 
                  case '1':
                  setAllexportable(value)
                    break;
                  
                  case '2':
                    // AllTitles.push('pending'+':'+value)
                    setAllpending(value)
                    break;
             
                  case '3':
                    setAllbos(value)
                    // AllTitles.push('bos'+':'+value)
                    break;
             
                  case '4':
                    setAlllien(value)
                    // AllTitles.push('lien'+':'+value)
                    break;

                  case '5':
                    setAllmv907(value)
                    // AllTitles.push('mv907'+':'+value)
                    break;
             
                  default:
                    // Alert.alert("NUMBER NOT FOUND");
                
                }   

              }
          //  let ii=  JSON.parse(AllTitles);

              // console.log('final---'+ii);
              // setAllTitles(All)
            }

            // let NY = responseJson.data.NY.all_titles;
            if(responseJson.data.NY.all_titles != null){
              for(var i = 0 ; i < responseJson.data.NY.all_titles.length; i++){
                let element = responseJson.data.NY.all_titles[i].title_name;
                let value = responseJson.data.NY.all_titles[i].count;
                console.log('===='+element);

                switch(element) {
 
                  case '1':
                  setNYexportable(value)
                    break;
                  
                  case '2':
                    // AllTitles.push('pending'+':'+value)
                    setNYpending(value)
                    break;
             
                  case '3':
                    setNYbos(value)
                    // AllTitles.push('bos'+':'+value)
                    break;
             
                  case '4':
                    setNYlien(value)
                    // AllTitles.push('lien'+':'+value)
                    break;

                  case '5':
                    setNYmv907(value)
                    // AllTitles.push('mv907'+':'+value)
                    break;
             
                  default:
                    // Alert.alert("NUMBER NOT FOUND");
                
                }   

              }
          //  let ii=  JSON.parse(AllTitles);

              // console.log('final---'+ii);
              // setAllTitles(All)
            }


            // let GA = responseJson.data.GA.all_titles;
            if(responseJson.data.GA.all_titles != null){
              for(var i = 0 ; i < responseJson.data.GA.all_titles.length; i++){
                let element = responseJson.data.GA.all_titles[i].title_name;
                let value = responseJson.data.GA.all_titles[i].count;
                console.log('===='+element);

                switch(element) {
 
                  case '1':
                  setGAexportable(value)
                    break;
                  
                  case '2':
                    // AllTitles.push('pending'+':'+value)
                    setGApending(value)
                    break;
             
                  case '3':
                    setGAbos(value)
                    // AllTitles.push('bos'+':'+value)
                    break;
             
                  case '4':
                    setGAlien(value)
                    // AllTitles.push('lien'+':'+value)
                    break;

                  case '5':
                    setGAmv907(value)
                    // AllTitles.push('mv907'+':'+value)
                    break;
             
                  default:
                    // Alert.alert("NUMBER NOT FOUND");
                }   

              }
      
            }

            // let CA = responseJson.data.CA.all_titles;
            if(responseJson.data.LA.all_titles != null){
              for(var i = 0 ; i < responseJson.data.LA.all_titles.length; i++){
                let element = responseJson.data.LA.all_titles[i].title_name;
                let value = responseJson.data.LA.all_titles[i].count;
                console.log('===='+element);

                switch(element) {
 
                  case '1':
                  setLAexportable(value)
                    break;
                  
                  case '2':
                    // AllTitles.push('pending'+':'+value)
                    setLApending(value)
                    break;
             
                  case '3':
                    setLAbos(value)
                    // AllTitles.push('bos'+':'+value)
                    break;
             
                  case '4':
                    setLAlien(value)
                    // AllTitles.push('lien'+':'+value)
                    break;

                  case '5':
                    setLAmv907(value)
                    // AllTitles.push('mv907'+':'+value)
                    break;
             
                  default:
                    // Alert.alert("NUMBER NOT FOUND");
                }   

              }
      
            }


            
            // let TX = responseJson.data.TX.all_titles;
            if(responseJson.data.TX.all_titles != null){
              for(var i = 0 ; i < responseJson.data.TX.all_titles.length; i++){
                let element = responseJson.data.TX.all_titles[i].title_name;
                let value = responseJson.data.TX.all_titles[i].count;
                console.log('===='+element);

                switch(element) {
 
                  case '1':
                  setTXexportable(value)
                    break;
                  
                  case '2':
                    // AllTitles.push('pending'+':'+value)
                    setTXpending(value)
                    break;
             
                  case '3':
                    setTXbos(value)
                    // AllTitles.push('bos'+':'+value)
                    break;
             
                  case '4':
                    setTXlien(value)
                    // AllTitles.push('lien'+':'+value)
                    break;

                  case '5':
                    setTXmv907(value)
                    // AllTitles.push('mv907'+':'+value)
                    break;
             
                  default:
                    // Alert.alert("NUMBER NOT FOUND");
                }   

              }
      
            }

            console.warn('data is '+Dashboarddata);
            setspinner(false)


            } else {
              alert(responseJson.message)
              setspinner(false)

               // AppConstance.showSnackbarMessage(responseJson.message)
            }
        })
        .catch((error) => {
          alert('error while fetching from  '+error)
          setspinner(false)

            console.warn(error)
        });
  }

  
  useEffect(() => {
    

   


    const unsubscribe = navigation.addListener('focus', () => {
      callingdashboardApi()


      // The screen is focused
      // Call any action
    });


    callingdashboardApi()
  
    return () => {

    }
  }, [])


  return (

    <SafeAreaView      style={{ flex: 1,  height: deviceHeight, }}>

<Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />
    <View
     style={{ flex: 1, backgroundColor: AppColors.blue, height: deviceHeight, }}>



<View
style={{width:deviceWidth,flexDirection:'row',justifyContent:'space-between', backgroundColor:'red', paddingHorizontal:13,paddingVertical:8, height:Platform.OS === 'ios' ? deviceHeight*0.058 : deviceHeight*0.065,}}>
<TouchableOpacity
style={{justifyContent:'center'}}
onPress={()=>navigation.navigate('Drawer')}
>
<Icon  name='menu' size={30}/>
</TouchableOpacity>

<TouchableOpacity
onPress={()=> navigation.navigate('alerts')}
style={{justifyContent:'center'}}>


    <SimpleLineIcons name='bell' size={24}/>
</TouchableOpacity>
</View>
<View

style={{height:deviceHeight*0.035, backgroundColor:'white',justifyContent:'center'}}>
<Text style={{fontSize:13,alignSelf:'center',fontWeight:'bold'}}>WELCOME TO AFG GLOBAL</Text>
</View>



<ScrollView style={{width:deviceWidth, paddingHorizontal:15}}>

<View style={{flexDirection:'row',alignSelf:'center',marginTop:16, width:'100%',height:99}} >

<TouchableOpacity
onPress={()=>navigation.navigate('Carlist',{type:'total',title:'0',container:'0'})}

style={{width:'46.5%', paddingVertical:2,paddingHorizontal:5,height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<Text style={{alignSelf:'center', color:'black',fontSize:10}}>TOTAL</Text>
<View style={{height:5,}}></View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>DISPATCHED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.all.car_on_way}</Text>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>ON HAND</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.all.on_hand}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>MANIFEST</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.all.manifest}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>SHIPPED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.all.shipped}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>ARRIVED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.all.arrived}</Text>
</View>


</View>

</TouchableOpacity>


<View
style={{width:'7%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('Carlist',{type:'total',title:'1'})}

style={{width:'46.5%', paddingVertical:2,paddingHorizontal:5,height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<Text style={{alignSelf:'center', color:'black',fontSize:10}}>TOTAL TITLES</Text>
<View style={{height:5,}}></View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>EXPORTABLE</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Allexportable}</Text>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>PENDING</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Allpending}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>BOS</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Allbos}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>LIEN</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Alllien}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>MV907</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Allmv907}</Text>
</View>


</View>

</TouchableOpacity>

</View>

<View style={{flexDirection:'row',alignSelf:'center', marginTop:20, width:'100%',height:99}} >

<TouchableOpacity

onPress={()=>navigation.navigate('Carlist',{type:'3',title:'0',container:'0'})}

style={{width:'46.5%', paddingVertical:2,paddingHorizontal:5,height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<Text style={{alignSelf:'center', color:'black',fontSize:10}}>NJ VEHICLES</Text>
<View style={{height:5,}}></View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>DISPATCHED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.NY.car_on_way}</Text>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>ON HAND</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.NY.on_hand}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>MANIFEST</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.NY.manifest}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>SHIPPED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.NY.shipped}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>ARRIVED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.NY.arrived}</Text>
</View>


</View>

</TouchableOpacity>


<View
style={{width:'7%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('Carlist',{type:'3',title:'1'})}

style={{width:'46.5%', paddingVertical:2,paddingHorizontal:5,height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<Text style={{alignSelf:'center', color:'black',fontSize:10}}>NJ TITLES</Text>
<View style={{height:5,}}></View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>EXPORTABLE</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{NYexportable}</Text>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>PENDING</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{NYpending}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>BOS</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{NYbos}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>LIEN</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{NYlien}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>MV907</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{NYmv907}</Text>
</View>


</View>

</TouchableOpacity>

</View>


<View style={{flexDirection:'row',alignSelf:'center',marginTop:20,  width:'100%',height:99}} >

<TouchableOpacity
onPress={()=>navigation.navigate('Carlist',{type:'2',title:'0',container:'0'})}

style={{width:'46.5%', paddingVertical:2,paddingHorizontal:5,height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<Text style={{alignSelf:'center', color:'black',fontSize:10}}>GA VEHICLES</Text>
<View style={{height:5,}}></View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>DISPATCHED</Text>

<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.GA.car_on_way}</Text>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>ON HAND</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.GA.on_hand}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>MANIFEST</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.GA.manifest}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>SHIPPED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.GA.shipped}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>ARRIVED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.GA.arrived}</Text>
</View>


</View>

</TouchableOpacity>


<View
style={{width:'7%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('Carlist',{type:'2',title:'1'})}

style={{width:'46.5%', paddingVertical:2,paddingHorizontal:5,height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<Text style={{alignSelf:'center', color:'black',fontSize:10}}>GA TITLES</Text>
<View style={{height:5,}}></View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>EXPORTABLE</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{GAexportable}</Text>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>PENDING</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{GApending}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>BOS</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{GAbos}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>LIEN</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{GAlien}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>MV907</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{GAmv907}</Text>
</View>


</View>

</TouchableOpacity>

</View>


<View style={{flexDirection:'row',alignSelf:'center',marginTop:20,  width:'100%',height:99}} >

<TouchableOpacity
onPress={()=>navigation.navigate('Carlist',{type:'1',title:'0',container:'0'})}

style={{width:'46.5%', paddingVertical:2,paddingHorizontal:5,height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<Text style={{alignSelf:'center', color:'black',fontSize:10}}>LA VEHICLES</Text>
<View style={{height:5,}}></View>
  
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>DISPATCHED</Text>

<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.LA.car_on_way}</Text>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>ON HAND</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.LA.on_hand}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>MANIFEST</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.LA.manifest}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>SHIPPED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.LA.shipped}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>ARRIVED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.LA.arrived}</Text>
</View>


</View>

</TouchableOpacity>


<View
style={{width:'7%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('Carlist',{type:'1',title:'1'})}

style={{width:'46.5%', paddingVertical:2,paddingHorizontal:5,height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<Text style={{alignSelf:'center', color:'black',fontSize:10}}>LA TITLES</Text>
<View style={{height:5,}}></View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>EXPORTABLE</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{LAexportable}</Text>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>PENDING</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{LApending}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>BOS</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{LAbos}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>LIEN</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{LAlien}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>MV907</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{LAmv907}</Text>
</View>


</View>

</TouchableOpacity>

</View>



<View style={{flexDirection:'row',alignSelf:'center',marginTop:20,  width:'100%',height:99}} >

<TouchableOpacity
onPress={()=>navigation.navigate('Carlist',{type:'4',title:'0',container:'0'})}

style={{width:'46.5%', paddingVertical:2,paddingHorizontal:5,height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<Text style={{alignSelf:'center', color:'black',fontSize:10}}>TX VEHICLES</Text>
<View style={{height:5,}}></View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>DISPATCHED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.TX.car_on_way}</Text>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>ON HAND</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.TX.on_hand}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>MANIFEST</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.TX.manifest}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>SHIPPED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.TX.shipped}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>ARRIVED</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{Dashboarddata.TX.arrived}</Text>
</View>


</View>

</TouchableOpacity>


<View
style={{width:'7%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('Carlist',{type:'4',title:'1'})}

style={{width:'46.5%', paddingVertical:2,paddingHorizontal:5,height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<Text style={{alignSelf:'center', color:'black',fontSize:10}}>TX TITLES</Text>
<View style={{height:5,}}></View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>EXPORTABLE</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{TXexportable}</Text>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>PENDING</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{TXpending}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>BOS</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{TXbos}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>LIEN</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{TXlien}</Text>
</View>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{textAlign:'left', color:'black',fontSize:10}}>MV907</Text>
<Text style={{textAlign:'right', color:'black',fontSize:10}}>{TXmv907}</Text>
</View>


</View>

</TouchableOpacity>

</View>




<View style={{flexDirection:'row',alignSelf:'center',marginTop:20, width:'100%',height:50}} >

<TouchableOpacity
onPress={()=>navigation.navigate('Exportlist',{    type: 'Export',
            otherParam: 'anything you want here',})}

       
        
style={{width:'46.5%',height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Text style={{alignSelf:'center',fontWeight:'bold', color:AppColors.purple,fontSize:14}}>Export</Text>

</View>

</TouchableOpacity>
<View
style={{width:'7%'}}>

</View>

<TouchableOpacity
onPress={()=>navigation.navigate('Accounts')}

style={{width:'46.5%',height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Text style={{alignSelf:'center',fontWeight:'bold', color:AppColors.purple,fontSize:14}}>Accounts</Text>

</View>

</TouchableOpacity>

</View>


<View style={{flexDirection:'row',alignSelf:'center',marginTop:20, marginBottom:16, width:'100%',height:50}} >

<TouchableOpacity
onPress={()=>navigation.navigate('Prices')}

style={{width:'46.5%',height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Text style={{alignSelf:'center',fontWeight:'bold', color:AppColors.purple,fontSize:14}}>Price</Text>

</View>

</TouchableOpacity>
<View
style={{width:'7%'}}>

</View>

<TouchableOpacity
onPress={()=>navigation.navigate('Notifications')}

style={{width:'46.5%',height:'100%',borderRadius:10, backgroundColor:'white'}}>
<View style={{padding:5, width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Text style={{alignSelf:'center',fontWeight:'bold', color:AppColors.purple,fontSize:14}}>Notifications</Text>

</View>

</TouchableOpacity>


</View>

</ScrollView>




    </View>
    </SafeAreaView>

  );
};


export default Dashboard;
