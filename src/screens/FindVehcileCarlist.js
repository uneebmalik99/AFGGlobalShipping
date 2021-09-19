import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  ImageBackground,
  ActivityIndicator,
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
import Spinner from 'react-native-loading-spinner-overlay';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import { FA5Style } from 'react-native-vector-icons/dist/lib/create-icon-set-from-fontawesome5';


var baseImagePath = '';

const FindVehcileCarlist = ({route, navigation }) => {
  const { type, title } = route.params;
  const [refreshing, setrefreshing] =useState(true)
  const [spinner , setspinner] =useState(false)
  const [noMoreDataFound ,setnoMoreDataFound] =useState(false)
  const [isFooterLoading , setisFooterLoading] = useState(false)
  const [isStopCallingAPI ,setisStopCallingAPI]=useState(false)
  const[isCallingFirsttime ,setisCallingFirsttime] =useState(true)

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(
        function (item) {
          const itemData = item.lot_number
            ? item.lot_number.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
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
  // const handleSearch = text => {
  //   const formattedQuery = text.toLowerCase();
  //   const filteredData = filter(fullData, user => {
  //     return contains(user, formattedQuery);
  //   });
  //   setFilteredDataSource(filteredData);
  //   setQuery(text);
  // };

  // const contains = ({ name, email }, query) => {
  //   const { first, last } = name;
  
  //   if (first.includes(query) || last.includes(query) || email.includes(query)) {
  //     return true;
  //   }
  
  //   return false;
  // };

  // const searchFilterFunction = (text) => {
  //   // Check if searched text is not blank
  //   if (text) {
  //     console.log(text);
  //     // Inserted text is not blank
  //     // Filter the masterDataSource
  //     // Update FilteredDataSource
  //     const newData = data.filter(
  //       function (item) {
          
  //         // const itemdata2 = item.VIN
          
  //         const itemData =  item.vin
  //           ?  item.vin.toUpperCase()
  //           :''.toUpperCase();

  //           const itemData2 =  item.lot_number
  //           ?  item.lot_number.toUpperCase()
  //           : ''.toUpperCase();

  //         const textData = text.toUpperCase();
  //         if(itemData.indexOf(textData) > -1){
  //           return  itemData.indexOf(textData) > -1;
  //         }
          
  //        else{
  //           return  itemData2.indexOf(textData) > -1;
  //         }
  //     });
  //     setFilteredDataSource(newData);
  //     setSearch(text);
  //     console.log('text is '+text);
  //   } else {
  //     // Inserted text is blank
  //     console.log('blank');
  //     // Update FilteredDataSource with masterDataSource
  //     setFilteredDataSource(data);
  //     setSearch(text);
  //   }
  // };
  const [search, setSearch] = useState('');
  const[page , setpage] =useState(1)
  const [filteredDataSource, setFilteredDataSource] = useState([
    
    ]
  )


  const [data, setdata] = useState([
    
  ]
)



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
  if(search == ''){

 
  setTimeout(() => {
      if (isStopCallingAPI === true) {

      } else {
          if (noMoreDataFound === true) {

          } else {
            setpage(prevState => prevState + 1);

            // setpage(page+1)
            callingVehicleApi(false)
          }
      }
  }, 100);
}

}


const callingVehicleApi = async (isCallingFirsttime) => {
  setrefreshing(true)

  var url ='';

  if (isCallingFirsttime === true) {
    url =AppUrlCollection.VEHILE_LIST ;
    setisFooterLoading(false)
    console.warn(page);
    setpage(prevState => prevState + 1);

     // this.setState({ isLoading: true, isFooterLoading: false })
  } else {
    url = AppUrlCollection.VEHILE_LIST + 'page=' + page;
    console.warn(page);
    
    setisFooterLoading(true)
      //this.setState({ isLoading: false, isFooterLoading: true })
  }
//  console.log('MAIN API :;', AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId)
  // fetch(AppUrlCollection.VEHILE_LIST + 'page=' + this.state.page + '&location=' + locationId + '&search_str=' + this.state.searchTxt + '&status=' + statusId, {



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

                  setFilteredDataSource(old =>[...old, ...data])
                  setdata(old => [...old, ...data]);
                  setnoMoreDataFound(false)
                  setisStopCallingAPI(false)

                  
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

      setrefreshing(false)

}


useEffect(() => {
  // Update the document title using the browser API
 // const subscription = props.source.subscribe();
setspinner(true)
let mounted = true;
   callingVehicleApi(true)
  return () => {
    mounted=false

    // Clean up the subscription
    // subscription.unsubscribe();
  };

   
}, []); 

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
onPress={()=>navigation.navigate('CarDetails',{type:'findVehicles',datapre:item.id,img:item.images,Status:status,  baseImagePath: baseImagePath,})}


style={{width:'59%', paddingVertical:3,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%', height:'100%', flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>
  {item.images.length > 0 ?

<Image style={{width:'35%',height:'100%', resizeMode:'cover'}} source={{ uri: baseImagePath+item.images[0].thumbnail}} />
:
    <Image style={{width:'35%',height:'100%', resizeMode:'cover'}} source={require('../images/download.jpeg')} />

}

<View style={{ height:'100%',marginLeft:4, justifyContent:'center', width:'64%'}}>

<Text style={{color:'black',paddingVertical:2, fontSize:11,}}>{item.year} {item.make} {item.model}</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:11,}}>Lot: {item.lot_number}</Text>
<Text style={{color:'black',paddingVertical:2, fontSize:11,}}>{item.vin}</Text>


</View>

</View>




</View>

</TouchableOpacity>


<View
style={{width:'1%'}}>

</View>


<TouchableOpacity
onPress={()=>navigation.navigate('CarDetails',{type:'findVehicles',datapre:item.id,img:item.images,Status:status, baseImagePath: baseImagePath,})}

style={{width:'40%', paddingHorizontal:1,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', justifyContent:'center', flexDirection:'column'}}>

<Text style={{color:'black', fontSize:11,}}>STATUS: {status}</Text>

<Text style={{color:'black', fontSize:11,}}>CONTAINER: {item.container_number}</Text>

<Text style={{color:'black',fontSize:11,}}>ETA DATE: {item.eta}</Text>


<Text style={{color:'black', fontSize:11,}}>LOCATION: {loc}</Text>




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
onPress={()=>{ navigation.navigate('Dashboard')}}

>
<MaterialIcons  name='keyboard-backspace' size={23}/>
</TouchableOpacity>

<Text style={{marginLeft:10,alignSelf:'center', color:'white'}}>FIND VEHICLES {data.length}</Text>

{/* <Text style={{marginLeft:6}}>FIND VEHICLES</Text> */}
</View>
<View

style={{height:deviceHeight*0.05,paddingHorizontal:30,marginVertical:5, backgroundColor:'white',justifyContent:'center'}}>
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
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search by Lot or VIN"
        />
</View>


<View style={{width:deviceWidth, flex:1, backgroundColor:AppColors.blue}}>

<FlatList
                         contentContainerStyle={{ paddingBottom: 5}}
                         contentInsetAdjustmentBehavior="automatic"
                         data={filteredDataSource}
                         renderItem={renderlist}
                         extraData={filteredDataSource}
                     keyExtractor={(item,index) => index.toString()}
                     onEndReached={loadMoreData}
                     ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.01}
                    //  refreshing={refreshing}
                    //  onRefresh={handleRefresh}
                    
 
                     
 
                  />
</View>
    </SafeAreaView>

  );
};


export default FindVehcileCarlist;
