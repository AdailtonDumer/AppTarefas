import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import {View,Text, StyleSheet, TouchableOpacity} from 'react-native'
import * as Animatable from 'react-native-animatable'

const TaskList = ({data})=>{
    return(
        <Animatable.View 
        style={styles.task}
        animation='bounceIn'
        useNativeDriver
        >
            <TouchableOpacity>
                <Ionicons name='ios-checkmark-circle'size={30}/>
            </TouchableOpacity>
            <Text style={styles.taskValue}>
                {data.task}
            </Text>
            
        </Animatable.View>
    )
}

export default TaskList

const styles = StyleSheet.create({
    task:{
        flex:1,
        backgroundColor:'white',
        margin:8,
        padding:5,
        borderRadius:3,
        flexDirection:'row',
        alignItems:'center',
        elevation:1.2,
        shadowColor:'black',
        shadowOpacity:1.2,
        shadowOffset:{
            width:1,
            height:3
        }
    },
    taskValue:{
        color:'black',
        fontSize:20,
        paddingLeft:8,
        paddingRight:20
    }
})