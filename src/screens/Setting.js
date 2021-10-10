import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Modal,
  Text,
  Switch,
  ImageBackground,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Linking,
  Image,
  Dimensions,
  CheckBox
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import AppColors from '../Colors/AppColors';
import AppConstance, { deviceHeight, deviceWidth } from '../constance/AppConstance';
import AppFonts from '../AppFont/AppFonts';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import { TextInput } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Pdf from 'react-native-pdf';
import ToggleSwitch from 'toggle-switch-react-native'
import AsyncStorage from '@react-native-community/async-storage';
import VersionInfo from 'react-native-version-info';


var imageBasePath = ''
var source = {uri:'',cache:false};

const Setting = ({props, route, navigation }) => {
  const [search, setSearch] = useState('');
  const [spinner ,setspinner] = useState(false)
  const [version , setversion] =useState('')
  const [pdf ,setpdf] = useState(false)
  const [notification , setnotification] = useState(false)
  const[source , setsource] =useState({uri:'',cache:true})
  const [filteredDataSource, setFilteredDataSource] = useState([
    {
      date: '20-01-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00'
    },
    {
      date: '20-12-2019',
      Name: 'KHU62389JBB',
      price:'$26,00.00'
    },
    {
      date: '20-12-2020',
      Name: 'M97K62389JBB',
      price:'$22,80.00'
    },
    {
      date: '20-12-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00'
    },

    {
      date: '20-12-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00'
    },
    ]
  )


  const [data, setdata] = useState([
    {
      date: '20-01-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00'
    },
    {
      date: '20-12-2019',
      Name: 'KHU62389JBB',
      price:'$26,00.00'
    },
    {
      date: '20-12-2020',
      Name: 'M97K62389JBB',
      price:'$22,80.00'
    },
    {
      date: '20-12-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00'
    },

    {
      date: '20-12-2020',
      Name: 'MUSK62389JBB',
      price:'$22,00.00'
    },
    ]
  )
  const  toggleSwitch1 = (value) => {

    if(value === true){
      AsyncStorage.setItem('Notification','1');

    }else{
      AsyncStorage.setItem('Notification','0');

    }
    setnotification(value)
     console.log('Switch 1 is: ' + value)
  }
  useEffect(() => {
    // Update the document title using the browser API
   // const subscription = props.source.subscribe();
   Check();
  //  console.log(VersionInfo.appVersion);

    // return () => {
    //   // Clean up the subscription
    //   subscription.unsubscribe();
    // };
    
  }, []); 
const Check =() =>{
  console.log(VersionInfo.appVersion);
  setversion(VersionInfo.appVersion)

  AsyncStorage.getItem('Notification').then((value)=>{
    if(value === '1'){
      setnotification(true)

    }else{
      setnotification(false)

    }
  })
}
 
 


const renderlist = ({item}) =>{

  return(
    
<View style={{flexDirection:'row', justifyContent:'space-between',paddingHorizontal:7, alignSelf:'center', marginTop:5, width:'100%',height:55}} >


<View style={{flexDirection:'column', justifyContent:'center'}}>


<Text style={{color:'white',paddingVertical:2, fontSize:15,}}>{item.container_number}</Text>
<Text style={{color:'grey',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>ETA {item.eta}</Text>


</View>
<View style={{height:'100%',flexDirection:'row', justifyContent:'center',}}>


<Text style={{alignSelf:'center',color:'black',fontWeight:'bold', borderRadius:15,paddingVertical:5, paddingHorizontal:12, backgroundColor:'#fd6b73', }} >{item.total_amount}</Text>
<TouchableOpacity 
onPress={()=> { source.uri=item.dxb_inv ; setpdf(true)} }

style={{marginLeft:5, alignSelf:'center'}}>
  <Entypo name='info-with-circle' size={22} color='white' />
</TouchableOpacity>
</View>

{/* <View style={{justifyContent:'flex-end'}}>

  <Text style={{color:'white', alignSelf:'center'}}>jhhhh</Text>
</View> */}




{/* <TouchableOpacity
// onPress={()=>navigation.navigate('CarDetails')}

style={{width:'100%', paddingVertical:3,paddingHorizontal:3,height:'100%',borderRadius:6,}}>
<View style={{  width:'100%',height:'100%', flexDirection:'row'  ,justifyContent:'space-between'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>

<View style={{ height:'100%',marginLeft:4,alignSelf:'center', paddingVertical:2, width:'62%'}}>

<Text style={{color:'white',paddingVertical:2, fontSize:15,}}>{item.name}</Text>
<Text style={{color:'grey',fontWeight:'bold',paddingVertical:2, fontSize:12,}}>ETA {item.date}</Text>


</View>

</View>
<View
// onPress={()=>navigation.navigate('CarDetails')}
style={{  paddingVertical:1,borderRadius:6,alignSelf:'flex-end',borderRadius:20, backgroundColor:'#fd6b73'}}>

<Text style={{alignSelf:'center', paddingVertical:2}} >$2456.00</Text>

</View>



</View>

</TouchableOpacity>
 */}









</View>

  
  
  )
  
   }

  return (
    <SafeAreaView style={{ flex: 1, width:deviceWidth, height: deviceHeight, }}>
 


<ScrollView style={{backgroundColor:'white'}}> 


<View
style={{width:deviceWidth,flexDirection:'row', backgroundColor:'white', paddingHorizontal:13,paddingVertical:5, height:55,}}>
<TouchableOpacity
style={{justifyContent:'center'}}
onPress={()=>navigation.navigate('Dashboard')}
// setisStopCallingAPI(false);setisFooterLoading(false);setdata(['']);
>
<MaterialIcons  name='keyboard-backspace' size={23}/>
</TouchableOpacity>
<Text style={{alignSelf:'center', marginLeft:6}}>Setting </Text>
</View>


<View style={{backgroundColor:'white', height:60, width:deviceWidth}} >

</View>
<View style={{height:60,borderTopWidth:6,borderBottomWidth:6,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:30, borderColor:'#E5E7E9',}}>

<Text style={{alignSelf:'center',fontSize:16}}>Allow notifications</Text>
{/* <ToggleSwitch
  isOn={true}
  onColor="green"
  offColor="blue"
  size="30"
  
  onToggle={isOn => console.log("changed to : ", isOn)}
/> */}
<Switch
         onValueChange = {toggleSwitch1}
         style={{alignSelf:'center'}}
         value = {notification}/>
</View>




<TouchableOpacity style={{height:70,borderBottomWidth:1,marginHorizontal:20,flexDirection:'row',paddingHorizontal:10,backgroundColor:'white', borderColor:'#E5E7E9',justifyContent:'space-between', }}>

<Text style={{alignSelf:'center',fontSize:16}}>Terms and Condition</Text>
<MaterialIcons name='keyboard-arrow-right'style={{alignSelf:'center'}} size={25} color='grey'/>

</TouchableOpacity>


<TouchableOpacity style={{height:70,borderBottomWidth:1,marginHorizontal:20,flexDirection:'row',paddingHorizontal:10, borderColor:'#E5E7E9',justifyContent:'space-between',}}>

<Text style={{alignSelf:'center',fontSize:16}}>Privacy Policy</Text>
<MaterialIcons name='keyboard-arrow-right'style={{alignSelf:'center'}} size={25} color='grey'/>

</TouchableOpacity>


<TouchableOpacity style={{height:70,marginHorizontal:20,flexDirection:'row',paddingHorizontal:10, borderColor:'#E5E7E9',justifyContent:'space-between', }}

onPress={()=>{navigation.navigate('Faqs')}}
>

<Text style={{alignSelf:'center', color:'black',fontSize:16 }}>FAQs</Text>
<MaterialIcons name='keyboard-arrow-right'style={{alignSelf:'center'}} size={25} color='grey'/>

</TouchableOpacity>



<View style={{flexDirection:'column',width:deviceWidth,height:40,marginTop:40, justifyContent:'center'}}>
  <Text style={{alignSelf:'center'}}>AFG GLOBAL SHIPPING</Text>

  <Text style={{alignSelf:'center'}}>Version:{version} </Text>
</View>



</ScrollView>

<View style={{justifyContent:'center',  paddingVertical:10,backgroundColor:'white' }}>
  <Text style={{alignSelf:'center'}}>Developed by <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('https://www.upwork.com/freelancers/~014512981757da15ed')}>
  Uneeb Malik
</Text>
 </Text>
</View>
    </SafeAreaView>

  );
};


export default Setting;
