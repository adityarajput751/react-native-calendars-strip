import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    useWindowDimensions,
} from 'react-native';
import moment from 'moment';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

const DEFAULT_DAY_COLOR = '#E0EBF3';
const DEFAULT_SELECTED_DAY_COLOR = '#11A0F8';
const DISABLED_OPACITY = 0.35;
const ARROW_HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };
const DAY_HIT_SLOP = { top: 6, bottom: 6 };

const Calendar = ({
    firstTime,
    onDateSelect,
    onMonthChange,
    selectedDate: selectedDateProp,
    minDate,
    maxDate,
    calendarStyle = {},
}) => {
    // Subscribes to size changes so the sizes below follow rotation and split-screen.
    useWindowDimensions();

    const listRef = useRef(null);
    const hasScrolled = useRef(false);
    const [listWidth, setListWidth] = useState(0);
    const [selectedDate, setSelectedDate] = useState(() =>
        selectedDateProp ? moment(selectedDateProp) : moment()
    );

    const selectedDateKey = selectedDateProp
        ? moment(selectedDateProp).format('YYYY-MM-DD')
        : null;

    useEffect(() => {
        if (selectedDateKey) {
            setSelectedDate(moment(selectedDateProp));
        }
    }, [selectedDateKey]);

    const monthKey = selectedDate.format('YYYY-MM');

    const datesInMonth = useMemo(() => {
        const start = moment(selectedDate).startOf('month');
        const end = moment(selectedDate).endOf('month');
        const dates = [];

        for (let d = moment(start); d.isSameOrBefore(end); d.add(1, 'day')) {
            dates.push(moment(d));
        }

        return dates;
    }, [monthKey]);

    const dayWidth = responsiveWidth(9.3);
    const dayMargin = responsiveWidth(1.1);
    const listPadding = responsiveWidth(2.2);
    const itemLength = dayWidth + dayMargin * 2;
    const selectedIndex = selectedDate.date() - 1;

    // Keeps the selected day in view, centred where the list allows it.
    useEffect(() => {
        if (!listWidth || !listRef.current) {
            return;
        }

        const contentWidth = listPadding * 2 + itemLength * datesInMonth.length;
        const centredOffset =
            listPadding + itemLength * selectedIndex - (listWidth - itemLength) / 2;
        const offset = Math.max(0, Math.min(centredOffset, contentWidth - listWidth));

        listRef.current.scrollToOffset({ offset, animated: hasScrolled.current });
        hasScrolled.current = true;
    }, [monthKey, selectedIndex, listWidth, itemLength]);

    const isDateDisabled = (date) =>
        Boolean(
            (minDate && date.isBefore(minDate, 'day')) ||
                (maxDate && date.isAfter(maxDate, 'day'))
        );

    const canGoToPrevMonth =
        !minDate ||
        moment(selectedDate)
            .subtract(1, 'month')
            .endOf('month')
            .isSameOrAfter(minDate, 'day');

    const canGoToNextMonth =
        !maxDate ||
        moment(selectedDate)
            .add(1, 'month')
            .startOf('month')
            .isSameOrBefore(maxDate, 'day');

    // Callbacks get their own copy, so a consumer calling date.add() can't change our state.
    const handleDateSelect = (date) => {
        setSelectedDate(moment(date));
        if (onDateSelect) {
            onDateSelect(moment(date));
        }
    };

    const changeMonth = (amount) => {
        let newDate = moment(selectedDate).add(amount, 'month').startOf('month');
        if (minDate && newDate.isBefore(minDate, 'day')) {
            newDate = moment(minDate);
        }

        handleDateSelect(newDate);
        if (onMonthChange) {
            onMonthChange(moment(newDate));
        }
    };

    const getItemLayout = (_, index) => ({
        length: itemLength,
        offset: listPadding + itemLength * index,
        index,
    });

    const renderDateItem = ({ item }) => {
        const isSelected = item.isSame(selectedDate, 'day');
        const isDisabled = isDateDisabled(item);

        const selectedBackgroundColor = isSelected
            ? calendarStyle.selectedDayColor ||
              (firstTime ? null : DEFAULT_SELECTED_DAY_COLOR)
            : null;

        const textColor = isSelected
            ? calendarStyle.selectedDayTextColor || (firstTime ? '#000' : '#fff')
            : '#000';

        return (
            <TouchableOpacity
                onPress={() => handleDateSelect(item)}
                disabled={isDisabled}
                hitSlop={DAY_HIT_SLOP}
                accessibilityRole="button"
                accessibilityLabel={item.format('dddd, MMMM D, YYYY')}
                accessibilityState={{ selected: isSelected, disabled: isDisabled }}
                style={[
                    {
                        borderRadius: responsiveWidth(1.8),
                        width: dayWidth,
                        minHeight: dayWidth,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: dayMargin,
                        backgroundColor: DEFAULT_DAY_COLOR,
                    },
                    calendarStyle.dayContainerStyle,
                    selectedBackgroundColor && {
                        backgroundColor: selectedBackgroundColor,
                    },
                    isDisabled && { opacity: DISABLED_OPACITY },
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

    const renderArrow = (label, source, enabled, onPress) => (
        <TouchableOpacity
            style={{
                height: responsiveWidth(7),
                width: responsiveWidth(7),
                alignItems: 'center',
                justifyContent: 'center',
                opacity: enabled ? 1 : DISABLED_OPACITY,
            }}
            onPress={onPress}
            disabled={!enabled}
            hitSlop={ARROW_HIT_SLOP}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ disabled: !enabled }}
        >
            <Image
                style={[
                    {
                        height: responsiveWidth(5),
                        width: responsiveWidth(5),
                    },
                    calendarStyle.arrowColor && {
                        tintColor: calendarStyle.arrowColor,
                    },
                ]}
                source={source}
            />
        </TouchableOpacity>
    );

    return (
        <View style={calendarStyle.containerStyle || {}}>
            {/* Header */}
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: responsiveHeight(1.3),
                }}
            >
                {renderArrow(
                    'Previous month',
                    require('../assets/left.png'),
                    canGoToPrevMonth,
                    () => changeMonth(-1)
                )}

                <Text
                    accessibilityRole="header"
                    style={[
                        {
                            fontSize: responsiveFontSize(2),
                            fontWeight: 'bold',
                            color: '#000',
                        },
                        calendarStyle.headerTextStyle,
                    ]}
                >
                    {selectedDate.format('MMMM YYYY')}
                </Text>

                {renderArrow(
                    'Next month',
                    require('../assets/right.png'),
                    canGoToNextMonth,
                    () => changeMonth(1)
                )}
            </View>

            {/* Calendar Strip */}
            <FlatList
                ref={listRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingVertical: responsiveHeight(1),
                    paddingHorizontal: listPadding,
                }}
                data={datesInMonth}
                keyExtractor={(item) => item.format('YYYY-MM-DD')}
                renderItem={renderDateItem}
                getItemLayout={getItemLayout}
                initialNumToRender={31}
                onLayout={(event) => setListWidth(event.nativeEvent.layout.width)}
            />
        </View>
    );
};

export default Calendar;
