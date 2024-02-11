import react, { useState, useEffect } from "react";
import { 
  View, 
  TextInput, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  FlatList,
  Alert,
  StyleSheet } from "react-native";
import { database } from './fbconfig'
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import Employee from "./Employee";

const App = () => {
  //CRUD - Create Read Update Delete

  const [fullName, setFullName] = useState("")
  const [position, setPosition] = useState("")
  const [employees, setEmployees] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = async() => {
    setIsLoading(true)
    try {
      const snapShot = await getDocs(collection(database, "myCollection"));
      const dataList = snapShot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setEmployees(dataList)
      setIsLoading(false)
    } catch (error) {
      Alert.alert(error.message)
      setIsLoading(false)
    }
  }
  useEffect(() => {
    loadData()
  },[])

  const saveData = async() => {
    if(fullName !== "" && position !== ""){
      try {
        const new_item = {
          fullName: fullName,
          position: position,
          createdAt: Date.now()
        }
        await addDoc(collection(database, "myCollection"), new_item)
        .then(res => {
          setFullName("")
          setPosition("")
          loadData()
        })
      } catch (error) {
        Alert.alert(error.message)
      }
    } else {
      Alert.alert("All inputs are required")
    }
  }

  const deleteItem = async(id) => {
    try {
      const employeeRef = doc(database, "myCollection", id);
      await deleteDoc(employeeRef);
      loadData();
    } catch (error) {
      Alert.alert(error.message)
    }
  }


  const updateItem = async(fullName, position, id) => {

    try {
      
      const employeeRef = doc(database, "myCollection", id);
      const newData = {
        fullName:fullName,
        position:position
      }
      await updateDoc(employeeRef,newData);
      loadData()
    } catch (error) {
      Alert.alert(error.message)
    }

  }


  return (
    <View style={styles.container}>


      <View style={styles.form_container}>
      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={fullName}
        onChangeText={(e) => {setFullName(e)}}
      />

      <TextInput
        style={styles.input}
        placeholder="Your position"
        value={position}
        onChangeText={(e) => {setPosition(e)}}
      />

      <TouchableOpacity onPress={saveData} style={styles.btn}>
        <Text style={styles.txt_btn}>Save Data</Text>
      </TouchableOpacity>
      </View>



      <View style={styles.list_container}>

        <FlatList
          style={{width:'100%'}}
          data={employees}
          keyExtractor={item => item.id}
          renderItem={itemRow => 
            <Employee 
              updateItem={updateItem}
              deleteItem={deleteItem}
              employee={itemRow.item} 
          />}
        />


      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  form_container:{
    width:'100%',
    height:'30%',
  },
  list_container:{
    width:'100%',
    height:'70%',
  },
  btn:{width:'100%', marginTop:12, backgroundColor:'#000000', alignItems:'center',paddingVertical:12, borderRadius:12},
  txt_btn:{color:'#ffcc00', fontSize:20},
  input: {
    backgroundColor: "#ffffff",
    width: "100%",
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    fontSize: 18,
  },
  title: {
    fontSize: 40,
    color: "#ffffff",
    fontWeight: "200",
  },
  container: {
    backgroundColor: "#00cc99",
    padding: 20,
    flex: 1,
  },
});

export default App;
