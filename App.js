import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import { Header, Input, Button, ListItem, Icon } from'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

let id = 0; // alustetaan id-muuttuja, joka annetaan taulukona jokaiselle objektille, jotta poistaminen on mahdollista

export default function App() {

  const [product, setProduct] = useState ('');
  const [amount, setAmount] = useState ('');
  const [data, setData] = useState([]);

  const addItem = () => {
    setData(
      [...data,
        { product: product, amount: amount, id: id++ }]);
    setProduct('');
    setAmount('');
    console.log(data);
  }

 const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.product}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron name="delete" color="black" onPress={() => handleRemove(item.id)} />
    </ListItem>
 )

 function handleRemove(id) { 
  const newData = data.filter((item) => item.id !== id); 

    setData(newData);
  // remove item
}

  return (
    <SafeAreaProvider>
      <Header
      backgroundColor= '#1C6758'
      centerComponent={{ text: 'SHOPPING LIST', style: { color: '#ffffff' } }}  
      />
    <View style={styles.container}>
    <View style={styles.align}>
      <Input 
      placeholder='Product' label='Product'
      style={styles.input} onChangeText={product => setProduct(product)} value={product}/>
        <Input 
      placeholder='Amount' label='Amount'
      style={styles.input} onChangeText={amount => setAmount(amount)} value={amount}/>
        <View style={styles.buttonrow}>
      <Button buttonStyle={styles.button} raised icon={{name: 'save', color: 'white'}} onPress={addItem} title="SAVE" />
      </View>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
      />
      
      <StatusBar style="auto" />
      </View>
      </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
    justifyContent: 'flex-start',
    paddingTop: 20
  },
  input : {
    width: 75 ,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button : {
    backgroundColor: '#3D8361',
    width: 100
  },
  buttonrow : {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 20,
  },
  align: {
    alignItems: 'center',
  }
});  

//keyExtractor={item => item.product}