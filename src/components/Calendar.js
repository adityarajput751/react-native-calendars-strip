import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
} from 'react-native';
import moment from 'moment';
import {
    responsiveScreenWidth,
    responsiveScreenHeight,
    responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

const Calendar = ({ firstTime, onDateSelect, calendarStyle = {} }) => {
    const [selectedDate, setSelectedDate] = useState(moment());
    const [datesInMonth, setDatesInMonth] = useState([]);

    const generateMonthDates = (date) => {
        const start = moment(date).startOf('month');
        const end = moment(date).endOf('month');
        const dates = [];

        for (let d = moment(start); d.isSameOrBefore(end); d.add(1, 'day')) {
            dates.push(moment(d));
        }

        setDatesInMonth(dates);
    };

    useEffect(() => {
        generateMonthDates(selectedDate);
    }, [selectedDate]);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

    const goToPrevMonth = () => {
        const newDate = moment(selectedDate).subtract(1, 'month').startOf('month');
        setSelectedDate(newDate);
        if (onDateSelect) {
            onDateSelect(newDate);
        }
    };

    const goToNextMonth = () => {
        const newDate = moment(selectedDate).add(1, 'month').startOf('month');
        setSelectedDate(newDate);
        if (onDateSelect) {
            onDateSelect(newDate);
        }
    };

    const renderDateItem = ({ item }) => {
        const isSelected = item.isSame(selectedDate, 'day');

        const dayBackgroundColor = isSelected
            ? calendarStyle.selectedDayColor || (firstTime ? '#E0EBF3' : '#11A0F8')
            : '#E0EBF3';

        const textColor = isSelected
            ? calendarStyle.selectedDayTextColor || (firstTime ? '#000' : '#fff')
            : '#000';

        return (
            <TouchableOpacity
                onPress={() => handleDateSelect(item)}
                style={[
                    styles.dayContainer,
                    calendarStyle.dayContainerStyle,
                    { backgroundColor: dayBackgroundColor },
                ]}
            >
                <Text
                    style={[
                        { color: textColor, fontSize: 12 },
                        calendarStyle.dayTextStyle,
                    ]}
                >
                    {item.format('ddd')}
                </Text>
                <Text
                    style={[
                        { color: textColor, fontSize: 14, fontWeight: 'bold' },
                        calendarStyle.dateTextStyle,
                    ]}
                >
                    {item.format('D')}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={calendarStyle.containerStyle || {}}>
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: responsiveScreenHeight(1.3),
                }}
            >
                <TouchableOpacity
                    style={{
                        height: responsiveScreenWidth(7),
                        width: responsiveScreenWidth(7),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={goToPrevMonth}
                >
                    <Image
                        style={{
                            height: responsiveScreenWidth(5),
                            width: responsiveScreenWidth(5),
                        }}
                        source={require('../assets/left.png')} // Make sure this image exists
                    />
                </TouchableOpacity>

                <Text
                    style={[
                        {
                            fontSize: responsiveScreenFontSize(2),
                            fontWeight: 'bold',
                            color: '#000',
                        },
                        calendarStyle.headerTextStyle,
                    ]}
                >
                    {selectedDate.format('MMMM YYYY')}
                </Text>

                <TouchableOpacity
                    style={{
                        height: responsiveScreenWidth(7),
                        width: responsiveScreenWidth(7),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onPress={goToNextMonth}
                >
                    <Image
                        style={{
                            height: responsiveScreenWidth(5),
                            width: responsiveScreenWidth(5),
                        }}
                        source={require('../assets/right.png')} // Make sure this image exists
                    />
                </TouchableOpacity>
            </View>

            {/* Calendar Strip */}
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: responsiveScreenHeight(1),
                    paddingHorizontal: responsiveScreenHeight(1),
                }}
                data={datesInMonth}
                keyExtractor={(item) => item.format('YYYY-MM-DD')}
                renderItem={renderDateItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dayContainer: {
        borderRadius: responsiveScreenWidth(1.8),
        width: responsiveScreenWidth(9.3),
        height: responsiveScreenWidth(9.3),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: responsiveScreenWidth(1.1),
    },
});

export default Calendar;
