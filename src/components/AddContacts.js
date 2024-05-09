import React,{useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import database from './database.jsx';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import { Text,
  TextInput,
  Button,

} from 'react-native-paper';
const AddContacts = () => {
  const navigation = useNavigation();
  const [name,setName]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [landlineNumber,setLandlineNumber]=useState('');
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleSave=()=>{
    const data={
       name:name,
       number:number,
       landline:landline,
     }
     console.log(data)
   }
  //  const renderFileData = () => {
  //   if (fileData) {
  //     return <Image source={{ uri: 'data:image/jpeg;base64,' + fileData }}
  //       style={styles.images}
  //     />
  //   }
  //  }
  //  const renderFileUri = () => {
  //   if (fileUri) {
  //     return <Image
  //       source={{ uri: fileUri }}
  //       style={styles.images}
  //     />
  //   }
  // }
  //  const launchNativeCamera = () => {
  //   let options = {
  //     includeBase64: true,
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   launchCamera(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorCode) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else {
  //       const source = { uri: response.uri };
  //       console.log('response', JSON.stringify(response));
  //       setFileData(response.assets[0].base64);
  //       setFileUri(response.assets[0].uri)
  //     }
  //   });

  // }
   const launchNativeImageLibrary = () => {
    let options = {
      includeBase64: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets.uri };
        console.log('response', JSON.stringify(response));
        setSelectedImage(response.assets[0].base64);
        setImage(response.assets[0].uri);
      }
    });

  }
  const handleInsertContact = () => {
    const db = database.initializeDatabase();

    const contact = {
      name: name,
      phoneNumber: phoneNumber,
      landlineNumber: landlineNumber,
      image: image,
    };

    database.insertContact(db, contact, (result) => {
      if (result.success) {
        console.log('Contact inserted successfully with ID:', result.id);
      } else {
        console.log('Failed to insert contact');
      }
    });
    alert("Contact Saved Successfully");
    navigation.goBack();
    
  };

  return (
    <SafeAreaView>

    <View>
    <TouchableOpacity onPress={() => {launchNativeImageLibrary({includeBase64:true})}}>
      {selectedImage?(
        <View style={styles.ImageSections}>
        <Image
        source={{ uri: `data:image/jpeg;base64,${selectedImage}`}}
        style={styles.circle}
        />
        </View>
      ):(
        <View style={styles.ImageSections}>
                <View  style={styles.circle} >
                  <Icon name="user-circle" size={80} color="#aaa" />
                </View>
        </View>
      )}
      
      
    </TouchableOpacity>
    
    {/*Code for opening camera  <TouchableOpacity onPress={() => {launchNativeCamera()}} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity> */}
        <TextInput style={styles.textInput} 
         placeholder='Enter Item Name'
         onChangeText={(text)=>setName(text)}
         value={name}/>
        
         <TextInput style={styles.textInput} 
         placeholder='Enter Mobile Number'
         onChangeText={(text)=>setPhoneNumber(text)}
         value={phoneNumber}
         />
         <TextInput style={styles.textInput} 
         placeholder='Enter Landline Number'
         onChangeText={(text)=>setLandlineNumber(text)}
         value={landlineNumber}
         />
    </View>
    <View style={styles.Button}>
      
      <Button  mode="contained" onPress={() => handleInsertContact()}> <Icon name="edit" size={20} color="white" /> Add Contact
  </Button>
    </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  container:{
    backgroundColor: 'aliceblue',
     
    
    
  },
  head:{
       fontSize:40,
       textAlign:'center',
       fontWeight:'bold',
       marginBottom:30,
       backgroundColor:'beige'
  },
  textInput:{
    margin:35,
    marginBottom:20,

      
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
    
  },
  Button:{
    marginBottom:2,
    padding:30,
    borderRadius:10,

  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
   btnParentSection: {
    alignItems: 'center',
    marginTop:10
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
})
export default AddContacts
