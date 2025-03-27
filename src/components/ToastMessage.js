import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dimensions, Platform, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), toast.duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const ToastShow = (options) => setToast(options);

  return (
    <ToastContext.Provider value={{ ToastShow }}>
      {children}
      {toast && (
        <Animatable.View
          animation="bounceInDown"
          duration={500}
          style={[styles.toast, { backgroundColor: getColor(toast.type) }]}
        >
          <Text style={styles.message}>{toast.text}</Text>
        </Animatable.View>
      )}
    </ToastContext.Provider>
  );
};

const getColor = (type) => {
  switch (type) {
    case 'success': return 'green';
    case 'error': return 'red';
    case 'warning': return 'orange';
    default: return 'blue';
  }
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  toast: {
    width: Math.min(width * 0.9, 400),
    padding: width * 0.04,
    position: 'absolute',
    top: Platform.OS === 'ios' ? height * 0.06 : height * 0.01,
    zIndex: 1000,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  message: {
    color: '#fff',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    // textAlign: 'center',
  },
});