import React from 'react';
import { View, FlatList, StyleSheet,TouchableOpacity } from 'react-native';
import { Card, Avatar,Button, Text, Appbar, IconButton } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';


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
    backgroundColor:'blue',
    borderRadius:500,
    justifyContent:'flex-end'

    

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
  }
});

const contacts = [
  {
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    landlineNumber: '987-654-3210',
    image: 'https://example.com/john_doe.jpg',
  },
  {
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    landlineNumber: '987-654-3210',
    image: 'https://example.com/john_doe.jpg',
  },
  {
    name: 'John Doe',
    phoneNumber: '123-456-7890',
    landlineNumber: '987-654-3210',
    image: 'https://example.com/john_doe.jpg',
  }
  // Add more contacts here...
];

const FavoriteContactList = ({navigation}) => {
  const renderContactItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('UpdateContact')}>
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

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        
        <FlatList
          data={contacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.phoneNumber}
        />
        <Appbar.Header style={styles.header}>
          <Appbar.Content  titleStyle={styles.heading} />
        <Button style={styles.button} mode='contained' onPress={() => navigation.navigate('AddContacts')} ><Text style={styles.plus}>+</Text></Button>
        </Appbar.Header>
      </View>
    </SafeAreaProvider>
  );
}
export default FavoriteContactList;
