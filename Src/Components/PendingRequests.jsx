import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../Context';
import { LinearGradient } from 'expo-linear-gradient';


const PendingRequests = ({ requests }) => {
    const { theme } = useTheme();

    const renderRequestItem = ({ item }) => (
        <LinearGradient
            colors={theme === 'light' ? ['#1c92d2', '#f2fcfe'] : ['#2c3e50', '#3498db']}
            style={[styles.requestCard, theme === 'dark' && styles.darkCard]}
        >
            <Text style={[styles.requestType, { color: theme === 'light' ? '#333' : '#FFF' }]}>
                {item.type}
            </Text>
            <Text style={[styles.requestText, { color: theme === 'light' ? '#666' : '#BBB' }]}>
                {item.employeeName} ({item.department})
            </Text>
            <Text style={[styles.requestText, { color: theme === 'light' ? '#666' : '#BBB' }]}>
                Date: {item.date}
            </Text>
        </LinearGradient>
    );

    return (
        <View style={styles.container}>
            <Text style={[styles.sectionTitle, { color: theme === 'light' ? '#333' : '#bdc3c7' }]}>
                Pending Requests
            </Text>
            <FlatList
                data={requests}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRequestItem}
                contentContainerStyle={styles.listContainer}
                nestedScrollEnabled
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listContainer: {
        paddingBottom: 10,
    },
    requestCard: {
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    darkCard: {
        backgroundColor: '#1E1E1E',
    },
    requestType: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    requestText: {
        fontSize: 14,
    },
});

export default PendingRequests;
