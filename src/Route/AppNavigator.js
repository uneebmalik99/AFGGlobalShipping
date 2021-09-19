import * as React from 'react';
import {  Button, } from 'react-native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { View, Text, BlurView,TouchableOpacity, TextInput, StyleSheet, Platform, BackHandler, Image, ScrollView,ImageBackground } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {DrawerContentScrollView,DrawerItemList,DrawerItem,} from '@react-navigation/drawer';
import Welcome from '../screens/Welcome'
import Signin from '../screens/Signin'
import Contactus from '../screens/Contactus'
import AppConstance from '../constance/AppConstance';
import { SafeAreaView } from 'react-native-safe-area-context';
import Tracking from '../screens/Tracking';
import Dashboard from '../screens/Dashboard';
import Carlist from '../screens/Carlist';
import CarDetails from '../screens/CarDetails';
import alerts from '../screens/alerts'
import ContainerCarlist from '../screens/ContainerCarlist';
import Drawer from '../screens/Drawer';
import TrackingSearchDetails from '../screens/TrackingSearchDetails';
import FindVehcileCarlist from '../screens/FindVehcileCarlist';
import Prices from '../screens/Prices';
import Notifications from '../screens/Notifications'
import Towing from '../screens/Towing'
import Warehousing from "../screens/Warehousing";
import Shipping from "../screens/Shipping";
import DrawerWithoutlogin from "../screens/DrawerWithoutlogin";
import Accounts from "../screens/Accounts";
import Exportlist from '../screens/Exportlist';
import TotalCarlist from '../screens/TotalCarlist';
import NJVehiclesCarlist from '../screens/NJVehiclesCarlist';
import GAVehiclesCarlist from '../screens/GAVehivlesCarlist';
import CAVehiclesCarlist from '../screens/CAVehiclesCarlist';
import TXVehiclesCarlist from '../screens/TXVehiclesCarlist';
import TotalTitleCarlist from '../screens/TotalTitleCarlist';
import NJTitlesCarlist from '../screens/NJTitlesCarlist';
import GATitlesCarlist from '../screens/GATitlesCarlist';
import CATitilesCarlist from '../screens/CATitilesCarlist';
import TXTitlesCarlist from '../screens/TXTitlesCarlist';
import SplashScreen  from "../screens/SplashScreen";
import Setting from '../screens/Setting';
import Faqs from '../screens/Faqs';
import ExportCarDetails from '../screens/ExportCarDetails'
import ContainerCarDetails from '../screens/ContainerCarDetails';
import Welcomescreen from '../screens/Welcomescreen'
import messaging from '@react-native-firebase/messaging';
import ExportImageEdit from '../screens/ExportImageEdit';
import CarEditimages from '../screens/CarEditimages';
import CarEditimages2 from '../screens/CarEditimages2';

const Stack = createStackNavigator();

const AppNavigator = () => {

  const [initialRoute, setInitialRoute] = React.useState('');

  React.useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    // messaging().onNotificationOpenedApp(remoteMessage => {
    //   console.log(
    //     'Notification caused app to open from background state:',
    //     remoteMessage.notification,
    //   );
    //   navigation.navigate(remoteMessage.data.type);
    // });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // navigation.navigate('Notifications',{remoteMessage})
alert('hio')
          // setInitialRoute('Notifications'); // e.g. "Settings"
        }
      });
  }, []);

 

 return (
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
  <Stack.Screen name='CarEditimages' component={CarEditimages}  options={{headerShown:false,}} />
  <Stack.Screen name='CarEditimages2' component={CarEditimages2}  options={{headerShown:false,}} />

  
  

  <Stack.Screen name='CarDetails' component={CarDetails}  options={{headerShown:false,}} />
  <Stack.Screen name='alerts' component={alerts}  options={{headerShown:false,}} />
  <Stack.Screen name='ContainerCarlist' component={ContainerCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='Drawer' component={Drawer}  options={{headerShown:false,}} />
  <Stack.Screen name='TrackingSearchDetails' component={TrackingSearchDetails}  options={{headerShown:false,}} />
  <Stack.Screen name='FindVehcileCarlist' component={FindVehcileCarlist}  options={{headerShown:false,}} />
  <Stack.Screen name='Prices' component={Prices}  options={{headerShown:false,}} />
  <Stack.Screen name='Notifications' component={Notifications}  options={{headerShown:false,}} />
  <Stack.Screen name='Accounts' component={Accounts}  options={{headerShown:false,}} />

  
  
  
  
   </Stack.Navigator>
 
 );
}

export default AppNavigator;
