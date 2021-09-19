import React,{useEffect,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/Route/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { not, Value } from 'react-native-reanimated';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import Welcome from '../AFGGlobalShipping/src/screens/Welcome'
import Signin from '../AFGGlobalShipping/src/screens/Signin'
import Contactus from '../AFGGlobalShipping/src/screens/Contactus'
import Tracking from '../AFGGlobalShipping/src/screens/Tracking';
import Dashboard from '../AFGGlobalShipping/src/screens/Dashboard';
import Carlist from '../AFGGlobalShipping/src/screens/Carlist';
import CarDetails from '../AFGGlobalShipping/src/screens/CarDetails';
import alerts from '../AFGGlobalShipping/src/screens/alerts'
import ContainerCarlist from '../AFGGlobalShipping/src/screens/ContainerCarlist';
import Drawer from '../AFGGlobalShipping/src/screens/Drawer';
import TrackingSearchDetails from '../AFGGlobalShipping/src/screens/TrackingSearchDetails';
import FindVehcileCarlist from '../AFGGlobalShipping/src/screens/FindVehcileCarlist';
import Prices from '../AFGGlobalShipping/src/screens/Prices';
import Notifications from '../AFGGlobalShipping/src/screens/Notifications'
import Towing from '../AFGGlobalShipping/src/screens/Towing'
import Warehousing from "../AFGGlobalShipping/src/screens/Warehousing";
import Shipping from "../AFGGlobalShipping/src/screens/Shipping";
import DrawerWithoutlogin from "../AFGGlobalShipping/src/screens/DrawerWithoutlogin";
import Accounts from "../AFGGlobalShipping/src/screens/Accounts";
import Exportlist from '../AFGGlobalShipping/src/screens/Exportlist';
import TotalCarlist from '../AFGGlobalShipping/src/screens/TotalCarlist';
import NJVehiclesCarlist from '../AFGGlobalShipping/src/screens/NJVehiclesCarlist';
import GAVehiclesCarlist from '../AFGGlobalShipping/src/screens/GAVehivlesCarlist';
import CAVehiclesCarlist from '../AFGGlobalShipping/src/screens/CAVehiclesCarlist';
import TXVehiclesCarlist from '../AFGGlobalShipping/src/screens/TXVehiclesCarlist';
import TotalTitleCarlist from '../AFGGlobalShipping/src/screens/TotalTitleCarlist';
import NJTitlesCarlist from '../AFGGlobalShipping/src/screens/NJTitlesCarlist';
import GATitlesCarlist from '../AFGGlobalShipping/src/screens/GATitlesCarlist';
import CATitilesCarlist from '../AFGGlobalShipping/src/screens/CATitilesCarlist';
import TXTitlesCarlist from '../AFGGlobalShipping/src/screens/TXTitlesCarlist';
import SplashScreen  from "../AFGGlobalShipping/src/screens/SplashScreen";
import Setting from '../AFGGlobalShipping/src/screens/Setting';
import Faqs from '../AFGGlobalShipping/src/screens/Faqs';
import ExportCarDetails from '../AFGGlobalShipping/src/screens/ExportCarDetails'
import ContainerCarDetails from '../AFGGlobalShipping/src/screens/ContainerCarDetails';
import Welcomescreen from '../AFGGlobalShipping/src/screens/Welcomescreen';
import AppConstance from './src/constance/AppConstance';
import ExportImageEdit from '../AFGGlobalShipping/src/screens/ExportImageEdit'
import CarEditimages from './src/screens/CarEditimages';
import CarEditimages2 from './src/screens/CarEditimages2';





const App = () => {


    const Stack = createStackNavigator();

    // useEffect(() => {
    //     const unsubscribe = messaging().onMessage(async remoteMessage => {
    //       Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //     });
    const [notifications , setnotifications] = useState('0')
    const [initialRoute, setInitialRoute] = useState('');

    //     return unsubscribe;
    //   }, []);
    // }
    useEffect(() => {

      messaging()
  .subscribeToTopic('AFGNOTIFICATION')
  .then(() => console.log('Subscribed to topic!'));



  AsyncStorage.getItem('Notification').then((value)=>{
      setnotifications(value)
  })
        messaging()
        .requestPermission()
        .then(authStatus =>{
            console.log('Apns ',authStatus);
            if( authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL){
                messaging()
                .getToken()
                .then(token =>{
                    console.log('messaging.gettoken:',token);
                    AsyncStorage.setItem('token' , token)

                    AppConstance.USER_TOKEN = token
                });
                messaging().onTokenRefresh(token =>{
                    console.log('messaging.gRefresettoken:',token);
                    AppConstance.USER_TOKEN = token



                });
                // if(notifications == '1'){
                  // messaging().getInstance().subscribeToTopic('news')
                  // FirebaseMessaging.getInstance().subscribeToTopic("all");

                //  FirebaseMessaging.getInstance().subscribeToTopic("news");
 messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    
  const regex = /(<([^>]+)>)/ig;
  const result = remoteMessage.notification.body.replace(regex, '');
    Alert.alert(result);
    console.log('notfication is :::::::::::::::::'+remoteMessage);

});



messaging()
.getInitialNotification()
.then(remoteMessage => {
  if (remoteMessage) {
    console.log(
      'Notification caused app to open from quit state:',
      remoteMessage.notification,
    );
AppConstance.NOTIFICATION = '1'
console.log('-----------------------::::::::::::::::::::::_--------'+remoteMessage.data.type);
if (remoteMessage.data.type == '0') {
  AppConstance.NTYPE = '0';
  
  
}else{
  AppConstance.NTYPE = '1';

}
AppConstance.NOTIFICATIONDATA = remoteMessage.notification
    //   setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //   navigation.navigate('Notifications',{remoteMessage})
  }
});





// }else{

// }

                // fcmUnscribe = messaging().onMessage(async remoteMessage =>{
                //     alert('A new FCM message arrived!', remoteMessage.notification.body);        
                //                 console.log('A new message Arrived',remoteMessage)
                // })
            }
        })
       
        
      }, []);   
    
 return (
  <NavigationContainer>

<Stack.Navigator 
   initialRouteName={initialRoute}
   >

     
<Stack.Screen name='SplashScreen' component={SplashScreen}  options={{headerShown:false,}} />

  <Stack.Screen name='Welcomescreen' component={Welcomescreen} options={{headerShown:false,}} />
  <Stack.Screen name='Welcome' component={Welcome}  options={{headerShown:false,}} />
  <Stack.Screen name='Signin' component={Signin}  options={{headerShown:false,}} />
  <Stack.Screen name='Contactus' component={Contactus}  options={{headerShown:false,}} />
  <Stack.Screen name='Tracking' component={Tracking}  options={{headerShown:false,}} />
  <Stack.Screen name='Towing' component={Towing}  options={{headerShown:false,}} />

  <Stack.Screen name='Warehousing' component={Warehousing}  options={{headerShown:false,}} />
  <Stack.Screen name='Shipping' component={Shipping}  options={{headerShown:false,}} />
  <Stack.Screen name='DrawerWithoutlogin' component={DrawerWithoutlogin}  options={{headerShown:false,}} />
  <Stack.Screen name='Exportlist' component={Exportlist}  options={{headerShown:false,}} />
  <Stack.Screen name='Setting' component={Setting}  options={{headerShown:false,}} />


  
  
  <Stack.Screen name='Dashboard' component={Dashboard}  options={{headerShown:false,}} />
  <Stack.Screen name='Carlist' component={Carlist}  options={{headerShown:false,}} />
  <Stack.Screen name='Faqs' component={Faqs}  options={{headerShown:false,}} />




  <Stack.Screen name='TotalCarlist' component={TotalCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='NJVehiclesCarlist' component={NJVehiclesCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='GAVehiclesCarlist' component={GAVehiclesCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='CAVehiclesCarlist' component={CAVehiclesCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='TXVehiclesCarlist' component={TXVehiclesCarlist}  options={{headerShown:false,}} />
  
  <Stack.Screen name='TotalTitleCarlist' component={TotalTitleCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='NJTitlesCarlist' component={NJTitlesCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='GATitlesCarlist' component={GATitlesCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='CATitilesCarlist' component={CATitilesCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='TXTitlesCarlist' component={TXTitlesCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='ExportCarDetails' component={ExportCarDetails}  options={{headerShown:false,}} />
  <Stack.Screen name='ContainerCarDetails' component={ContainerCarDetails}  options={{headerShown:false,}} />

  <Stack.Screen name='ExportImageEdit' component={ExportImageEdit}  options={{headerShown:false,}} />

  <Stack.Screen name='CarDetails' component={CarDetails}  options={{headerShown:false,}} />
  <Stack.Screen name='alerts' component={alerts}  options={{headerShown:false,}} />
  <Stack.Screen name='ContainerCarlist' component={ContainerCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='Drawer' component={Drawer}  options={{headerShown:false,}} />
  <Stack.Screen name='TrackingSearchDetails' component={TrackingSearchDetails}  options={{headerShown:false,}} />
  <Stack.Screen name='FindVehcileCarlist' component={FindVehcileCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='Prices' component={Prices}  options={{headerShown:false,}} />
  <Stack.Screen name='Notifications' component={Notifications}  options={{headerShown:false,}} />
  <Stack.Screen name='Accounts' component={Accounts}  options={{headerShown:false,}} />

  
  
  <Stack.Screen name='CarEditimages' component={CarEditimages}  options={{headerShown:false,}} />

  <Stack.Screen name='CarEditimages2' component={CarEditimages2}  options={{headerShown:false,}} />

   </Stack.Navigator>
 
  </NavigationContainer>
 );
}

export default App;





























// import React from 'react';
// import {
//   Button,
//   View
// } from 'react-native';
// import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createDrawerNavigator } from '@react-navigation/drawer'

// import Settings from './src/Screens/Settings'


// const Stack = createStackNavigator();
// const Tabs = createBottomTabNavigator();
// const Drawer = createDrawerNavigator()



// class App extends React.Component {

//   state = {
//     loggedIn: false
//   }

//   login = () => {
//     this.setState({loggedIn: true})
    
//   }

//   SignIn = ({navigation}) => {
//     return (
//       <Stack.Navigator>
//         <Stack.Screen name='SignIn' component={SignIn} options={{headerLeft: null, headerRight: () => (
//           <Button title='Logout' onPress={() => this.setState({loggedIn: false})}/>
//         )}}/>
//         <Stack.Screen name='SignUp' component={SignUp} options={{headerRight: () => (
//           <Button title='Logout' onPress={() => this.setState({loggedIn: false})}/>
//         )}}/>
//       </Stack.Navigator>
//     )
//   }

//   SignUp = () => {
//     return (
//       <Drawer.Navigator>
//         <Drawer.Screen name='Settings' component={Settings} />
//       </Drawer.Navigator>
//     )
//   }

//   render() {
//     return (
//       <>
       
//             <NavigationContainer>
//               <Tabs.Navigator>
//                 <Tabs.Screen name='SignIn' children={SignIn} />
//                 <Tabs.Screen name='SignUp' children={SignUp} />
//               </Tabs.Navigator>
//             </NavigationContainer>
//           :
//           <View>
// <Text>Hiii</Text>          </View>
        
//       </>
//     )
//   }
// }

// export default App;
























// // import React from 'react';
// // import Navigation from './src/Route/navigation';
// // import 'react-native-gesture-handler';
// // import { NavigationContainer } from '@react-navigation/native';
// // import 'react-native-gesture-handler';
// // import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';

// // function App() {
// //     return (
// //         <NavigationContainer>{/* The rest of your code*/}</NavigationContainer>
// //     );
// // }export default App
// // export default () => <Navigation />;

// // <NavigationContainer>
// // {/* Rest of your app code */}
// // </NavigationContainer>

// // const App = () => {
// //     return (
// //       <Navigation>
// //         {/* Rest of your app code */}
// //       </Navigation>
// //     );
// //   };
  
// //   export default App;