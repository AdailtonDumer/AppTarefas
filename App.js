import React , { useState } from 'react'
import {View, Text, StyleSheet, SafeAreaView,StatusBar, TouchableOpacity, FlatList , Modal} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import TaskList from './src/Components/TaskList'
import * as Animatable from 'react-native-animatable'

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity)

export default function App(){
  const [task, setTask] = useState([
    {key:1, task:'comprar 1aadasdasd asd asdabsdlasd açsjda sdasdjasdjasda sdasda sdjasdj'},
    {key:2, task:'comprar 2'},
    {key:3, task:'comprar 3'},
    {key:4, task:'comprar 2'},
  ])
  const [openModal, setOpenModal] = useState(false)
  return(
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#171d31' barStyle="light-content"/>
      <View style={styles.content}>
        <Text style={styles.title}>Minhas tarefas</Text>
      </View>

      <FlatList 
      showsHorizontalScrollIndicator={true}
      data={task}
      keyExtractor={(item)=>String(item.key)}
      renderItem={({ item })=><TaskList data={item}/>}
      />

      <Modal animationType='slide' transparent={false} visible={openModal}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity >
              <Ionicons name='ios-arrow-back' size={30} color='white'/>
            </TouchableOpacity>
            <Text style={styles.textHeader}>Nova Tarefa</Text>
          </View>
        </SafeAreaView>
      </Modal>

      <AnimatedBtn style={styles.fab}
      useNativeDriver
      animation='bounceInUp'
      duration={1500}
      onPress={()=>setOpenModal(true)}
      >
        <Ionicons name='ios-add' color="white" size={35} />
      </AnimatedBtn>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#171d31'
  },
  title:{
    color:'white',
    marginTop:10,
    paddingBottom:10,
    fontSize:26,
    textAlign:'center'
  },
  fab:{
    position:'absolute',
    elevation:2,
    zIndex:99,
    width:60,
    height:60,
    backgroundColor:'#0094ff',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:200,
    bottom:30,
    right:30,
    shadowColor:'black',
    shadowOpacity:0.2,
    shadowOffset:{
      width:1,
      height:3
    }
  },
  header:{
    flex:1,
    padding:15,
    height:50,
    flexDirection:'row',
  },
  textHeader:{
    color:'white',
    fontSize:20,
    padding:10
  }
})