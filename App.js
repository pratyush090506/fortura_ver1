import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, React Native!</Text>
      <Image
      source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
      style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },

  text :{
    // position: 'absolute',
    // top:'30%',
    // left:'25%' ,
    fontSize : 24,
    fontWeight:'bold',
    color: 'lightblue',
    
  },

  image : {
    width : 150,
    height : 150,
    borderRadius : 75,
  },
  
})

export default App;
