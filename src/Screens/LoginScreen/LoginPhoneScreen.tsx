import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
    PinCodeInput: { phone: string };
};

const LoginPhoneScreen: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string>('0661242441');
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const handleNext = () => {
        navigation.navigate('PinCodeInput', { phone:`+38${phoneNumber}` });
      };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ alignItems: 'flex-end' }}>
                <View style={{ backgroundColor: 'red', width: 260, paddingHorizontal: 18, paddingVertical: 5 }}><Text style={{ color: 'white', fontSize: 30, fontWeight: 900 }}>НОВА ПОШТА</Text></View>
            </View>
            <View style={styles.userUseg}>
            <View style={styles.inputCont}>
                <Text style={{fontSize: 35, fontWeight: 600, paddingVertical: 20, marginTop: 10}}>Вхід</Text>
                <View style={styles.container}>
                    <Text style={styles.prefix}>+38</Text>
                    <TextInput
                        style={styles.inputLog}
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                        keyboardType="phone-pad"
                        placeholder="Enter phone number"
                    />
                </View>
            </View>
                <View>
                <View style={styles.buttonCont}>
                    <TouchableOpacity style={{backgroundColor: 'green', padding: 10, borderRadius: 15}} onPress={()=>handleNext()}><Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>Далі</Text></TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 20}}><Text style={{textDecorationLine: 'underline', textAlign: 'center'}}>Увійти без авторизації</Text></TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 20}}><Text style={{color: 'green', textAlign:'center'}}>Нова реєстрація</Text></TouchableOpacity>
                </View>
                <View style={styles.acceptCont}>
                    <Text style={{fontSize: 10}}>
                        Продовжуючи згоден з умовами надання та використання бонус-знижок та промокодів і надаю щгоду на обробку моїх персональних даних відповідно до "Політики конфіденційності"
                    </Text>
                </View>
                </View>
                <View></View>
                <Text style={{textAlign: 'right'}}>5.61(0)C#4134d</Text>
            </View>
        </SafeAreaView>
    )
}

export default LoginPhoneScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'green',
        borderRadius:8,
        paddingHorizontal: 10,
        paddingVertical: 5
      },
    prefix: {
        marginRight: 5,
        fontSize: 16,
    },
    inputLog: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 5,
    },

    userUseg:{
        paddingHorizontal: 28,
        flex: 1,
        justifyContent: 'space-between'
    },
    acceptCont:{
        marginTop: 20
    },
    inputCont :{

    },
    buttonCont:{
        
    }
})