import React, { useState, useRef, useEffect } from 'react';
import {
    View, TextInput, Text, StyleSheet, SafeAreaView, StatusBar,
    TouchableOpacity, NativeSyntheticEvent, TextInputKeyPressEventData
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import loginEventEmitter from '../../../path/eventEmmit';

type RouteT = {
    key: string;
    name: string;
    params: { phone: string };
    path?: string;
};

interface PinCodeInputProps {
    route: RouteT;
}

const formatTime = (seconds: number) => {
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const mm = m.toString().padStart(2, '0');
    const ss = s.toString().padStart(2, '0');
    return `${mm}:${ss}`;
};

const PinCodeInput: React.FC<PinCodeInputProps> = ({ route }) => {
    const { phone } = route.params;
    const [pin, setPin] = useState<string[]>(['', '', '', '']);
    const [pinNotCorrect, setPinNotCorrect] = useState<boolean>(false);
    const [secondsLeft, setSecondsLeft] = useState<number>(60);
    const navigation = useNavigation<NavigationProp<any>>();

    useEffect(() => {
        if (secondsLeft > 0) {
            const timer = setInterval(() => {
                setSecondsLeft(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [secondsLeft]);

    const inputRefs = [
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
    ];

    const handleChange = (text: string, index: number) => {
        const char = text.charCodeAt(0);
        if (char < 48 || char > 57) {
            return;
        } else {
            if (pinNotCorrect) {
                setPinNotCorrect(false);
            }
            const newPin = [...pin];
            newPin[index] = text;
            setPin(newPin);

            if (text.length === 1 && index < 3) {
                inputRefs[index + 1].current?.focus();
            }

            if (text === '' && index > 0) {
                inputRefs[index - 1].current?.focus();
            }
        }
    };

    const handleKeyPress = (
        e: NativeSyntheticEvent<TextInputKeyPressEventData>, 
        index: number
    ) => {
        if (e.nativeEvent.key === 'Backspace' && pin[index] === '') {
            if (index > 0) {
                inputRefs[index - 1].current?.focus();
            }
        }
    };

    const handleContinue = async () => {
        const pinString = pin.join('');
        if (pinString === '2222') {
            console.log('login');
            try {
                const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
                const name = 'Бандера Степан Васильович';
                await Keychain.setGenericPassword(phone, JSON.stringify({ jwt, name }));
                await retriveUser();
                navigation.goBack();
                loginEventEmitter.emit('loginSuccess');
            } catch (err) {
                console.log(err);
            }
        } else {
            setPinNotCorrect(true);
            console.log('Credentials are not correct');
        }
    };

    const retriveUser = async () => {
        try {
            const credentials = await Keychain.getGenericPassword();
            if (credentials) {
                const data = JSON.parse(credentials.password);
                return {
                    username: credentials.username,
                    jwt: data.jwt,
                    name: data.name,
                };
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="red" />
            <Text style={{ textAlign: 'center', color: 'red', fontSize: 20, fontWeight: '800' }}>НОВА ПОШТА</Text>
            <View style={{ paddingHorizontal: 16 }}>
                <Text style={{ fontSize: 25, fontWeight: '600', paddingVertical: 20, marginTop: 10 }}>Підтвердіть номер</Text>
                <Text style={{ fontSize: 15, color: '#333333' }}>Ми надіслали код підтвердження на номер телефону</Text>
                <Text style={{ fontSize: 15 }}>{phone}</Text>
            </View>
            <View style={styles.inputsCont}>
                {pin.map((p, index) => (
                    <TextInput
                        key={index}
                        ref={inputRefs[index]}
                        style={styles.input}
                        value={p}
                        placeholder="-"
                        onChangeText={text => handleChange(text, index)}
                        onKeyPress={e => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        autoFocus={index === 0}
                        textAlign="center"
                        placeholderTextColor="black"
                    />
                ))}
            </View>
            <View style={{ paddingHorizontal: 18, borderTopWidth: 1, borderColor: '#d9d9d9' }}>
                <TouchableOpacity
                    style={{ backgroundColor: pin.join('').length === 4 ? 'green' : '#d9d9d9', padding: 10, borderRadius: 8, marginTop: 25 }}
                    onPress={handleContinue}
                    disabled={pin.join('').length !== 4}
                >
                    <Text style={{ color: pin.join('').length === 4 ? 'white' : '#5e5e5e', textAlign: 'center', fontSize: 18 }}>
                        Продовжити
                    </Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20 }}>
                    {secondsLeft > 0 ? (
                        <Text style={{ color: '#5e5e5e', textAlign: 'center', fontSize: 18 }}>
                            Відправити через {formatTime(secondsLeft)}
                        </Text>
                    ) : (
                        <TouchableOpacity onPress={() => setSecondsLeft(60)}>
                            <Text style={{ color: 'green', textAlign: 'center', fontSize: 18 }}>Відправити знову</Text>
                        </TouchableOpacity>
                    )}
                    {pinNotCorrect && (
                        <Text style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>Credentials are not correct</Text>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 18,
    },
    input: {
        padding: 20,
        fontSize: 24,
    },
    inputsCont: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default PinCodeInput;
