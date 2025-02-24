import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../Context';

const SkeletonView = ({ style, theme }) => (
    <View style={[style, { backgroundColor: theme === 'light' ? '#e1e1e1' : '#444' }]} />
);

const HeaderSkeleton = ({ theme }) => (
    <SkeletonView style={styles.headerSkeleton} theme={theme} />
);

const PieChartSkeleton = ({ theme }) => (
    <SkeletonView style={styles.chartSkeleton} theme={theme} />
);

const CalenderSkeleton = ({ theme }) => (
    <SkeletonView style={styles.calenderSkeleton} theme={theme} />
);

const ShiftsSkeleton = ({ theme }) => (
    <View style={styles.shiftsContainer}>
        <SkeletonView style={styles.shiftCardSkeleton} theme={theme} />
        <SkeletonView style={styles.shiftCardSkeleton} theme={theme} />
    </View>
);

const SearchBarSkeleton = ({ theme }) => (
    <SkeletonView style={styles.searchBarSkeleton} theme={theme} />
);

const FilterChipsSkeleton = ({ theme }) => (
    <View style={styles.filterChipsContainer}>
        <SkeletonView style={styles.filterChipSkeleton} theme={theme} />
        <SkeletonView style={styles.filterChipSkeleton} theme={theme} />
        <SkeletonView style={styles.filterChipSkeleton} theme={theme} />
    </View>
);

const EmployeeCardSkeleton = ({ theme }) => (
    <View style={styles.employeeCardSkeleton}>
        <SkeletonView style={styles.profilePictureSkeleton} theme={theme} />
        <View style={styles.employeeDetailsSkeleton}>
            <SkeletonView style={styles.employeeNameSkeleton} theme={theme} />
            <SkeletonView style={styles.employeeDepartmentSkeleton} theme={theme} />
            <SkeletonView style={styles.shiftStatusSkeleton} theme={theme} />
        </View>
    </View>
);

const EmployeeListSkeleton = ({ theme }) => (
    <View style={styles.employeeListContainer}>
        {Array.from({ length: 6 }).map((_, index) => (
            <EmployeeCardSkeleton key={index} theme={theme} />
        ))}
    </View>
);

const SkeletonLoader = () => {
    const { theme } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'light' ? '#fff' : '#000' }} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <HeaderSkeleton theme={theme} />
                <CalenderSkeleton theme={theme} />
                <View style={styles.chartContainer}>
                    <PieChartSkeleton theme={theme} />

                </View>
                <CalenderSkeleton theme={theme} />
                <ShiftsSkeleton theme={theme} />
            </View>
        </SafeAreaView>
    );
};

const EmployeeListSkeletonLoader = () => {
    const { theme } = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'light' ? '#fff' : '#000' }} edges={['top', 'left', 'right']}>
            <View style={styles.container}>
                <HeaderSkeleton theme={theme} />
                <SearchBarSkeleton theme={theme} />
                <FilterChipsSkeleton theme={theme} />
                <EmployeeListSkeleton theme={theme} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerSkeleton: {
        height: 80,
        borderRadius: 8,
        marginBottom: 16,
    },
    chartContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    chartSkeleton: {
        width: 250,
        height: 250,
        borderRadius: 125,
        marginTop: 60,
    },
    shiftsContainer: {
        flex: 1,
        justifyContent: 'center',
        height: 50,
    },
    shiftCardSkeleton: {
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
    },
    calenderSkeleton: {
        height: 40,
        borderRadius: 8,
        marginBottom: 16,
    },
    searchBarSkeleton: {
        height: 50,
        borderRadius: 8,
        marginBottom: 16,
    },
    filterChipsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    filterChipSkeleton: {
        width: 80,
        height: 30,
        borderRadius: 20,
    },
    employeeListContainer: {
        flex: 1,
    },
    employeeCardSkeleton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        padding: 16,
        marginBottom: 8,
    },
    profilePictureSkeleton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 16,
    },
    employeeDetailsSkeleton: {
        flex: 1,
    },
    employeeNameSkeleton: {
        width: '60%',
        height: 16,
        borderRadius: 4,
        marginBottom: 8,
    },
    employeeDepartmentSkeleton: {
        width: '40%',
        height: 14,
        borderRadius: 4,
        marginBottom: 8,
    },
    shiftStatusSkeleton: {
        width: '30%',
        height: 14,
        borderRadius: 4,
    },
});

export { HeaderSkeleton, PieChartSkeleton, ShiftsSkeleton, EmployeeListSkeletonLoader };
export default SkeletonLoader;