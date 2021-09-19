import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground,
  FlatList,
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


var baseImagePath = '';
var page = 1;
const TotalTitleCarlist = ({route, navigation }) => {
  const { type, title } = route.params;
  const [spinner , setspinner] =useState(false)
  const [noMoreDataFound ,setnoMoreDataFound] =useState(false)
  const [isFooterLoading , setisFooterLoading] = useState(false)
  const [isStopCallingAPI ,setisStopCallingAPI]=useState(false)
  const [refreshing, setrefreshing] =useState(true)

  // const [loc , setloc] = useState('')

  const [data, setdata] = useState([
    

  ]
)
//   const [data, setdata] = useState([
//     {
//       date: '20-12-2020',
//       Description: 'Description',
//       Lot:'473890',
//       N:'CA',
 
//     },
    

//     {
//     date: '20-12-2020',
//       Description: 'Description',
//       Lot:'473890',
//       N:'CA',
//     },

//     {
//       date: '20-12-2020',
//       Description: 'Description',
//       Lot:'473890',
//       N:'CA',
//     },

//   ]
// )


const handleRefresh = () => {
  setspinner(true)
  setrefreshing(false,callingVehicleApi())
  // this.setState({ refreshing: false }, ()=>{this.fetchCats()});
}
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
            page=page+1;
            // setpage(page+1)
            callingVehicleApi(false)
          }
      }
  }, 100);
}


const callingVehicleApi = async (isCallingFirsttime) => {
  setrefreshing(true)

  if (isCallingFirsttime) {
    setisFooterLoading(false)
    console.warn('1');

     // this.setState({ isLoading: true, isFooterLoading: false })
  } else {
    console.warn('2');
    setisFooterLoading(true)
      //this.setState({ isLoading: false, isFooterLoading: true })
  }
//  console.log('MAIN API :;', AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)
  // fetch(AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId, {

var url = '';

  url = AppUrlCollection.VEHILE_LIST + 'page=' + page + '&title=' + 'all' ;

 

//else{
//   url = AppUrlCollection.VEHILE_LIST;
// }

    fetch(url , {

    method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'authkey': AppConstance.USER_INFO.USER_TOKEN
      },
  })
      .then((response) => response.json())
      .then((responseJson) => {

          if (responseJson.status == AppConstance.API_SUCESSCODE) {
              baseImagePath = responseJson.data.other.vehicle_image;
              let data = responseJson.data.vehicleList;
              setisFooterLoading(false)
              //this.setState({ isLoading: false, isFooterLoading: false })
              if (data.length > 0) {
                setspinner(false)
                  // this.setState({ vehicleList: [...this.state.vehicleList, ...data], noMoreDataFound: false })
                  //this.setState({ vehicleList: this.state.vehicleList.concat(data), noMoreDataFound: false })
                  // setdata.push(data)
                  setdata(old => [...old, ...data]);
                  // setdata(data)
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

  // Update the document title using the browser API
 // const subscription = props.source.subscribe();
  callingVehicleApi(true)
  // return () => {
  //   // Clean up the subscription
  //   subscription.unsubscribe();
  // };
  
   
  return () => mounted = false;
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
onPress={()=>navigation.navigate('CarDetails',{ type:type, datapre : item, baseImagePath: baseImagePath,})}

style={{width:'63%', paddingVertical:3,paddingHorizontal:2,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>
{/* {item.images.length > 0 ? <Image style={{ width: undefined, height: undefined, flex: 1 }}
                    source={{ uri: baseImagePath + item.images[0].thumbnail }} /> :
                    <Image style={{ width: undefined, height: undefined, flex: 1 }} source={require('../Images/logo_final.png')} />} */}

{item.images.length > 0 ?
                    <Image style={{width:'35%',height:'100%', resizeMode:'cover'}} source={{ uri: baseImagePath + item.images[0].thumbnail }} /> :
                    <Image style={{width:'35%',height:'100%', resizeMode:'cover'}}  source={require('../images/img-0928-1535139376.jpg')} />}
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
onPress={()=>navigation.navigate('CarDetails',{datapre:item, type:type , baseImagePath: imageBasePath,})}

style={{width:'35.7%', paddingVertical:2,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%',justifyContent:'center', flexDirection:'column'}}>

<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>STATUS: {status}</Text>



<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>ETA DATE: 03/10/2020</Text>


<Text style={{color:'black',paddingVertical:2, fontSize:12,}}>LOCATION: {loc}</Text>




</View>

</TouchableOpacity>

</View>

  
  
  )
  
   }

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
onPress={()=>{  navigation.goBack(null);}}
// setisStopCallingAPI(false);setisFooterLoading(false);setdata(['']);
>
<MaterialIcons  name='keyboard-backspace' size={23}/>
</TouchableOpacity>
<Text style={{alignSelf:'center', marginLeft:6}}>inventory {data.length}</Text>
</View>
<View

style={{height:deviceHeight*0.04, backgroundColor:'white',justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center',marginRight:10}}>Sorting: locationwise</Text>
</View>


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

                  </View>

    </SafeAreaView>

  );
};


export default TotalTitleCarlist;
