import SQLite from 'react-native-sqlite-storage';

const initializeDatabase = () => {
    const db = SQLite.openDatabase({ name: 'contacts.db' });
  
    // Create the contact table if it doesn't exist
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS contact (id INTEGER PRIMARY KEY AUTOINCREMENT, name Varchar(50), phoneNumber Varchar(50), landlineNumber Varchar(50), image Varchar(6000))',
        [],
        () => console.log('Contact table created successfully'),
        (_, error) => console.log('Failed to create contact table:', error)
      );
    });
  
    return db;
  };
  
//   const fetchContacts = (db, callback) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'SELECT * FROM contacts',
//         [],
//         (_, { rows }) => callback(rows._array),
//         (_, error) => console.log('Failed to fetch contacts:', error)
//       );
//     });
//   };
  export const fetchContacts = (callback) => {
    const db = SQLite.openDatabase({ name: 'contacts.db' });
    db.transaction((tx) => {
  
      tx.executeSql(
  
        'SELECT * FROM contact',
  
        [],
  
        (tx, result) => {
  
          const items = [];
  
          for (let i = 0; i < result.rows.length; i++) {
  
            items.push(result.rows.item(i));
  
          }
  
          callback(items);
  
        },
  
        (error) => {
  
          console.log('Error fetching items:', error);
  
          callback([]);
  
        },
  
      );
  
    });
  
  };
  export const updateContact = (id, name, phoneNumber, landlineNumber, image, callback) => {
    const db = SQLite.openDatabase({ name: 'contacts.db' });
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE contact SET name = ?, phoneNumber = ?, landlineNumber = ?, image = ? WHERE id = ?`,
        [name, phoneNumber, landlineNumber,  image, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            callback({ success: true });
          } else {
            callback({ success: false });
          }
        },
        (_, error) => {
          console.log('Failed to update contact:', error);
          callback({ success: false });
        }
      );
    });
  };
  
  
  export const deleteContact = (id, callback) => {

    const db = initializeDatabase();
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM contact WHERE id = ?`,
        [id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            callback({ success: true });
          } else {
            callback({ success: false });
          }
        },
        (_, error) => {
          console.log('Failed to delete contact:', error);
          callback({ success: false });
        }
      );
    });
  };
  
  const insertContact = (db, contact, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO contact (name, phoneNumber, landlineNumber, image) VALUES (?, ?, ?, ?)',
        [contact.name, contact.phoneNumber, contact.landlineNumber, contact.image],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) {
            callback({ success: true, id: insertId });
          } else {
            callback({ success: false });
          }
        },
        (_, error) => console.log('Failed to insert contact:', error)
      );
    });
  }

  
  // Add other database operations as needed (e.g., insertContact, updateContact, deleteContact)
  export default {
    initializeDatabase,
    fetchContacts,
    insertContact,
    deleteContact,
    updateContact
  };
// import SQLite from 'react-native-sqlite-storage';

// const DB_NAME = 'contacts.db';
// const TABLE_NAME = 'contac';

// const db = SQLite.openDatabase({ name: DB_NAME });

// // Initialize the database and create the contacts table if it doesn't exist
// const initDB = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phoneNumber TEXT, landlineNumber TEXT, isFavorite INTEGER, image TEXT)`,
//       [],
//       () => console.log('Contacts table created successfully'),
//       (_, error) => console.log('Failed to create contacts table:', error)
//     );
//   });
// };

// // Insert a new contact into the database
// const addContact = (contact) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `INSERT INTO ${TABLE_NAME} (name, phoneNumber, landlineNumber, isFavorite, image) VALUES (?, ?, ?, ?, ?)`,
//       [contact.name, contact.phoneNumber, contact.landlineNumber, contact.isFavorite ? 1 : 0, contact.image],
//       (_, { insertId }) => {
//         callback({ success: true, id: insertId });
//       },
//       (_, error) => {
//         console.log('Failed to add contact:', error);
//         callback({ success: false });
//       }
//     );
//   });
// };

// // Fetch all contacts from the database
// const getAllContacts = (callback) => {
//   db.transaction((tx) => {
//     tx.executeSql(
//       `SELECT * FROM ${TABLE_NAME}`,
//       [],
//       (_, { rows }) => callback(rows._array),
//       (_, error) => console.log('Failed to fetch contacts:', error)
//     );
//   });
// };

// // // Update a contact in the database
// // const updateContact = (id, name, phoneNumber, landlineNumber, isFavorite, image, callback) => {
// //   db.transaction((tx) => {
// //     tx.executeSql(
// //       `UPDATE ${TABLE_NAME} SET name = ?, phoneNumber = ?, landlineNumber = ?, isFavorite = ?, image = ? WHERE id = ?`,
// //       [contact.name, contact.phoneNumber, contact.landlineNumber, contact.isFavorite ? 1 : 0, contact.image],
// //       (_, { rowsAffected }) => {
// //         if (rowsAffected > 0) {
// //           callback({ success: true });
// //         } else {
// //           callback({ success: false });
// //         }
// //       },
// //       (_, error) => {
// //         console.log('Failed to update contact:', error);
// //         callback({ success: false });
// //       }
// //     );
// //   });
// // };

// // // Delete a contact from the database
// // const deleteContact = (id, callback) => {
// //   db.transaction((tx) => {
// //     tx.executeSql(
// //       `DELETE FROM ${TABLE_NAME} WHERE id = ?`,
// //       [id],
// //       (_, { rowsAffected }) => {
// //         if (rowsAffected > 0) {
// //           callback({ success: true });
// //         } else {
// //           callback({ success: false });
// //         }
// //       },
// //       (_, error) => {
// //         console.log('Failed to delete contact:', error);
// //         callback({ success: false });
// //       }
// //     );
// //   });
// // };

// // export default {
// //   initDB,
// //   addContact,
// //   getAllContacts,
// //   updateContact,
// //   deleteContact,
// // };
