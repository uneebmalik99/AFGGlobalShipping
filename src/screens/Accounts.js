import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Modal,
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
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons'; 
import Feather from  'react-native-vector-icons/dist/Feather'
import { TextInput } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-community/async-storage';

var imageBasePath = ''
var source = {uri:'',cache:false};

const Accounts = ({route, navigation }) => {
  const [search, setSearch] = useState('');
  const[paid  , setpaid] = useState('')
  const[Unpaid  , setUnpaid] = useState('')
  const[total  , settotal] = useState('')
  const [spinner ,setspinner] = useState(false)
  const [pdf ,setpdf] = useState(false)
  const[source , setsource] =useState({uri:'',cache:true})
  const [filteredDataSource, setFilteredDataSource] = useState([
   
    ]
  )


  const [data, setdata] = useState([
   
    ]
  )

  useEffect(() => {
    // Update the document title using the browser API
   // const subscription = props.source.subscribe();

  setspinner(true)
  
   AsyncStorage.getItem('paid').then((paid)=>{
   
    AsyncStorage.getItem('Unpaid').then((Unpaid)=>{
     
      AsyncStorage.getItem('total').then((total)=>{

        setpaid(paid);
        setUnpaid(Unpaid);
        settotal(total)
     
      })
    })
   })


  callingContainerApi(true)
    // return () => {
    //   // Clean up the subscription
    //   subscription.unsubscribe();
    // };
    
  }, []); 

  const  callingContainerApi = (isFirstTimeCaling) => {
      var url = ''
      if (isFirstTimeCaling) {
          url = AppUrlCollection.INVOICE 
          
          
      } else {
          url = AppUrlCollection.INVOICE 
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
                  if (responseJson.data.length > 0) {
                      if (isFirstTimeCaling) {
                        setFilteredDataSource(responseJson.data)
                        setdata(responseJson.data)
                        setspinner(false)
                        console.log('data export is : =-----'+data);
                                                  setspinner(false)

    
                        //  this.setState({ vehicleList: responseJson.data.export, noMoreDataFound: false, isFooterLoading: false })
                      } else {
                    //  this.setState({ vehicleList: this.state.vehicleList.concat(responseJson.data.export), noMoreDataFound: false, isFooterLoading: false })
                          setdata(responseJson.data.export)
                          
    
                          setspinner(false)
    
    
                        }
                  } else {
                      if (isFirstTimeCaling) {
                        setdata('')
                        setspinner(false)

    
                          //this.setState({ vehicleList: [], noMoreDataFound: true, isFooterLoading: false })
                      } else {
                        setspinner(false)

                        setdata('')
    
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
    
    
        }
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      console.log(text);
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = data.filter(
        function (item) {
          const itemData = item.container_number
            ? item.container_number.toUpperCase()
            : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
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
onPress={()=> { source.uri='https://customer.afgglobalshipping.com/uploads/'+item.upload_invoice ; setpdf(true)} }

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

<Modal
          transparent={false}
          visible={pdf}
         >
           <SafeAreaView style={{height:'100%',flex:1,flexDirection:'column', width:deviceWidth}}>
           <TouchableOpacity
           style={{width:50,height:50,justifyContent:'center' ,alignSelf:'flex-end'}}
                onPress={() =>setpdf(false)}>

                  <MaterialIcons name='cancel' size={25} color='red'/>
                {/* <Image
                  style={{width: 30, height: 30}}
                  source={require('../Assets/icons/cancel.png')}
                /> */}
              </TouchableOpacity>
                        <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={{
                      
                      width:'100%',
                      height:"95%",}}/>
                      </SafeAreaView>
        </Modal>
      


<ScrollView>
<View style={{width:deviceWidth, justifyContent:'center', backgroundColor:'#205ae2', paddingHorizontal:30,paddingVertical:5, height:deviceHeight*0.23,}}>
<Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{ color: '#FFF'}}
        />
<View style={{flexDirection:'row',marginBottom:25, width:'100%'}}>

<View style={{width:'10%'}}>
<TouchableOpacity
onPress={()=>navigation.navigate('Dashboard')}
style={{alignSelf:'center'}}

>
<MaterialIcons  name='keyboard-backspace' style={{alignSelf:'center',width:'100%'}} color='white' size={25}/>
</TouchableOpacity>
</View>

<View style={{width:'10%'}}></View>

<View style={{width:'60%'}}>
<Text style={{marginLeft:10,color:'white',alignSelf:'center',fontWeight:'bold', fontSize:16, textAlign:'center'}}>Accounts</Text>
</View>
</View>
</View>



<View style={{height:deviceHeight*0.28, backgroundColor:'#30d5ad',}}>

<View style={{width:'60%',height:'80%',backgroundColor:'#1532c4', paddingVertical:5,paddingHorizontal:4,  borderRadius:10, alignSelf:'center', marginTop:-45}}>

<View style={{height:'40%',paddingHorizontal:5,flexDirection:'column',}}>
<View style={{flexDirection:'row',paddingVertical:2,justifyContent:'space-between'}}>    

<Text style={{color:'white',fontSize:13}}>Total Paid Amount: </Text>

<Text style={{color:'white',fontSize:13}}>${paid}</Text>

</View>
<View style={{flexDirection:'row',paddingVertical:2,justifyContent:'space-between'}}>

<Text  style={{color:'red',paddingVertical:2,fontSize:13}} >Total Amount : </Text>

<Text style={{color:'red',fontSize:13}}> ${Unpaid}</Text>

</View>


</View>


<View style={{height:'50%',flexDirection:'column', paddingHorizontal:5,justifyContent:'center',}}>

<Text style={{alignSelf:'center',color:'white', paddingVertical:4}}>Balance:</Text>

<Text style={{alignSelf:'center',color:'white'}}>${total}</Text>

</View>



</View>
<TextInput style={{width:'80%',borderRadius:20,
borderWidth:1 ,paddingVertical:1,fontSize:15,paddingHorizontal:20,
backgroundColor:'white', marginTop:30,height:30, alignSelf:'center'}}
placeholder='Search Container'
placeholderTextColor='grey'
onChangeText={(text) => searchFilterFunction(text)}
value={search}


/>
</View>


<View style={{height:deviceHeight*0.006, backgroundColor:'#205ae2',justifyContent:'center'}}>

</View>
<View style={{width:deviceWidth,backgroundColor:'black',justifyContent:'center', height:deviceHeight*0.075}}>
<Text style={{color:'white',marginLeft:5 }}>Container invoices</Text>


</View>
<View style={{width:deviceWidth,height:0.5, backgroundColor:'grey'}}>


</View>
<FlatList
                         contentContainerStyle={{backgroundColor:'black', paddingBottom: 50}}
                         contentInsetAdjustmentBehavior="automatic"
                         data={filteredDataSource}
                     renderItem={renderlist}
                     keyExtractor={(item,index) => index.toString()}
                    
 
                     
 
                  />

</ScrollView>
    </SafeAreaView>

  );
};


export default Accounts;
