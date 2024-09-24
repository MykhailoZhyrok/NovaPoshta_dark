import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Animated} from 'react-native'
import React, {useRef, useState} from 'react'
import NavbarScreen from '../../utils/NavbarScreen/NavbarScreen'
import { useRoute } from '@react-navigation/native';

export default function CreateOrderScreen() {
  const route = useRoute();

  const [selectedSenderIndex, setSelectedSenderIndex] = useState(0);
  const [selectedReceiverIndex, setSelectedReceiverIndex] = useState(0);
  
  const senderAnimatedValue = useRef(new Animated.Value(0)).current;
  const receiverAnimatedValue = useRef(new Animated.Value(0)).current;
  const [buttonWidth, setButtonWidth] = useState(0); // Зберігає ширину кнопки

  const moveIndicator = (index:number, type: string) => {
    if (type === 'sender') {
      setSelectedSenderIndex(index);
      Animated.spring(senderAnimatedValue, {
        toValue: index * buttonWidth, // Використовує ширину кнопки
        useNativeDriver: false,
      }).start();
    } else if (type === 'receiver') {
      setSelectedReceiverIndex(index);
      Animated.spring(receiverAnimatedValue, {
        toValue: index * buttonWidth, // Використовує ширину кнопки
        useNativeDriver: false,
      }).start();
    }
  };

  const handleLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setButtonWidth(width); // Встановлює ширину кнопки
  };

  return (
    
    <SafeAreaView style={styles.body}>
       <StatusBar
        translucent={false} 
        backgroundColor="#ffff" 
      />
      <NavbarScreen {...route}></NavbarScreen>

      <View style={styles.sender}>
        <Text style={styles.titleSender}>
          Відправник
        </Text>
        <View style={styles.senderBody}>
          <Text>Місце відправки</Text>
          <View style={styles.senderOptions}>
          <TouchableOpacity onPress={() => moveIndicator(0, 'sender')} style={styles.swtchButton}>
              <Text style={[styles.switchButtonText, {color:selectedSenderIndex===0?'white': 'black'}]}>Відділення</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.swtchButton, {borderLeftWidth:selectedSenderIndex===0||selectedSenderIndex===1?0:1, borderRightWidth: selectedSenderIndex===1||selectedReceiverIndex===2?0:1}]} onPress={() => moveIndicator(1, 'sender')}>
              <Text style={[styles.switchButtonText, {color:selectedSenderIndex===1?'white': 'black'}]}>Адреса</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => moveIndicator(2, 'sender')} style={styles.swtchButton}>
              <Text style={[styles.switchButtonText, {color:selectedSenderIndex===2?'white': 'black'}]}>Поштомат</Text>
            </TouchableOpacity>
            <Animated.View
              style={[
                styles.indicator,
                {
                  width: buttonWidth,
                  transform: [{ translateX: senderAnimatedValue }],},
              ]}
            />
          </View>
        </View>
        <View style={styles.senderAddress}>
            <Text>Адреса</Text>
            <TouchableOpacity><Text>Обрати</Text></TouchableOpacity>
        </View>
        <View style={[styles.senderBody, {borderTopWidth: 1}]}>
          <Text>
            Відправник
          </Text>
          <Text>
            Бандера Степан Андрійович
          </Text>
          <Text>
            +380 54 144 22 34
          </Text>
        </View>
      </View>
      <View style={styles.sender}>
        <Text style={styles.titleSender}>
          Одержувач
        </Text>
        <View style={styles.senderBody}>
          <Text>Місце відправки</Text>
          <View style={styles.senderOptions}>
          <TouchableOpacity style={[styles.swtchButton]} onLayout={handleLayout}  onPress={() => moveIndicator(0, 'receiver')}>
              <Text style={[styles.switchButtonText, {color:selectedReceiverIndex===0?'white': 'black'}]}>Відділення</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.swtchButton, {borderLeftWidth:selectedReceiverIndex===0||selectedReceiverIndex===1?0:1, borderRightWidth: selectedReceiverIndex===1||selectedReceiverIndex===2?0:1}]} onPress={() => moveIndicator(1, 'receiver')}>
              <Text style={[styles.switchButtonText, {color:selectedReceiverIndex===1?'white': 'black'}]}>Адреса</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.swtchButton]} onPress={() => moveIndicator(2, 'receiver')}>
              <Text style={[styles.switchButtonText, {color:selectedReceiverIndex===2?'white': 'black'}]}>Поштомат</Text>
            </TouchableOpacity>
              <Animated.View
              style={[
                styles.indicator,
                {
                  width: buttonWidth, // Встановлює ширину індикатора рівною ширині кнопки
                  transform: [{ translateX: receiverAnimatedValue }],
                },
              ]}
            />
          </View>
        </View>
        <View style={styles.senderAddress}>
            <Text>Відділення</Text>
            <TouchableOpacity><Text>Обрати</Text></TouchableOpacity>
        </View>
        <View style={styles.senderAddress}>
            <Text>Одержувач</Text>
            <TouchableOpacity><Text>Обрати</Text></TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}><Text style={{color: 'white'}}>Далі</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body:{
    flex: 1,
  },
  sender:{
   marginTop: 20

  },
  senderBody:{
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 11
  },
  senderOptions:{
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'grey',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 11
  },
  senderAddress:{
    backgroundColor: 'white',
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingVertical: 11
  },
  titleSender:{
    paddingHorizontal: 12,
    fontSize: 21,
    fontWeight: 'bold',
    marginBottom: 5
  },
  buttonContainer:{
    paddingHorizontal: 12,
    paddingVertical: 11
  },
  button:{
    backgroundColor: 'black',
    alignItems: 'center',
    padding: 11,
    borderRadius: 8
  },
  swtchButton:{
    flex: 1,
    paddingHorizontal: 20,
    zIndex: 5, 
  },
  indicator: {
    position: 'absolute',
    height: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 15,
    left: 5, 
    zIndex:0
  },
  switchButtonText: {
   
    textAlign: 'center',
  },
})