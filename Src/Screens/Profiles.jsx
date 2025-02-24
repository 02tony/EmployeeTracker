import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    RefreshControl,
} from 'react-native';
import { useTheme } from '../Context';
import { Search, RefreshCw, User, Check, ArrowLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import employeeData from '../Data/employeeData.json';
import { EmployeeListSkeletonLoader } from './SkeletonLoader';
import { SafeAreaView } from 'react-native-safe-area-context';

const EmployeeList = ({ route }) => {
    const { theme, themeStyles } = useTheme();
    const { shift } = route.params;
    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = useState('');
    const [employees, setEmployees] = useState(employeeData.employees);
    const [filter, setFilter] = useState('All');
    const [refreshing, setRefreshing] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading for 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer); 
    }, []);

   
    // useEffect(() => {
    //     const debounceTimer = setTimeout(() => {
            
    //     }, 300);

    //     return () => clearTimeout(debounceTimer);
    // }, [searchQuery]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
            console.log('Refreshed data');
        }, 1000);
    }, []);

    const filteredEmployees = employees.filter((employee) =>
        (filter === 'All' || employee.shiftStatus === filter) &&
        employee.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const onBack = () => {
        navigation.goBack();
    };

    const renderRightActions = (employee) => (
        <View style={{ justifyContent: 'center' }}>
            <RectButton
                style={[styles.swipeAction, styles.approveAction]}
                onPress={() => handleApproveShiftChange(employee)}
            >
                <Check size={24} color="#FFF" />
                <Text style={styles.swipeActionText}>Approve</Text>
            </RectButton>
        </View>
    );

    const renderLeftActions = (employee) => (
        <View style={{ justifyContent: 'center' }}>
            <RectButton
                style={[styles.swipeAction, styles.viewProfileAction]}
                onPress={() => handleViewProfile(employee)}
            >
                <User size={24} color="#FFF" />
                <Text style={styles.swipeActionText}>Profile</Text>
            </RectButton>
        </View>
    );

    const handleApproveShiftChange = (employee) => {
        console.log('Approved shift change for:', employee.name);
    };

    const handleViewProfile = (employee) => {
        console.log('Viewing profile for:', employee.name);
    };

    const renderProfileImage = (employee) => {
        return imageError || !employee.profilePicture ? (
            <View style={[styles.profilePicture, styles.profileFallback]}>
                <Text style={styles.profileFallbackText}>
                    {employee.name.charAt(0).toUpperCase()}
                </Text>
            </View>
        ) : (
            <Image
                source={{ uri: employee.profilePicture }}
                style={styles.profilePicture}
                onError={() => setImageError(true)}
            />
        );
    };

    const uniqueStatuses = ['All', ...new Set(employees.map((emp) => emp.shiftStatus))];

    if (isLoading) {
        return <EmployeeListSkeletonLoader />;
    }

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
            <LinearGradient colors={theme === 'dark' ? ['#141E30', '#243B55'] : ['#2980B9', '#6DD5FA']} style={styles.gradientContainer}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <ArrowLeft size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={styles.tagline}>Smart Attendance for Smarter Workplaces</Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={[styles.searchInput, theme === 'dark' && styles.darkInput]}
                            placeholder="Search employees..."
                            placeholderTextColor={theme === 'dark' ? '#BBB' : '#666'}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        <TouchableOpacity onPress={() => onSearch(searchQuery)} style={styles.reloadButton}>
                            <Search size={24} color="#FFF" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.filterContainer}>
                        {uniqueStatuses.map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={[styles.filterChip, filter === status && styles.activeFilterChip]}
                                onPress={() => setFilter(status)}
                            >
                                <Text style={[styles.filterChipText, filter === status && styles.activeFilterChipText]}>
                                    {status}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <FlatList
                        data={filteredEmployees}
                        keyExtractor={(item) => item.id.toString()}
                        getItemLayout={(_, index) => ({ length: 80, offset: 80 * index, index })}
                        initialNumToRender={10}
                        renderItem={({ item }) => (
                            <Swipeable
                                renderRightActions={() => renderRightActions(item)}
                                renderLeftActions={() => renderLeftActions(item)}
                            >
                                <LinearGradient
                                    colors={
                                        theme === 'light'
                                            ? ['#1c92d2', '#f2fcfe']
                                            : ['#2c3e50', '#3498db']
                                    }
                                    style={styles.employeeCard}
                                >
                                    {renderProfileImage(item)}
                                    <View style={styles.employeeDetails}>
                                        <Text style={[styles.employeeName, theme === 'dark' && styles.darkText]}>{item.name}</Text>
                                        <Text style={[styles.employeeDepartment, theme === 'dark' && styles.darkText]}>{item.department}</Text>
                                        <Text style={[
                                            styles.shiftStatus,
                                            item.shiftStatus === 'Present' && styles.presentStatus,
                                            item.shiftStatus === 'Absent' && styles.absentStatus,
                                            item.shiftStatus === 'Late' && styles.lateStatus,
                                        ]}>
                                            {item.shiftStatus}
                                        </Text>
                                    </View>
                                </LinearGradient>
                            </Swipeable>
                        )}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    />
                </View>
            </LinearGradient>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    gradientContainer: { flex: 1 },
    headerContainer: { flexDirection: 'row', alignItems: 'center', padding: 10 },
    backButton: { marginRight: 10 },
    tagline: { fontSize: 25, fontWeight: '900', color: '#FFF', flex: 1, textAlign: 'center', fontFamily: 'Cochin' },
    container: { flex: 1, padding: 16 },
    searchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    searchInput: { flex: 1, backgroundColor: '#FFF', borderRadius: 8, padding: 10, marginRight: 8 },
    darkInput: { backgroundColor: '#333', color: '#FFF' },
    reloadButton: { padding: 8 },
    filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
    filterChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFF' },
    activeFilterChip: { backgroundColor: '#2980B9' },
    filterChipText: { color: '#2980B9', fontWeight: 'bold' },
    activeFilterChipText: { color: '#FFF' },
    employeeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    darkCard: { backgroundColor: '#1E1E1E', borderColor: '#444' },
    profilePicture: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
    profileFallback: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
        backgroundColor: '#0B486B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileFallbackText: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
    employeeDetails: { flex: 1 },
    employeeName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    employeeDepartment: { fontSize: 14, color: '#666' },
    darkText: { color: '#EEE' },
    shiftStatus: { fontSize: 14, fontWeight: 'bold' },
    presentStatus: { color: '#4CAF50' },
    absentStatus: { color: '#F44336' },
    lateStatus: { color: '#FF9800' },
    swipeAction: { justifyContent: 'center', alignItems: 'center', width: 70, borderRadius: 15, height: 70 },
    approveAction: { backgroundColor: '#4CAF50' },
    viewProfileAction: { backgroundColor: '#2980B9' },
    swipeActionText: { color: '#FFF', fontSize: 12, marginTop: 4 },
});

export default EmployeeList;