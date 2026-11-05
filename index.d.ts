import type { ComponentType } from 'react';
import type { Moment, MomentInput } from 'moment';
import type { ColorValue, StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface CalendarStyle {
    selectedDayColor?: ColorValue;
    selectedDayTextColor?: ColorValue;
    arrowColor?: ColorValue;
    containerStyle?: StyleProp<ViewStyle>;
    headerTextStyle?: StyleProp<TextStyle>;
    dayContainerStyle?: StyleProp<ViewStyle>;
    dayTextStyle?: StyleProp<TextStyle>;
    dateTextStyle?: StyleProp<TextStyle>;
}

export interface CalendarProps {
    /** The date to show as selected. The calendar follows this prop whenever it changes. */
    selectedDate?: MomentInput;
    /** Days before this date are disabled. */
    minDate?: MomentInput;
    /** Days after this date are disabled. */
    maxDate?: MomentInput;
    /** Called when a day is tapped, and when the month arrows select a new date. */
    onDateSelect?: (date: Moment) => void;
    /** Called when the month arrows change the month. */
    onMonthChange?: (date: Moment) => void;
    /** Draws the selected day like any other day, unless `selectedDayColor` is set. */
    firstTime?: boolean;
    calendarStyle?: CalendarStyle;
}

declare const Calendar: ComponentType<CalendarProps>;

export default Calendar;
