import React , { useState } from 'react'
import {View, Text, StyleSheet, SafeAreaView,StatusBar } from 'react-native'

export default function App(){
 
  return(
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor='#171d31' barStyle="light-content"/>
      <Text>Tarefas</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#171d31'
  }
})