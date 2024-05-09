import React,{useState} from 'react';
import {launchCamera, launchImageLibrary,ImagePicker} from 'react-native-image-picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import database, { updateContact } from './database.jsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import { deleteContact } from './database.jsx';
import {
  
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import { Text,
  TextInput,
  Button,
  IconButton,
} from 'react-native-paper';
const UpdateContact = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { contact, updateContactList } = route.params;
  const [id,Setid]=useState(contact.id)
  const [name, setName] = useState(contact.name);
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);
  const [landlineNumber, setLandlineNumber] = useState(contact.landlineNumber)
  const [image, setImage] = useState(contact.image);
  const [selectedImage, setSelectedImage] = useState(contact.selectedImage);

  const handleUpdateContact = () => {
    const updatedContact = {
      id: contact.id,
      name: name,
      phoneNumber: phoneNumber,
      landlineNumber: landlineNumber,
      image:contact.image
      // isFavorite: contact.isFavorite, // Include existing value if needed
      // image: contact.image, // Include existing value if needed
    };
    updateContact(updatedContact.id, updatedContact.name, updatedContact.phoneNumber, updatedContact.landlineNumber, updatedContact.image, (response) => {
      if (response.success) {
        // Contact updated successfully
        // Perform any necessary actions or navigation
        alert("Contact Updated successfully");
        navigation.goBack();
        // Example: navigate back to the contact list screen
        navigation.goBack();
      } else {
        // Failed to update contact
        // Handle the error or display a message to the user
      }
    });
  }
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

  const handleDeleteContact = () => {
    // const db = database.initializeDatabase();

    // db.deleteContact(contact.id, () => {

    //   onContactUpdate();
    //   navigation.goBack();
    // });
    deleteContact(id);
    alert("Contact Delete Successfully!!")
    navigation.goBack();
  };

   favoritePressed=()=>{
    alert('Contact Is marked as favourite!!');
   };
   
  return (
    <SafeAreaView>

    <View>
    <TouchableOpacity onPress={() => {launchNativeImageLibrary({includeBase64:true})}}>
      
        <View style={styles.ImageSections}>
        <Image
        source={{ uri: image}}
        style={styles.circle}
        />
        </View>
     
      
      
    </TouchableOpacity>
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
      
      <Button color='green'  mode="contained" onPress={() => handleUpdateContact()}> <Icon name="edit" size={20} color="white" /> Update Contact
  </Button>
  <View style={styles.fav}>
  <Button  mode="contained" onPress={()=>handleDeleteContact()} > <Icon name="trash" size={20} color="white" />
  </Button>
  <Button style={styles.button} onPress={()=>favoritePressed()} mode="contained" ><Icon name="star" size={20} color="white" />
  </Button>
  </View>
  {/* <View>
      <Icon name="star" size={30} color="gold" />
    </View> */}
    </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  container:{
    backgroundColor: 'aliceblue',
    
    
    
  },
  favr:{
    marginTop:15,
    fontSize:25,
    fontWeight:'bold',
    color:'white',
    
},
ImageSections: {
  display: 'flex',
  flexDirection: 'row',
  paddingHorizontal: 8,
  paddingVertical: 8,
  justifyContent: 'center'
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
  textInput:{
    margin:35,
    marginBottom:20,

      
  },
  fav:{

    margin:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    
  },
  Button:{
    marginBottom:2,
    padding:30,
    borderRadius:10,

  },
  button:{
    borderRadius:500,
  }
  
})
export default UpdateContact;