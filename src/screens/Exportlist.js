import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Modal,
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
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';
import {Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';


var imageBasePath = ''

const Exportlist = ({ route, navigation }) => {
  const { type, title } = route.params;
  const [spinner , setspinner] =useState(false)
  const [refreshing, setrefreshing] =useState(true)
  const [data, setdata] = useState([])

  const [FilteredDataSource, setFilteredDataSource] = useState([])
  const[sortmodal , setsortmodal] = useState(false)
const [location ,setlocation] =useState('Select')
const [locationindex ,setlocationindex] =useState('0')
  const [data1, setdata1] = useState([
    {
      date: '20-12-2020',
      Description: 'Description',
      Lot:'473890',
      location:'3',
      exportImages:[]
 
    },
    {
      date: '20-12-2020',
      Description: 'Description',
      Lot:'473890',
      location:'2',
      exportImages:[]

    },

    {
    date: '20-12-2020',
      Description: 'Description',
      Lot:'473890',
      location:'4',
      exportImages:[]

    },

    {
      date: '20-12-2020',
      Description: 'Description',
      Lot:'473890',
      location:'3',
      exportImages:[]

    },

  ]
)
const [Search , setSearch] = useState('')


const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    // Inserted text is not blank
    // Filter the masterDataSource
    // Update FilteredDataSource
    const newData = data.filter(
      function (item) {
        const itemData = item.booking_number
          ? item.booking_number.toUpperCase()
          : ''.toUpperCase();
          const itemData2 = item.container_number
          ? item.container_number.toUpperCase()
          : ''.toUpperCase();
          const itemData3 = item.ar_number
          ? item.ar_number.toUpperCase()
          : ''.toUpperCase();

        const textData = text.toUpperCase();

        if(itemData.indexOf(textData) > -1){
        return itemData.indexOf(textData) > -1;

        }else if(itemData3.indexOf(textData)){
        return itemData3.indexOf(textData) > -1;
      }
        // return itemData.indexOf(textData) > -1;
    });
    // setcheck(0)
    setFilteredDataSource(newData);
    setSearch(text);
  } else {
    // Inserted text is blank
    // Update FilteredDataSource with masterDataSource
    setFilteredDataSource(data);
    setSearch(text);
  }
};

const handleRefresh = () => {
  setspinner(true)
  setrefreshing(false,callingContainerApi())
}


const  callingContainerApi = (isFirstTimeCaling) => {
  setspinner(true)
setrefreshing(true)
  var url = ''
  if (isFirstTimeCaling) {
      url = AppUrlCollection.EXPORT_LIST 
    
  } else {
      url = AppUrlCollection.EXPORT_LIST 
  }
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
          console.log('Response data viw :: ', responseJson.data)
          if (responseJson.status == AppConstance.API_SUCESSCODE) {
              imageBasePath = responseJson.data.other.export_image
              if (responseJson.data.export.length > 0) {
                  if (isFirstTimeCaling) {
                    setFilteredDataSource(responseJson.data.export)
                    setdata(responseJson.data.export)
                    setspinner(false)
                    console.log('data export is : =-----'+data);

                    //  this.setState({ vehicleList: responseJson.data.export, noMoreDataFound: false, isFooterLoading: false })
                  } else {
                //  this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.export), noMoreDataFound: false, isFooterLoading: false })
                setFilteredDataSource(responseJson.data.export)
                setdata(responseJson.data.export)
                                      setspinner(false)
                    }
              } else {
                  if (isFirstTimeCaling) {
                    setdata('')
                    setFilteredDataSource('')
                      //this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                  } else {
                    setdata('')
                    setFilteredDataSource('')

                      //this.setState({ isFooterLoading: false, noMoreDataFound: true })
                  }
              }
          } else {
            alert(responseJson.message)
            setspinner(false)

             // AppConstance.showSnackbarMessage(responseJson.message)
          }
      })
      .catch((error) => {
        setspinner(false)

        alert(error)
          console.warn(error)
      });

      setrefreshing(false)
      setspinner(false)


    }

  const sortt =(itemIndex) => {
      setspinner(true)
      let loct='';
      if(itemIndex == ''){
        setlocation('Select')
        setlocationindex('0')
      }else if(itemIndex == 'LA'){
        setlocation('LA')
        setlocationindex('LA')
         loct='1';
      }else if(itemIndex == '2'){
        setlocation('GA')
        setlocationindex('GA')
        loct='2';

      }else if(itemIndex == 'NJ'){
        setlocation('NJ')
        // setlocationindex(3)
        setlocationindex('NJ')
        loct='3';

      }else if(itemIndex == 'TX'){
        setlocation('TX')
        setlocationindex('TX')
        loct='4';

      }
      
      
      console.warn(location+'-----'+locationindex+',,,,,,,,'+'-----'+itemIndex);
      // alert(location+'-----'+locationindex+',,,,,,,,'+itemValue+'-----'+itemIndex)
      
      
        let newarray = [...data]
      
        newarray.sort((a, b) =>{
          if(a.location == loct){
            return -1
          }else{
            return 1
          }
        } )
      setdata(newarray)
      setspinner(false)
    
        // setdata('')
        // setdata(data)
    }
  // (a.location === 'NJ') ? 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 )

useEffect(() => {
  
  // Update the document title using the browser API
 // const subscription = props.source.subscribe();
  callingContainerApi(true)
  // return () => {
  //   // Clean up the subscription
  //   subscription.unsubscribe();
  // };
  
  
}, []);   

const renderlist = ({item}) =>{

  let size='';
  if(item.container_type == '1'){
    size ='20\''
  }else if(item.container_type =='2'){
    size ='45\''
  }else if(item.container_type =='3'){
    size ='40\''
  }


  let status='';
  if(item.status == '1'){
    status ='ON HAND'
  }else if(item.status =='2'){
    status ='MANIFEST'
  }else if(item.status =='3'){
    status ='DISPATCHED'
  }else  if(item.status == '4'){
    status ='SHIPPED'
  }else if(item.status =='5'){
    status ='PICKED UP'
  }else if(item.status =='6'){
    status ='ARRIVED'
  }


  let loc = '';
  if(item.location == '1' ){
    loc = 'LA'
  
  }else if(item.location == '2' ){
    loc ='GA'
  
  }else if(item.location == '3'){
    loc ='NJ'
  
  }else if(item.location == '4'){
    loc ='TX'
  
  }else if(item.location == '5'){
    loc ='TX2'
  
  }else if(item.location == '6'){
    loc ='NJ2'
  
  }else if(item.location == '7'){
    loc ='CA'
  
  }
  return(
    
<View style={{flexDirection:'row',alignSelf:'center', marginTop:10, paddingHorizontal:5, width:'100%',height:78}} >

<TouchableOpacity
onPress={()=>navigation.navigate('ExportCarDetails',{datapre:item.id,})}

style={{width:'64%', paddingVertical:3,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>

{item.exportImages.length > 0 ?
                    <Image style={{width:'34%',height:'100%', resizeMode:'cover'}} source={{ uri: imageBasePath + item.exportImages[0].thumbnail }} /> :
                    <Image style={{width:'34%',height:'100%', resizeMode:'cover'}}  source={require('../images/download.jpeg')} />}
{/* <Image style={{width:'32%',height:'100%', resizeMode:'cover'}} source={require('../images/img-0928-1535139376.jpg')} /> */}

<View style={{ height:'100%',marginLeft:3, justifyContent:'center', width:'70%'}}>

<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>CONTAINER: {item.container_number}</Text>
<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>BOOKING: {item.booking_number}</Text>
<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>SIZE: {size}</Text>


</View>

</View>




</View>

</TouchableOpacity>


<View
style={{width:'1.3%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('ExportCarDetails',{datapre:item.id,})}

style={{width:'34.7%', paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>STATUS: {status}</Text>



<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>ETA DATE:{item.eta}</Text>


<Text style={{color:'black',fontWeight:'bold',paddingVertical:2, fontSize:11,}}>LOCATION: {loc}</Text>




</View>

</TouchableOpacity>

</View>

  
  
  )
  
   }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', height: deviceHeight, }}>

<Modal
    transparent={true}
    visible={sortmodal}
>
<SafeAreaView style={{height:deviceHeight , width:deviceWidth,backgroundColor:'#0006', justifyContent:'center'}}>

  <View style={{justifyContent:'center',width:'80%', borderRadius:15, flexDirection:'column', padding:20, alignSelf:'center', backgroundColor:'white'}}>
<Text style={{alignSelf:'center', fontSize:16, marginBottom:5}}>Please Select Location</Text>

  <TouchableOpacity 
  
  onPress={()=> {     sortt('LA'); setsortmodal(false)  }}
  style={{ marginVertical:10,}}>

  <Text>LA</Text>
</TouchableOpacity>

<TouchableOpacity 
  onPress={()=>{sortt('GA'); setsortmodal(false)}}

style={{ marginVertical:10,}}>

  <Text>GA</Text>
</TouchableOpacity>


<TouchableOpacity 
  onPress={()=>{ sortt('NJ'); setsortmodal(false)} }

style={{ marginVertical:10,}}>

  <Text>NJ</Text>
</TouchableOpacity>



<TouchableOpacity 
  onPress={()=> { sortt('TX'); setsortmodal(false)}}

style={{ marginVertical:10,}}>

  <Text>TX</Text>
</TouchableOpacity>











<TouchableOpacity 
onPress={()=> { setsortmodal(false)}}
style={{width:'45%',backgroundColor:'red',padding:10,borderRadius:20,marginTop:10, alignSelf:'center', justifyContent:'center'}}>
<Text style={{alignSelf:'center',color:'white'}}>Cancel</Text>
</TouchableOpacity>
</View>
</SafeAreaView>


  
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

<View style={{height:'100%',justifyContent:'center'}}>
<Text style={{alignContent:'center',textAlign:'center', marginLeft:6}}>{type} {data.length}</Text>
</View>


</View>
<View

style={{height:deviceHeight*0.04, backgroundColor:'white',flexDirection:'row', justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center', marginRight:1}}>Sorting: locationwise: </Text>
<TouchableOpacity 
style={{flexDirection:'row',justifyContent:'center', alignSelf:'center'}}
onPress={()=>{setsortmodal(true)}}>

  <Text style={{fontSize:12,marginRight:3, alignSelf:'center'}}>{location}</Text>
  <AntDesign name='caretdown' color='grey' size={12} style={{alignSelf:'center'}} />
</TouchableOpacity>


{/* <Picker
  selectedValue={location}
  // style={{height:'100%',backgroundColor:'red', width: 20}}
  style={{height: 18 ,alignSelf:'center', width: 35}}

  onValueChange={(itemValue, itemIndex) =>

    sortt(itemValue,itemIndex)
    // alert(itemIndex)
  }>
  <Picker.Item style={{fontSize:12}} label="Select" value="Select" />
  <Picker.Item label="LA" value="LA" />
  <Picker.Item label="GA" value="GA" />
  <Picker.Item label="NJ" value="NJ" />
  <Picker.Item label="TX" value="TX" />


</Picker> */}


</View>

<View

style={{height:deviceHeight*0.05,paddingHorizontal:30,paddingVertical:5,paddingTop:10, backgroundColor:AppColors.blue, justifyContent:'center'}}>
 <TextInput
          style={{height: 25,
    borderWidth: 0.4,
    paddingLeft: 20,
    borderRadius:30,
    fontSize:12,
    paddingVertical:5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',}}
          onChangeText={(text) => searchFilterFunction(text)}
          value={Search}
          underlineColorAndroid="transparent"
          placeholder="Search Container by Booking no,Ar number and Container no."
          placeholderTextColor={AppColors.blue}
        />
</View>


<View style={{width:deviceWidth, flex:1, backgroundColor:AppColors.blue}}>

  
<FlatList
                         contentContainerStyle={{ paddingBottom: 50}}
                         contentInsetAdjustmentBehavior="automatic"
                      data={FilteredDataSource}
                     renderItem={renderlist}
                     extraData={FilteredDataSource}
                     keyExtractor={(item,index) => index.toString()}
                     refreshing={refreshing}
                     onRefresh={handleRefresh}

 
                     
 
                  />
                  </View>

    </SafeAreaView>

  );
};


export default Exportlist;
