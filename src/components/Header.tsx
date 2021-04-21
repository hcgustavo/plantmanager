import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import colors from '../styles/colors';
import userImg from '../assets/gustavo.png';
import fonts from '../styles/fonts';
import { color } from 'react-native-reanimated';

export function Header() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Hello,</Text>
                <Text style={styles.username}>Gustavo</Text>
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