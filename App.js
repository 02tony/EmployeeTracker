import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Main from './Src/Components/main';
import Header from './Src/Components/Header';
import { MyContextProvider } from './Src/Context'; 
import EmployeeList from './Src/Screens/Profiles';

const Stack = createStackNavigator();

export default function App() {
    return (
        <MyContextProvider>
            <SafeAreaView style={styles.container}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Main">
                        <Stack.Screen
                            name="Main"
                            component={Main}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="EmployeeList"
                            component={EmployeeList}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
                <StatusBar style="auto" />
            </SafeAreaView>
        </MyContextProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});