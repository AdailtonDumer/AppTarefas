import React , { useState, useCallback, useEffect } from 'react'
import {View, Text, StyleSheet, SafeAreaView,StatusBar, TouchableOpacity, FlatList , Modal, TextInput}  from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import TaskList from './src/Components/TaskList'
import * as Animatable from 'react-native-animatable'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity)

export default function App(){

  useEffect(()=>{
    async function LoadItens(){
      const itens = await AsyncStorage.getItem('@test')
      if(itens){    
        setTask(JSON.parse(itens))
      }
    }

    LoadItens()
  },[])
  
  const [task, setTask] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [inputTask,setInputTask] = useState('')


  async function saveItens(data = task){    
    await AsyncStorage.setItem('@test', JSON.stringify(data))
  }

  function handleAddTask (){
    if(inputTask=== ''){
    return}

    const data = {
      key:inputTask.trim(),
      task:inputTask.trim()
    }
    const tasks = ([...task,data])
    setTask(tasks)
    setOpenModal(false)
    setInputTask('')
    saveItens(tasks)
  }

  const ConcluiTarefa = useCallback((data)=>{
    const find = task.filter((r)=>r.key !== data.key)
    saveItens(find)
    setTask(find)
  })

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
      renderItem={({ item })=><TaskList data={item}  ConcluiTarefa = {ConcluiTarefa}/>}
      />

      <Modal animationType='slide' transparent={false} visible={openModal}>
        <SafeAreaView style={styles.container}>

          <View style={styles.header}>
            <TouchableOpacity onPress={()=>setOpenModal(false)} >
              <Ionicons name='ios-arrow-back' size={30} color='white'/>
            </TouchableOpacity>
            <Text style={styles.textHeader}>Nova Tarefa</Text>
          </View>

          <Animatable.View style={styles.content} animation='fadeInUp' useNativeDriver>
            <TextInput 
            style={styles.inputTask}
            placeholder="Digite a sua tarefa:"
            multiline
            value={inputTask}
            onChangeText={(text)=>setInputTask(text)}
            />
            <TouchableOpacity 
            style={styles.handleAdd}
            onPress={handleAddTask}
            > 
              <Text style={styles.handleAddText}>Adicionar Tarefa</Text>
            </TouchableOpacity>
          </Animatable.View>

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
    maxHeight:60,
    alignItems:'center'
  },
  textHeader:{
    color:'white',
    fontSize:20,
    padding:10
  },
  content:{
    marginTop:20,
    marginHorizontal:8,
  },
  inputTask:{
    backgroundColor:'white',
    height:86,
    color:'black',
    textAlignVertical:'top',
    padding:8,
    borderRadius:5
  },
  handleAdd:{
    backgroundColor:'white',
    marginTop:20,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:8
  },
  handleAddText:{
    fontSize:18
  }
})