# React Native Toast Notification Component

A lightweight and customizable toast notification component for React Native, using `react-native-animatable` for smooth animations.

## Features
- Supports four types of notifications: `success`, `error`, `warning`, and `info`.
- Automatically dismisses after a configurable duration.
- Easy-to-use context API for managing toast notifications globally.

## Demo




## Installation

### Prerequisites
To install `react-native-custom-toastmessage` in your project:
```sh
npm install react-native-custom-toastmessage
```

### Install the Toast Component
Since this is a custom component, you need to copy the provided code into your project.

## Usage

### Step 1: Wrap your App with `ToastProvider`
```tsx
import React from 'react';
import { ToastProvider } from 'react-native-custom-toastmessage';

const App = () => {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
};

export default App;
```

### Step 2: Use `useToast` Hook to Trigger Toast Notifications
```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useToast } from 'react-native-custom-toastmessage'; 

const ExampleScreen = () => {
  const { ToastShow } = useToast();

  return (
    <View>
      <Button
        title="Show Success Toast"
        onPress={() => ToastShow({ text: 'Operation successful!', type: 'success' })}
      />
      <Button
        title="Show Error Toast"
        onPress={() => ToastShow({ text: 'Something went wrong!', type: 'error' })}
      />
    </View>
  );
};

export default ExampleScreen;
```

## Props
The `ToastShow` function accepts the following props:

| Prop      | Type     | Description |
|-----------|---------|-------------|
| `text`    | string  | The message to display. (Required) |
| `type`    | 'success' \| 'error' \| 'warning' \| 'info' | The type of notification (default: `'info'`). |
| `duration` | number  | Duration in milliseconds before the toast disappears (default: `3000`). |

## Customization
You can customize the toast styles by modifying the `styles` object in `ToastProvider`. For example, changing the background colors:
```tsx
const getColor = (type?: string) => {
  switch (type) {
    case 'success': return '#28a745';
    case 'error': return '#dc3545';
    case 'warning': return '#ffc107';
    default: return '#007bff';
  }
};
```

## ☕ Buy Me a Coffee

If you find my work helpful, consider supporting me by buying me a coffee! Your support helps me keep working on open-source projects and creating more content.  

<a href="https://www.buymeacoffee.com/adityarajput" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me a Coffee" width="180">
</a>
