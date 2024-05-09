/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import AddContacts  from './src/components/AddContacts';
import React from 'react';
import ContactList from './src/components/ContactList';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UpdateContact from './src/components/UpdateContact';
import FavoriteContactList from './src/components/FavoriteContactList';

import {initDB} from './src/components/database';
const Stack = createNativeStackNavigator();
const App=()=>{
  
     return(
          <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='ContactList' component={ContactList} />
            <Stack.Screen name='AddContacts' component={AddContacts} />
            <Stack.Screen name='UpdateContact' component={UpdateContact} />
            <Stack.Screen name='FavoriteContactList' component={FavoriteContactList} />

           
          </Stack.Navigator>
        </NavigationContainer>
     )
}

export default App;
