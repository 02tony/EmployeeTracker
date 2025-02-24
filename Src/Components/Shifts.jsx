import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Clock, Sun, Moon } from 'lucide-react-native';
import employeeData from '../Data/employeeData.json';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../Context';

const UpcomingShifts = () => {
    const navigation = useNavigation();
    const { theme } = useTheme();

    const handleCardPress = (shift) => {
        navigation.navigate('EmployeeList', { shift }); 
    };

    const getShiftIcon = (shiftType) => {
        switch (shiftType) {
            case 'Morning':
                return <Sun size={32} color={theme === 'light' ? '#FFD700' : '#FFDD44'} />;
            case 'Evening':
                return <Clock size={32} color={theme === 'light' ? '#FF4500' : '#FF6347'} />;
            case 'Night':
                return <Moon size={32} color={theme === 'light' ? '#6A5ACD' : '#B19CD9'} />;
            default:
                return <Clock size={32} color="#888" />;
        }
    };

    return (
        <View style={styles.container}>
            {employeeData?.dashboard?.upcomingShifts.map((shift, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.card,
                        {
                            backgroundColor: theme === 'light' ? '#FFFFFF' : '#1E1E1E',
                            shadowColor: theme === 'light' ? '#000' : '#000',
                        },
                    ]}
                    activeOpacity={0.9}
                    onPress={() => handleCardPress(shift)}
                >
                    <LinearGradient
                        colors={
                            theme === 'light'
                                ? ['#1c92d2', '#f2fcfe']
                                : ['#2c3e50', '#3498db']
                        }
                        style={styles.gradientCard}
                    >
                        <View style={styles.iconContainer}>{getShiftIcon(shift.shiftType)}</View>

                        <Text style={[styles.shiftType, { color: theme === 'light' ? '#007AFF' : '#66D9EF' }]}>
                            {shift.shiftType}
                        </Text>

                        <Text style={[styles.shiftTime, { color: theme === 'light' ? '#555' : '#DDD' }]}>
                            🕒 {shift.startTime} - {shift.endTime}
                        </Text>

                        <Text style={[styles.assignedEmployees, { color: theme === 'light' ? '#888' : '#BBB' }]}>
                            👥 {shift.assignedEmployees} Employees Assigned
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    card: {
        borderRadius: 16,
        marginBottom: 20,
        overflow: 'hidden',
        elevation: 6,
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    gradientCard: {
        padding: 24,
        borderRadius: 16,
        width: 350,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    shiftType: {
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
    },
    shiftTime: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 8,
        fontWeight: 600,
    },
    assignedEmployees: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 8,
        fontWeight: 600,
    },
});

export default UpcomingShifts;