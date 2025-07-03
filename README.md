# React Native Calendar Strip Component

A lightweight, customizable, and responsive horizontal calendar strip for React Native. It supports smooth month navigation and date selection, making it ideal for apps needing calendar UI like event booking, attendance, schedules, and more.

## ✨ Features

- 📅 Horizontal scrolling calendar view
- 🔁 Month navigation (previous / next)
- 🎨 Customizable styles using `calendarStyle` prop
- 📱 Responsive with `react-native-responsive-dimensions`
- ⚡ Powered by `moment.js` for date handling

## 📸 Demo

<img src="./src/demo.gif" alt="Calendar Demo" width="180" />

---

## 📦 Installation

```bash
npm install react-native-calendars-strip
 ```
## Usage

### Step 1: Wrap your App with `Calendar Strip`
```tsx
import React from 'react';
import { View } from 'react-native';
import Calendar from 'react-native-calendars-strip';

const App = () => {
  const handleDateSelect = (date) => {
    console.log('Selected Date:', date.format('YYYY-MM-DD'));
  };

  return (
    <View>
      <Calendar
        firstTime={true}
        onDateSelect={handleDateSelect}
        calendarStyle={{
          selectedDayColor: '#FF6347',
          selectedDayTextColor: '#fff',
          headerTextStyle: { color: '#333' },
          dayTextStyle: { fontSize: 13 },
          dateTextStyle: { fontSize: 15, fontWeight: '600' },
          containerStyle: { backgroundColor: '#F9F9F9', padding: 10 },
        }}
      />
    </View>
  );
};

export default App;

```

## Customization (calendarStyle)
- You can customize the appearance by passing an object to the calendarStyle prop:

```tsx

calendarStyle = {
  selectedDayColor?: string,
  selectedDayTextColor?: string,
  containerStyle?: ViewStyle,
  headerTextStyle?: TextStyle,
  dayContainerStyle?: ViewStyle,
  dayTextStyle?: TextStyle,
  dateTextStyle?: TextStyle,
}
```

