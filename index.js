/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import AppConstance from './src/constance/AppConstance';
import AsyncStorage from '@react-native-community/async-storage';


// messaging(),setBackgroundMessageHandler(async remoteMessage =>{
//     console.log('Message is HAndled in the Background', remoteMessage);
// });
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // AppConstance.NOTIFICATIONDATA


// console.log(`${hours}:${minutes}:${seconds}`)
// console.log(date.getDate());
  

// console.log(JSON.stringify(remoteMessage.notification));


// if(remoteMessage.notification.title === 'ALERT'){
//   let Alert ;

// //   Alert.push(JSON.stringify(remoteMessage.notification));
// //   console.log('yyyyyyyy'+Alert);
// AsyncStorage.getItem('savedIds', (err, result) => {
//   var id = [remoteMessage.notification];
//   if (result !== null) {
//     console.log('Data Found', result);
//     var newIds = result.concat(id);
//     AsyncStorage.setItem('savedIds', JSON.stringify(newIds));
//     // AsyncStorage.setItem('savedIds', newIds);

//   } else {
//     console.log('Data Not Found');
//     var idi = [remoteMessage.notification];
//     var newIds =idi;
//     newIds= JSON.stringify(newIds);
//     // AsyncStorage.setItem('savedIds', JSON.stringify(newIds));
//     AsyncStorage.setItem('savedIds', newIds);

//   }
// });
// // AsyncStorage.mergeItem(Alert)
// // try{
// //   AsyncStorage.getItem('ANOT').
// //   then((value) => {
// //         if (value === null) {
// //           // Alert = remoteMessage.notification
// //           Alert=JSON.stringify(remoteMessage.notification.body); 
          
// //           console.log('valueis :::::::::'+Alert);
// //           save(Alert);
// //         }else{
// //           Alert.push(value); 
// //           Alert.push(JSON.stringify(remoteMessage.notification.body)); 
// //           console.log('value is at else hai vlaue :::::::::'+value);
// //           console.log('value is hai vlaue :::::::::'+Alert);

// //           save(Alert)
// //         }
// //       })
// //       try {
// //         AsyncStorage.setItem('ANOT', Alert);
// //         Alert= [];
// //      } catch (error) {
// //        console.log('error at save alerts ::::::::::::'+error);
// //      }
// //     }
// //    catch (error) {
// //     console.log('error at get alerts ::::::::::::'+error);
// //     // Error saving data
// //   } 
//  }
// else{
//   try {
//     await AsyncStorage.mergeItem('datanot', JSON.stringify(remoteMessage.notification));
//   } catch (error) {
//     console.log('error at save notificration ::::::::::::'+error);
//     // Error saving data
//   }
// }

// const save =(Alert) =>{
// try{
//   AsyncStorage.setItem('ANOT', Alert);
//             console.log('saving');
// }
// catch(error){
//   console.log(error)
// }
// }


  });
AppRegistry.registerComponent(appName, () => App);








// Message handled in the background! {"collapseKey": "com.afgglobalshipping", "data": 




// {"data is ": "1234567", "type": "Notification"}, 


// "from": "185063246347", "messageId": "0:1611381834355599%9cdbf8869cdbf886", "notification":


// {"android": {"sound": "default"}, "body": "checking", "title": "checking "}, "sentTime": 1611381834046, "ttl": 2419200}