import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../Context';
import AttendancePieChart from './Piechart';
import UpcomintShifts from './Shifts';
import employeeData from '../Data/employeeData.json';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';
import { Calendar as CalendarIcon, ChevronDown, ChevronUp } from 'lucide-react-native';
import Header from './Header';
import SkeletonLoader from '../Screens/SkeletonLoader';
import PendingRequests from './PendingRequests';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import SafeAreaView

export default function Main() {
    const { theme, themeStyles } = useTheme();
    const data = employeeData?.dashboard?.attendanceSummary;
    const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
            <LinearGradient
                colors={theme === 'light' ? ['#2980B9', '#6DD5FA', '#FFFFFF'] : ['#00416A', '#16222A', '#333']}
                style={styles.gradientContainer}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Header />
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.container}>
                        <TouchableOpacity
                            style={styles.calendarHeader}
                            onPress={() => setIsCalendarExpanded(!isCalendarExpanded)}
                        >
                            <View style={styles.calendarTitleContainer}>
                                <CalendarIcon size={24} color={theme === 'light' ? '#333' : '#bdc3c7'} />
                                <Text style={[styles.sectionTitle, { color: theme === 'light' ? '#333' : '#bdc3c7' }]}>
                                    Attendance Summary
                                </Text>
                            </View>
                            {isCalendarExpanded ? (
                                <ChevronUp size={24} color={theme === 'light' ? '#333' : '#bdc3c7'} />
                            ) : (
                                <ChevronDown size={24} color={theme === 'light' ? '#333' : '#bdc3c7'} />
                            )}
                        </TouchableOpacity>

                        {isCalendarExpanded && (
                            <View style={styles.calendarContainer}>
                                <Calendar
                                    theme={{
                                        backgroundColor: 'transparent',
                                        calendarBackground: 'transparent',
                                        textSectionTitleColor: theme === 'light' ? '#333' : '#FFF',
                                        selectedDayBackgroundColor: '#2980B9',
                                        selectedDayTextColor: '#FFF',
                                        todayTextColor: '#2980B9',
                                        dayTextColor: theme === 'light' ? '#333' : '#FFF',
                                        arrowColor: theme === 'light' ? '#333' : '#FFF',
                                    }}
                                />
                            </View>
                        )}

                        <View style={styles.chartContainer}>
                            <AttendancePieChart data={data} />
                        </View>

                        <Text style={[styles.sectionTitle, { color: theme === 'light' ? '#333' : '#FFF' }]}>
                            Upcoming Shifts
                        </Text>
                        <UpcomintShifts />

                        <PendingRequests requests={employeeData.dashboard.pendingRequests} />
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
    },
    calendarHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 10,
    },
    calendarTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    calendarContainer: {
        width: '100%',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10,
    },
    chartContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
});