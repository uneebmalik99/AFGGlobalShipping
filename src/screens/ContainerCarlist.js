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
  TextInput,
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
import {Picker} from '@react-native-picker/picker';



var imageBasePath = ''

const ContainerCarlist = ({ route, navigation }) => {
  const { type, title } = route.params;
  const [spinner , setspinner] =useState(false)
  const [noMoreDataFound ,setnoMoreDataFound] =useState(false)
  const [isFooterLoading , setisFooterLoading] = useState(false)
 const [isStopCallingAPI ,setisStopCallingAPI]=useState(false)
 const [refreshing, setrefreshing] =useState(true)
const [temp1 ,settemp1]= useState([])
  const [location ,setlocation] =useState('Select')
const [locationindex ,setlocationindex] =useState('0')
  const [data, setdata] = useState([])
  const[isCallingFirsttime ,setisCallingFirsttime] =useState(true)
  const[page , setpage] =useState(1)
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([
    
    ]
  )

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      console.log(text);
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(
        function (item) {
      
// alert(item.vehicle[0].lot_number)
          let v = []
          v=item.vehicle
          console.log(';;;'+v);
// 
          //  const itemdata4 = [];
          //  if(vehicle.length !== null){
          //    for(i=0 ; i<v.length ;i++ ){

          //    }
           
          //   }
        //  let myObj = v.find(obj => obj.lot_number.indexOf(text));      

        //  console.log('=='+myObj);
          // const itemdata2 = item.VIN
          
          const itemData = item.container_number
            ? item.container_number.toUpperCase()
            : ''.toUpperCase();

            // const itemData2 = item.vehicle.lot
            // ? item.lot_number.toUpperCase()
            // : ''.toUpperCase();
            
            const itemdata2 = item.booking_number
            ? item.booking_number.toUpperCase()
            : ''.toUpperCase();
          
            let itemdata3 = '' ;
            let itemdata4 = '';
            // item.vehicle[0].lot_number  ? item.vehicle[0].lot_number.toUpperCase()
            // : ''.toUpperCase();
            // var dataitem6 ;

          for(let i =0 ; i < item.vehicle.length ; i++){
            itemdata3 += ','+ item.vehicle[i].lot_number
            itemdata4 += ','+ item.vehicle[i].vin

          }
          itemdata3 = itemdata3.replace(/^\,/, "");
          itemdata4 = itemdata4.replace(/^\,/, "");


            console.log('sfnsdifjfks'+ itemdata3+'------');

            const textData = text.toUpperCase();
          
            if(itemData.indexOf(textData) > -1){
              return itemData.indexOf(textData) > -1;
            }else if(itemdata2.indexOf(textData) > -1){
              return itemdata2.indexOf(textData) > -1;
            }else   
             if(itemdata3.indexOf(textData) > -1  ){

              return itemdata3.indexOf(textData) > -1;   
            }else   
            if(itemdata4.indexOf(textData) > -1  ){

             return itemdata4.indexOf(textData) > -1;   
           }
   
      });
      setFilteredDataSource(newData);
      setSearch(text);
      console.log('text is '+text);
    } else {
      // Inserted text is blank
      console.log('blank');
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };


const sortt =(itemValue,itemIndex) => {
  setspinner(true)
  if(itemIndex == '0'){
    setlocation('Select')
    setlocationindex('0')
  }else if(itemIndex == '1'){
    setlocation('LA')
    setlocationindex('1')
  }else if(itemIndex == '2'){
    setlocation('GA')
    setlocationindex('2')
  }else if(itemIndex == '3'){
    setlocation('NJ')
    // setlocationindex(3)
    setlocationindex('3')
  }else if(itemIndex == '4'){
    setlocation('TX')
    setlocationindex('4')
  }
  
  
  console.warn(location+'-----'+locationindex+',,,,,,,,'+itemValue+'-----'+itemIndex);
  // alert(location+'-----'+locationindex+',,,,,,,,'+itemValue+'-----'+itemIndex)
  
  
    let newarray = [...data]
  
    newarray.sort((a, b) =>{
      if(a.location == itemIndex){
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
                setisFooterLoading(false)

                if (responseJson.data.export.length > 0) {
                    if (isFirstTimeCaling) {
                      setdata(responseJson.data.export)
                      setFilteredDataSource(responseJson.data.export)
                   
                    
                      setspinner(false)
                      console.log('data export is : =-----'+responseJson.data.export);
                      
                    
                   

                    
  
                    } else {
                  //  this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.export), noMoreDataFound: false, isFooterLoading: false })
                        setdata(old => [...old, ...data]);
                        setFilteredDataSource(old =>[...old, ...data])
                        setspinner(false)
                      }

                      if(responseJson.data.export.length > 7){
                        setisStopCallingAPI(false)
                        setnoMoreDataFound(false)
                      }else{
                        setisStopCallingAPI(true)
                        setnoMoreDataFound(true)
                        setisFooterLoading(false)

                      }
                } else {
                    if (isFirstTimeCaling) {
                      setdata('')
                      setnoMoreDataFound(true)
                      setisFooterLoading(false)
                      setisStopCallingAPI(true)
                        //this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                    } else {
                      setnoMoreDataFound(true)
                      setisFooterLoading(false)
                      setisStopCallingAPI(true)
                      setdata('')
                        //this.setState({ isFooterLoading: false, noMoreDataFound: true })
                    }
                }
            } else {
              alert(responseJson.message)
              setspinner(false)
              setisFooterLoading(false)

  
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

const renderFooter = () => {
  if (isFooterLoading === true) {
      return <View style={{paddingVertical:15}}><ActivityIndicator color={AppColors.toolbarColor} size='large' /></View>
  } else {
      return null;
  }
}

const handleRefresh = () => {
  setspinner(true)
  setrefreshing(false,callingContainerApi())
}

const loadMoreData = () => {
  // setisFooterLoading(true)
  if(search == '' ){

  
  setTimeout(() => {
      if (isStopCallingAPI === true) {

      } else {
          if (noMoreDataFound === true) {

          } else {
            setpage(prevState => prevState + 1);

            // setpage(page+1)
            callingContainerApi(false)
          }
      }
  }, 100);
}
}
useEffect(() => {
  // Update the document title using the browser API
 // const subscription = props.source.subscribe();
 const unsubscribe = navigation.addListener('focus', () => {
  callingContainerApi()
 //  alert('h')
 //Put your Data loading function here instead of my loadData()
});
setspinner(true)
  callingContainerApi(true)
  // return () => {
  //   // Clean up the subscription
  //   subscription.unsubscribe();
  // };
  return unsubscribe;
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
onPress={()=>navigation.navigate('ExportCarDetails',{datapre:item.id})}

style={{width:'63%', paddingVertical:3,paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
<View style={{  width:'100%',height:'100%', flexDirection:'column'}}>

<View style={{flexDirection:'row',width:'100%',height:'100%'}}>
{item.exportImages.length > 0 ?
                    <Image style={{width:'35%',height:'100%', resizeMode:'cover'}} source={{ uri: imageBasePath + item.exportImages[0].thumbnail }} /> :
                    <Image style={{width:'35%',height:'100%', resizeMode:'cover'}}  source={require('../images/download.jpeg')} />}
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
onPress={()=>navigation.navigate('ExportCarDetails',{datapre:item.id})}

style={{width:'35.7%', paddingHorizontal:3,height:'100%',borderRadius:6, backgroundColor:'white'}}>
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
<Text style={{alignContent:'center',textAlign:'center', marginLeft:6}}>Container {data.length}</Text>
</View>


</View>


<View

style={{height:deviceHeight*0.05,paddingHorizontal:30,marginVertical:5, backgroundColor:'white',justifyContent:'center'}}>
 <TextInput
          style={{height: 25,
    borderWidth: 0.4,
    paddingLeft: 20,
    borderRadius:30,
    fontSize:11,
    paddingVertical:5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',}}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Container by VIN,LOT and Container no."
        />
</View>
{/* <View

style={{height:deviceHeight*0.04, backgroundColor:'white',flexDirection:'row', justifyContent:'center'}}>
<Text style={{fontSize:12,alignSelf:'center',marginRight:10}}>Sorting: locationwise:{location}</Text>
<Picker
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


</Picker>
</View> */}

<View style={{width:deviceWidth, flex:1, backgroundColor:AppColors.blue}}>

{/* <Picker
  selectedValue={location}
  style={{height: 18, width: 45}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({language: itemValue})
  }>
 <Picker.Item style={{fontSize:12}} label="Select" value="0" />
  <Picker.Item label="GA" value="1" />
  <Picker.Item label="NJ" value="2" />
  <Picker.Item label="TX" value="3" />
  <Picker.Item label="CA" value="4" />
</Picker> */}

  

<FlatList
                         contentContainerStyle={{ paddingBottom: 50}}
                         contentInsetAdjustmentBehavior="automatic"
                      data={filteredDataSource}
                     renderItem={renderlist}
                     extraData={data}
                     keyExtractor={(item,index) => index.toString()}
                    //  refreshing={refreshing}
                     onEndReached={loadMoreData}
                     ListFooterComponent={renderFooter}
                    onEndReachedThreshold={0.01}
                    // onRefresh={handleRefresh}

 
                     
 
                  />
                  </View>

    </SafeAreaView>

  );
};


export default ContainerCarlist;
