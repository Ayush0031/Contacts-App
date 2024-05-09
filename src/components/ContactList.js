import React,{useState,useEffect} from 'react';
import { View, FlatList, StyleSheet,TouchableOpacity, ScrollView } from 'react-native';
import { Card, Avatar,Button, Text, Appbar, IconButton } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import getAllContacts, { fetchContacts } from './database.jsx';
import { initDB } from './database.jsx';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue'
  },
  header: {
    backgroundColor: 'aliceblue',
    paddingHorizontal: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  plus:{
      alignItems:'flex-end',
       marginTop:20,
      fontSize:25,
      fontWeight:'bold',
      color:'white',
      
  },
  button:{
    borderRadius:500,
    justifyContent:'flex-end',
    

    

  },
  favr:{
    marginTop:15,
    fontSize:25,
    fontWeight:'bold',
    color:'white',
    
    
},
  card:{
    marginTop:20,
    marginBottom:15,
    backgroundColor:'white'
  },
  cardText:{
    fontSize:15,
    color:'black',
    fontWeight:'bold',
  },minus:{
    borderRadius:500,
  }
});



const ContactList = ({navigation}) => {
 
  const handleContactPress = (contact) => {
    navigation.navigate('UpdateContact', { contact, updateContactList: setContacts });
  };
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetchContacts(ContactsList => {
      setContacts(ContactsList);
    });
  }, [contacts]);
  // const renderContactItem = ({ item }) => (
  //   <TouchableOpacity onPress={() => navigation.navigate('UpdateContact')}>
  //     <Card style={styles.card}>
  //       <Card.Title
  //       style={styles.cardText}
  //         title={item.name}
  //         subtitle={`Phone: ${item.phoneNumber} | Landline: ${item.landlineNumber}`}
  //         left={(props) => (
  //           <Avatar.Image
  //             {...props}
  //             source={{ uri: item.image }}
  //           />
  //         )}
  //       />
        
  //     </Card>
  //   </TouchableOpacity>
  // );
  const renderItem = ({ item }) => {
    return (
      
        <TouchableOpacity onPress={() => handleContactPress(item)}>
      <Card style={styles.card}>
        <Card.Title
        style={styles.cardText}
          title={item.name}
          subtitle={`Phone: ${item.phoneNumber} | Landline: ${item.landlineNumber}`}
          left={(props) => (
            <Avatar.Image
              {...props}
              source={{ uri: item.image }}
            />
          )}
        />
        
      </Card>
    </TouchableOpacity>
    );
  };
  return (
    <SafeAreaProvider>
      <Appbar.Header style={styles.header}>
          <Appbar.Content  titleStyle={styles.heading} />
          <Button style={styles.minus} mode="contained" onPress={()=>navigation.navigate('FavoriteContactList')}><Icon name="star" size={20} color="white" />  
  </Button>
        </Appbar.Header>
      
      <ScrollView style={styles.container}>
        
      <View>
      <FlatList
      data={contacts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
    </View>
        <Appbar.Header style={styles.header}>
          <Appbar.Content  titleStyle={styles.heading} />
        <Button style={styles.button} mode='contained' onPress={() => navigation.navigate('AddContacts')} ><Text style={styles.plus}>+</Text></Button>
        </Appbar.Header>
      </ScrollView>
      
      

    
    </SafeAreaProvider>
  );
}
export default ContactList;
