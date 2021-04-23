import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../styles/colors';
import userImg from '../assets/gustavo.png';
import fonts from '../styles/fonts';

export function Header() {
    const [username, setUsername] = useState('');

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUsername(user || '');
        }

        loadStorageUserName();

    }, [username]); // se deixar o o array vazio, useEffect é chamado uma vez. Se alguma var de estado for passado no vetor, o useEffect
                    // o useEffect será chamado sempre que essa var de estado mudar

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Hello,</Text>
                <Text style={styles.username}>{username}</Text>
            </View>

            <Image style={styles.image} source={userImg} />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 30
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    username: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 40
    }
});