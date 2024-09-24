import { View, Text, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import NavbarScreen from '../../../utils/NavbarScreen/NavbarScreen';


export default function PaymentsHistory() {
  const route = useRoute();
  const [payments, setPayments] = useState([]); 

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavbarScreen {...route} />
      <View>
        {payments.length > 0 ? (
          payments.map((el, index) => (
            <View key={index}> 
              <Text>{el.title}</Text>
            </View>
          ))
        ) : (
          <View style={{height: '100%', justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}>У вас немає операцій</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
