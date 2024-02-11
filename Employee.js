import react, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

const Employee = (props) => {

    const [isEditView, setIsEditView] = useState(false);
    const [fullName, setFullName] = useState(props.employee.fullName)
    const [position, setPosition] = useState(props.employee.position)

    return (
        <>
            {
                isEditView ? (
                    <>
                        <View style={styles.editrow}>
                            <TextInput
                                style={styles.input}
                                placeholder="Your name"
                                value={fullName}
                                onChangeText={(e) => { setFullName(e) }}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Your position"
                                value={position}
                                onChangeText={(e) => { setPosition(e) }}
                            />

                            <TouchableOpacity onPress={() => { 
                                props.updateItem(fullName, position, props.employee.id);
                                setIsEditView(false)
                                }} style={styles.btn}><Text style={styles.txt_btn}>Save Data</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.uptbtn} onPress={() => { setIsEditView(!isEditView) }}><Feather name='arrow-right-circle' color='#ffffff' size={20} /></TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View style={styles.row}>
                        <Text style={{ fontSize: 18 }}>{props.employee.fullName} - {props.employee.position}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.delbtn} onPress={() => { props.deleteItem(props.employee.id) }}><Feather name='trash-2' color='#ffffff' size={20} /></TouchableOpacity>
                            <TouchableOpacity style={styles.uptbtn} onPress={() => { setIsEditView(!isEditView) }}><Feather name='edit-2' color='#ffffff' size={20} /></TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </>
    )
}

const styles = StyleSheet.create({
    btn: { width: '100%', marginTop: 12, backgroundColor: '#000000', alignItems: 'center', paddingVertical: 12, borderRadius: 12 },
    txt_btn: { color: '#ffcc00', fontSize: 20 },
    input: {
        backgroundColor: "green",
        width: "100%",
        padding: 12,
        borderRadius: 12,
        marginTop: 12,
        fontSize: 18,
    },
    delbtn: {
        padding: 6,
        backgroundColor: '#E71D36',
        borderRadius: 6,
        marginRight: 6
    },
    uptbtn: {
        padding: 5,
        backgroundColor: '#FFC100',
        borderRadius: 6
    },
    editrow: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 12
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 12
    },
})

export default Employee;