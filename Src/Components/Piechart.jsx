import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, G, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../Context';

const { width } = Dimensions.get('window');
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AttendancePieChart = ({ data }) => {
  const { theme, toggleTheme } = useTheme();

  const radius = 50; 
  const strokeWidth = 100;
  const circumference = 3 * Math.PI * radius; 

  // Shared values for animation
  const startAngle = useSharedValue(0);
  const radiusFactor = useSharedValue(0.1);
  const isAnimating = useRef(false);

  if (!data) return null;

  const { present, absent, late } = data;
  const total = present + absent + late;

  const chartData = [
    { value: present, color: '#01b2af', label: 'Present' },
    { value: absent, color: '#da02ff', label: 'Absent' },
    { value: late, color: '#ff9800', label: 'Late', },
  ];

  // Animated properties for the pie chart
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: circumference * (1 - radiusFactor.value),
      transform: [{ rotate: `${startAngle.value}deg` }],
    };
  });

  
  const startAnimation = () => {
    if (isAnimating.current) return;

    isAnimating.current = true;
    startAngle.value = withTiming(360, { duration: 2000, easing: Easing.linear });
    radiusFactor.value = withTiming(1, { duration: 2000, easing: Easing.out(Easing.ease) });
  };

 
  useEffect(() => {
    startAnimation();
  }, []);

  let cumulativePercentage = 0;

  return (
    <View style={styles.container}>
      <Svg width={width} height={250} viewBox={`0 0 ${width} 250`}>
        <Defs>
          {chartData.map((item, index) => (
            <LinearGradient id={`gradient-${index}`} key={index} x1="0%" y1="0%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor={item.color} />
              <Stop offset="100%" stopColor={item.color} />
            </LinearGradient>
          ))}
        </Defs>
        <G transform={`translate(${width / 2}, 125)`}>
          {chartData.map((item, index) => {
            const percentage = item.value / total;
            const strokeDasharray = `${circumference * percentage} ${circumference}`;
            const rotation = cumulativePercentage * 360;

            // Calculate the position of the legend text
            const angle = (cumulativePercentage + percentage / 2) * 360; // Middle of the segment
            const legendX = (radius + 30) * Math.cos((angle * Math.PI) / 180); // X position
            const legendY = (radius + 30) * Math.sin((angle * Math.PI) / 180); // Y position

            cumulativePercentage += percentage;

            return (
              <React.Fragment key={index}>
                {/* Pie Segment */}
                <AnimatedCircle
                  cx={0}
                  cy={0}
                  r={radius}
                  fill="transparent"
                  stroke={`url(#gradient-${index})`}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  animatedProps={animatedProps}
                  rotation={rotation}
                  originX="0"
                  originY="0"
                />


                <SvgText
                  x={legendX}
                  y={legendY}
                  fill={'white'}
                  fontSize="12"
                  fontWeight={'900'}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  transform={`rotate(${rotation}, ${legendX}, ${legendY})`}
                >
                  {/* {((item.value / total) * 100).toFixed(1)}% */}
                </SvgText>
              </React.Fragment>
            );
          })}

        </G>
      </Svg>

      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={[styles.legendText, { color: theme === 'light' ? '#333' : '#ADA996', }]}>
              {item.label}: {item.value} ({((item.value / total) * 100).toFixed(1)}%)
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  legendContainer: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    // fontFamily:''

    fontWeight: 600,
  },
});

export default AttendancePieChart;