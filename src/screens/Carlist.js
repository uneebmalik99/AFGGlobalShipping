import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
  Modal,
  ActivityIndicator,
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
import { useSafeArea } from 'react-native-safe-area-context';
import { FA5Style } from 'react-native-vector-icons/dist/FontAwesome5';
import { set } from 'react-native-reanimated';
import {Picker} from '@react-native-picker/picker';



var baseImagePath = '';
const Carlist = ({route, navigation }) => {
  const { type, title } = route.params;
  const [spinner , setspinner] =useState(false)
  const [noMoreDataFound ,setnoMoreDataFound] =useState(false)
  const [isFooterLoading , setisFooterLoading] = useState(false)
  const [isStopCallingAPI ,setisStopCallingAPI]=useState(false)
  const [refreshing, setrefreshing] =useState(true)
  const [location ,setlocation] =useState('Select')
const [locationindex ,setlocationindex] =useState('0')
  const[isCallingFirsttime ,setisCallingFirsttime] =useState(true)
  const[page , setpage] =useState(1)
  const[sortmodal , setsortmodal] = useState(false)
  const[sort2modal , setsort2modal] = useState(false)
  const[sorttitlemodal , setsorttitlemodal] = useState(false)

  const [filteredDataSource, setFilteredDataSource] = useState([
    
  ]
)
  // const [loc , setloc] = useState('')

  const [data, setdata] = useState([
    

  ]
)


const handleRefresh = () => {
  setspinner(true)
  setrefreshing(false,callingVehicleApi())
  // this.setState({ refreshing: false }, ()=>{this.fetchCats()});
}

const searchFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    console.log(text);
    
    const newData = filteredDataSource.filter(
      function (item) {
    
       

        const itemData = item.status
          ? item.status.toUpperCase()
          : ''.toUpperCase();

          
       
          const textData = text.toUpperCase();
        
          if(itemData.indexOf(textData) > -1){
            return itemData.indexOf(textData) > -1;
          }
   
 
    });
    setdata(newData);

  } else {
    console.log('blank');
    setdata(data);
  }
};


const searchlocationFilterFunction = (text) => {
  // Check if searched text is not blank
  if (text) {
    console.log(text);
    
    const newData = filteredDataSource.filter(
      function (item) {
    
       

        const itemData = item.location
          ? item.location.toUpperCase()
          : ''.toUpperCase();

          
       
          const textData = text.toUpperCase();
        
          // if(itemData.indexOf(textData) > -1){
            return itemData.indexOf(textData) > -1;
          // }
   
 
    });
    setdata(newData);

  } else {
    console.log('blank');
    setdata(data);
  }
};


const renderFooter = () => {
  if (isFooterLoading === true) {
      return <View style={{paddingVertical:15}}><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
  } else {
      return null;
  }
}

const loadMoreData = () => {
  // setisFooterLoading(true)
      setTimeout(() => {
      if (isStopCallingAPI === true) {

      } else {
          if (noMoreDataFound === true) {

          } else {
            setpage(prevState => prevState + 1);

            // setpage(page+1)
            callingVehicleApi()
          }
      }
  }, 100);

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

const callingVehicleApi = async () => {


  setrefreshing(true)

  if (isCallingFirsttime == true) {
    setisFooterLoading(false)
    setisCallingFirsttime(false)
    console.warn('1');
    setpage(prevState => prevState + 1);

    // alert( 'type is '+ type + 'title is 1-0 : '+ title)

     // this.setState({ isLoading: true, isFooterLoading: false })
  } else {
    console.warn('2');
    setisFooterLoading(true)
      //this.setState({ isLoading: false, isFooterLoading: true })
  }
//  console.log('MAIN API :;', AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)
  // fetch(AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId, {

var url = '';
if(type !== 'total'){
  if(title == '1'){
    url = AppUrlCollection.VEHILE_LIST + 'location='+type + '&page=' + page + '&title=' + 'all';

  }else{
    url = AppUrlCollection.VEHILE_LIST + 'location='+type + '&page=' + page;

  }
}else{
  if(title == '1'){
    var url = AppUrlCollection.VEHILE_LIST + 'page=' + page + '&title=' + 'all' ;

  }else{
  var url = AppUrlCollection.VEHILE_LIST + 'page=' + page;
  }
}

    fetch(url , {

    method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'authkey': AppConstance.USER_INFO.USER_TOKEN
      },
  })
      .then((response) => response.json())
      .then((responseJson) => {

        console.warn( 'response');
          if (responseJson.status == AppConstance.API_SUCESSCODE) {
              baseImagePath = responseJson.data.other.vehicle_image;
              let data = responseJson.data.vehicleList;
              console.warn(data);
              setisFooterLoading(false)
              //this.setState({ isLoading: false, isFooterLoading: false })
              if (data.length > 0) {
                setspinner(false)
                  // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
                  //this.setState({ vehicleList: this.state.vehicleList.concat(data), noMoreDataFound: false })
                  //  setdata(data)
                 setdata(old => [...old, ...data]);
                 setFilteredDataSource(old => [...old, ...data]);

                 
                  // setdata(data)
                  setisStopCallingAPI(false)
                  setnoMoreDataFound(false)
                 
              } else {
                setspinner(false)
                setnoMoreDataFound(true)
                setisFooterLoading(false)
                setisStopCallingAPI(true)


                 // this.setState({ noMoreDataFound: true, isFooterLoading: false, isStopCallingAPI: true })
              }
             
              //this.setState({ noMoreDataFound: false })
          } else {
            
            setspinner(false)
            setisFooterLoading(false)

             // this.setState({ isLoading: false, isFooterLoading: false })
             // this.setState({ isStopCallingAPI: true, noMoreDataFound: true, })
              // AppConstance.showSnackbarMessage(responseJson.message)
          }
      })
      .catch((error) => {
        setspinner(false)

        alert(error)
          console.warn(error)
      });
}


useEffect(() => {
  let mounted = true;
  setspinner(true)

//   const unsubscribe = navigation.addListener('didFocus', () => {
// alert('j')
//     callingVehicleApi()
//   });

  // Update the document title using the browser API
 // const subscription = props.source.subscribe();
  // callingVehicleApi(true)
  // return () => {
  //   // Clean up the subscription
  //   subscription.unsubscribe();
  // };
  
  callingVehicleApi(true)

  return () =>{
  mounted = false; 

  }  
}, [])




const renderlist = ({item}) =>{
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


let status='';
  if(item.status == '1'){
    status ='ON HAND'
  }else if(item.status =='2'){
    status ='MANIFEST'
  }else if(item.status =='3'){
    status ='DISPATCHED'
  }else  if(item.status == '4'){
    status ='SHIPPED'
  }else if(item.status == '5'){
    status ='PICKED UP'
  }else if(item.status == '6'){
    status ='ARRIVED'
  }
  return(
    
<View style={{flexDirection:'row',alignSelf:'center', marginTop:10, paddingHorizontal:5, width:'100%',height:78}} >

<TouchableOpacity
onPress={()=>navigation.push('CarDetails',{datapre:item.id,img:item.images, type:type,Status:status,  baseImagePath: baseImagePath,})}

style={{width:'63%', paddingVertical:3,paddingHorizontal:2,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>
{/* {item.images.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
                    source={{ uri: baseImagePath + item.images[0].thumbnail }} /> :
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} />} */}

{item.images.length > 0 ?
                    <Image style={{width:'35%',height:'100%', resizeMode:'cover'}} source={{ uri: baseImagePath + item.images[0].thumbnail }} /> :
                    <Image style={{width:'35%',height:'100%', resizeMode:'cover'}}  source={require('../images/download.jpeg')} />}
{/* <Image style={{width:'35%',height:'100%', resizeMode:'cover'}} source={require('../images/img-0928-1535139376.jpg')} /> */}

<View style={{ height:'100%',marginLeft:2,justifyContent:'center',width:'65%'}}>

<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>{item.year} {item.make} {item.model}</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>Lot: {item.lot_number}</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>{item.vin}</Text>


</View>

</View>




</View>

</TouchableOpacity>


<View
style={{width:'1.3%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.push('CarDetails',{datapre:item.id,img:item.images, Status:status,type:type , baseImagePath: baseImagePath,})}

style={{width:'35.7%',height:'100%',borderRadius:6,backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%',justifyContent:'center',paddingHorizontal:2, flexDirection:'column'}}>

<Text style={{color:'black',paddingVertical:2, fontSize:11,}}>STATUS: {status}</Text>



<Text style={{color:'black',paddingVertical:2, fontSize:11,}}>ETA DATE: {item.eta}</Text>


<Text style={{color:'black',paddingVertical:2, fontSize:11,}}>LOCATION: {loc}</Text>




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
  
  onPress={()=> {  searchlocationFilterFunction('1');  setsortmodal(false)  }}
  style={{ marginVertical:10,}}>

  <Text>LA</Text>
</TouchableOpacity>

<TouchableOpacity 
  onPress={()=>{ searchlocationFilterFunction('2'); setsortmodal(false)}}

style={{ marginVertical:10,}}>

  <Text>GA</Text>
</TouchableOpacity>


<TouchableOpacity 
  onPress={()=>{  searchlocationFilterFunction('3');  setsortmodal(false)} }

style={{ marginVertical:10,}}>

  <Text>NJ</Text>
</TouchableOpacity>



<TouchableOpacity 
  onPress={()=> {  searchlocationFilterFunction('4');  setsortmodal(false)}}

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

<Modal
    transparent={true}
    visible={sort2modal}
>
<SafeAreaView style={{height:deviceHeight , width:deviceWidth,backgroundColor:'#0006', justifyContent:'center'}}>

  <View style={{justifyContent:'center',width:'80%', borderRadius:15, flexDirection:'column', padding:20, alignSelf:'center', backgroundColor:'white'}}>
<Text style={{alignSelf:'center', fontSize:16, marginBottom:5}}>Please Select Location</Text>

  <TouchableOpacity 
  
  onPress={()=> {     searchFilterFunction('1'); setsort2modal(false)  }}
  style={{ marginVertical:10,}}>

  <Text>ON HAND</Text>
</TouchableOpacity>

<TouchableOpacity 
  onPress={()=>{ searchFilterFunction('2'); setsort2modal(false)}}

style={{ marginVertical:10,}}>

  <Text>MANIFEST</Text>
</TouchableOpacity>


<TouchableOpacity 
  onPress={()=>{ searchFilterFunction('3'); setsort2modal(false)} }

style={{ marginVertical:10,}}>

  <Text>DISPATCHED</Text>
</TouchableOpacity>



<TouchableOpacity 
  onPress={()=> {  searchFilterFunction('4');setsort2modal(false)}}

style={{ marginVertical:10,}}>

  <Text>SHIPPED</Text>
</TouchableOpacity>

<TouchableOpacity 
  onPress={()=> { searchFilterFunction('5'); setsort2modal(false)}}

style={{ marginVertical:10,}}>

  <Text>PICKED UP</Text>
</TouchableOpacity>

<TouchableOpacity 
  onPress={()=> { searchFilterFunction('6'); setsort2modal(false)}}

style={{ marginVertical:10,}}>

  <Text>ARRIVED</Text>
</TouchableOpacity>











<TouchableOpacity 
onPress={()=> { setsort2modal(false)}}
style={{width:'45%',backgroundColor:'red',padding:10,borderRadius:20,marginTop:10, alignSelf:'center', justifyContent:'center'}}>
<Text style={{alignSelf:'center',color:'white'}}>Cancel</Text>
</TouchableOpacity>
</View>
</SafeAreaView>


  
</Modal>

<Modal
    transparent={true}
    visible={sorttitlemodal}
>
<SafeAreaView style={{height:deviceHeight , width:deviceWidth,backgroundColor:'#0006', justifyContent:'center'}}>

  <View style={{justifyContent:'center',width:'80%', borderRadius:15, flexDirection:'column', padding:20, alignSelf:'center', backgroundColor:'white'}}>
<Text style={{alignSelf:'center', fontSize:16, marginBottom:5}}>Please Select Location</Text>

  <TouchableOpacity 
  
  onPress={()=> {     sortt('LA'); setsort2modal(false)  }}
  style={{ marginVertical:10,}}>

  <Text>EXPORTABLE</Text>
</TouchableOpacity>

<TouchableOpacity 
  onPress={()=>{sortt('GA'); setsort2modal(false)}}

style={{ marginVertical:10,}}>

  <Text>PENDING</Text>
</TouchableOpacity>


<TouchableOpacity 
  onPress={()=>{ sortt('NJ'); setsort2modal(false)} }

style={{ marginVertical:10,}}>

  <Text>BOS</Text>
</TouchableOpacity>



<TouchableOpacity 
  onPress={()=> { sortt('TX'); setsort2modal(false)}}

style={{ marginVertical:10,}}>

  <Text>LIEN</Text>
</TouchableOpacity>

<TouchableOpacity 
  onPress={()=> { sortt('TX'); setsort2modal(false)}}

style={{ marginVertical:10,}}>

  <Text>MV907</Text>
</TouchableOpacity>

<TouchableOpacity 
  onPress={()=> { sortt('TX'); setsort2modal(false)}}

style={{ marginVertical:10,}}>

  <Text>REJECTED</Text>
</TouchableOpacity>











<TouchableOpacity 
onPress={()=> { setsort2modal(false)}}
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
onPress={()=>{  navigation.goBack(null);}}
// setisStopCallingAPI(false);setisFooterLoading(false);setdata(['']);
>
<MaterialIcons  name='keyboard-backspace' size={23}/>
</TouchableOpacity>
<Text style={{alignSelf:'center', marginLeft:6}}>Inventory {data.length}</Text>
</View>


{type == 'total' ? <View

style={{height:deviceHeight*0.04, backgroundColor:'white',flexDirection:'row', justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center', marginRight:1}}>Sorting:{type == 'total' ? <Text> locationwise </Text> :  <Text> Statuswise </Text> }</Text>
<TouchableOpacity 
style={{flexDirection:'row',justifyContent:'center', alignSelf:'center'}}
onPress={()=>{  if (type == 'total') {
  setsortmodal(true)
}else{
  setsort2modal(true)
} }}>

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
:
null}


<View style={{width:deviceWidth, flex:1, backgroundColor:AppColors.blue}}>

<FlatList
                         contentInsetAdjustmentBehavior="automatic"
                      data={data}
                     renderItem={renderlist}
                     keyExtractor={(item,index) => index.toString()}
                   onEndReached={loadMoreData}
                     ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.01}
                    // refreshing={refreshing}
                    // onRefresh={handleRefresh}

                  />
<View style={{width:deviceWidth , height:5}} >
  
</View>
                  </View>

    </SafeAreaView>

  );
};


export default Carlist;
