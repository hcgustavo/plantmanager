import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, View, Alert} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function UserIdentification() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    const navigation = useNavigation();

    const handleInputBlur = () => {
        setIsFocused(false);
        setIsFilled(!!name);
    };

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputChange = (value: string) => {
        setIsFilled(!!value);
        setName(value);
    };

    async function handleSubmit() {
        if(!name) {
            return Alert.alert("Tell me what I should call you 😢");
        }

        try {
            await AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
                title: 'All done',
                subtitle: "Now let's start taking care of your plants carefully.",
                buttonTitle: 'Start',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        } catch (error) {
            Alert.alert("It was not possible to save your name 😢");
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios'? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <Text style={styles.emoji}>{isFilled ? '😄' : '😀'}</Text>
                            <Text style={styles.title}>
                                What should I {'\n'}
                                call you?
                            </Text>
                            <TextInput 
                                style={[styles.input, (isFocused || isFilled) && {borderColor: colors.green}]} 
                                placeholder="Type a name" 
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button 
                                    title="Confirm"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    footer: {
        marginTop: 40,
        width: '100%',
        padding: 20
    }
});