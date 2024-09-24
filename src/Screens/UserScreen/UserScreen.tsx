import { View, Text, SafeAreaView, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { useRoute, RouteProp } from '@react-navigation/native';
import BarCode from '../../../assets/svgComponents/BarCode'
import NavbarScreen from '../../utils/NavbarScreen/NavbarScreen';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import * as Keychain from 'react-native-keychain';

import { useNavigation } from '@react-navigation/native';
import CardScreen from '../cardScreen';

type UserScreenRouteProp = RouteProp<{ UserScreen: undefined }, 'UserScreen'>;


export default function UserScreen() {
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const route = useRoute<UserScreenRouteProp>();
  const navigation = useNavigation();

  const [isHidden, setIsHidden] = useState<boolean>(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const toggleBarCode = () => {
    Animated.timing(slideAnim, {
      toValue: isHidden ? 0 : 150, 
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      setIsHidden(!isHidden); 
    });


  };
  
  useEffect(()=>{
    if(!isHidden){
      Animated.timing(slideAnim, {
        toValue: 0, 
        duration: 700, 
        useNativeDriver: true,
    }).start();
  
    }
    retriveUser()
  }, [isHidden])

  function formatPhoneNumber(phone: string):string {
    const cleaned = phone.replace(/\D/g, '');
    console.log("Очищений номер:", cleaned);

    if (cleaned.length === 12 && cleaned.startsWith('380')) {
        const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{4})$/);
        console.log("Match:", match);

        if (match) {
            return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
        }
    }

    return phone;
}




const retriveUser = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const data = JSON.parse(credentials.password);
      const phoneNum = formatPhoneNumber(credentials.username);
      setPhone(phoneNum);
      const jwt = data.jwt;
      const userName = data.name;
      setName(userName);
    } else {
      console.log("No credentials found");
    }
  } catch (err) {
    console.log(err);
  }
}
  return (
    <SafeAreaView style={{ backgroundColor: '#f0f0f0', flex: 1, paddingBottom: 0 }}>
      <CardScreen visible={isHidden} setVisible={setIsHidden} />
      <NavbarScreen {...route} />
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>

      <View style={{ marginTop: 50, backgroundColor: 'white' }}>
        <TouchableOpacity style={[styles.buttonCont, { borderTopWidth: 1 }]}>
          <View style={styles.buttonInfo}>
            <Icon style={styles.iconInfo} name='idcard' />

            <Text style={styles.buttonText}>Профіль користувача</Text>
          </View>
          <Icon style={styles.iconInfo} name='right' />


        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCont}>
          <View style={styles.buttonInfo}>
            <Icon style={styles.iconInfo} name='creditcard' />
            <Text style={styles.buttonText}>Оплати та Автосписання</Text>
          </View>
          <Icon style={styles.iconInfo} name='right' />

        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCont}>
          <View style={styles.buttonInfo}>
            <Icon style={styles.iconInfo} name='piechart' />

            <Text style={styles.buttonText}>Посилка в кредит</Text>
          </View>
          <Icon style={styles.iconInfo} name='right' />


        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCont}>
          <View style={styles.buttonInfo}>
            <Icon1 style={styles.iconInfo} name='discount' />
            <Text style={styles.buttonText}>Акції та промокоди</Text>
          </View>
          <Icon style={styles.iconInfo} name='right' />


        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCont} onPressIn={()=> navigation.navigate('PaymantsHistory')}>
          <View style={styles.buttonInfo}>
            <Icon1 style={styles.iconInfo} name='format-list-numbered' />
            <Text style={styles.buttonText}>Історія операцій</Text>
          </View>
          <Icon style={styles.iconInfo} name='right' />

        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCont} onPress={() => navigation.navigate('SettingsScreen')}>

          <View style={styles.buttonInfo}>
            <Icon style={styles.iconInfo} name='setting' />
            <Text style={styles.buttonText}>Налаштування</Text>
          </View>
          <Icon style={styles.iconInfo} name='right' />

        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCont}>
          <View style={styles.buttonInfo}>
            <Icon1 style={styles.iconInfo} name='security' />
            <Text style={styles.buttonText}>Безпека</Text>
          </View>
          <Icon style={styles.iconInfo} name='right' />

        </TouchableOpacity>
      </View>
      
      <View style={{ flex: 1, justifyContent: 'space-between', }}>
        <Text style={{ textAlign: 'center', marginTop: 30 }}>5.17.62</Text>
        <TouchableOpacity onPress={toggleBarCode}>
          <Animated.View style={{ transform: [{ translateY: slideAnim }] }}> 
            <View style={styles.barCodeCont}>
              <View >
                <Text style={{ textAlign: 'center', color: 'red', fontSize: 16, padding: 5 }}>Карта клієнта</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <BarCode width={60} height={60} />
                  <BarCode width={60} height={60} />
                  <BarCode width={60} height={60} />
                  <BarCode width={60} height={60} />
                </View>
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'red',

  },
  name: {
    fontSize: 22,
    fontWeight: 900,
  },
  phone: {
    marginTop: 10
  },
  buttonCont: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16
  },
  iconInfo: {
    color: 'red',
    fontSize: 26
  },
  barCodeCont: {
    position: 'absolute',
    bottom: -50, 
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'red',
  }

})
