import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '../Context';
import { LinearGradient } from 'expo-linear-gradient';

const Logo = require('../../assets/IconsLogo.png');
const off = require('../../assets/off.png'); 
const on = require('../../assets/on.png'); 
export default function Header() {
    const { theme, toggleTheme } = useTheme();

    return (
        <LinearGradient
            colors={theme === 'light' ? ['#2980B9', '#6DD5FA',] : ['#00416A', '#16222A']}
            style={styles.header}
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }} 
        >
            <View style={styles.headerIcon}>
                <Image source={Logo} style={styles.logo} />
            </View>

            <View style={styles.headerName}>
                <Text style={[styles.text, { color: theme === 'light' ? '#232526' : '#FFF' }]}>
                    CORPONIC
                </Text>
            </View>

            <TouchableOpacity style={styles.toggleContainer} onPress={toggleTheme}>
                {theme === 'light' ? (
                    <Image source={off} style={styles.toggleImage} />
                ) : (
                    <Image source={on} style={styles.toggleImage} />
                )}
            </TouchableOpacity>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    headerIcon: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    logo: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    headerName: {
        flex: 2,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Bold',
        textTransform: 'uppercase', 
        letterSpacing: 1.5, 
    },
    toggleContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    toggleImage: {
        width: 40, 
        height: 40, 
        resizeMode: 'contain',
    },
});