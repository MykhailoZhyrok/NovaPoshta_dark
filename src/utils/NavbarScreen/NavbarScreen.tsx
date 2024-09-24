import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon1 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/Ionicons';
import Icon5 from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import * as Keychain from 'react-native-keychain';
import loginEventEmitter from '../../path/eventEmmit';

type NavbarScreenProps = {
    name: string;
};

export default function NavbarScreen({ name }: NavbarScreenProps) {
    const navigation = useNavigation();

    console.log(name)
    switch (name) {
        case 'Points':
            return (
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon4 name='chevron-back' size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Відділення та поштомати</Text>
                    <TouchableOpacity>
                        <Icon5 style={styles.navIcon} name='search1' />
                    </TouchableOpacity>
                </View>
            );
        case 'MyOrders':
            return (
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon4 name='chevron-back' size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Мої посилки</Text>
                    <TouchableOpacity>
                        <Icon5 style={styles.navIcon} name='plus' />
                    </TouchableOpacity>
                </View>
            );
        case 'CreateOrder':
            return (
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon4 name='chevron-back' size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Створити накладну</Text>
                    <View style={{ width: 24 }}></View>
                </View>
            );
        case 'Home':
            return (
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Icon1 name='bell' style={styles.navIcon} size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('UserScreen')}>
                        <Icon3 style={styles.navIcon} name='user-o' />
                    </TouchableOpacity>
                </View>
            );
        case 'UserScreen':
            return (
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon4 name='chevron-back' size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Особистий кабінет</Text>
                    <View style={{ width: 24 }}></View>
                </View>
            );
        case 'SettingsScreen':
            return (
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon4 name='chevron-back' size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Налаштування</Text>
                    <View style={{ width: 24 }}></View>
                </View>
            );
        case 'PaymantsHistory':
            return (
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon4 name='chevron-back' size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Історія операцій</Text>
                    <View style={{ width: 24 }}></View>
                </View>
            )
        default:
            return <Text>Invalid screen name</Text>;
    }
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: 'white'
    },
    navIcon: {
        fontSize: 24,
        // paddingHorizontal: 15
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 15
    },
});
