import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import {
  Check,
  AlertTriangle,
  Info,
  XCircle,
} from 'lucide-react-native';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertMessageProps {
  type: AlertType;
  message: string;
  duration?: number;
  onHide?: () => void;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  message,
  duration = 2000,
  onHide,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getDefaults = (alertType: AlertType) => {
    switch (alertType) {
      case 'error':
        return { icon: <XCircle color="white" size={20} />, backgroundColor: '#D71515' };
      case 'warning':
        return { icon: <AlertTriangle color="white" size={20} />, backgroundColor: '#F36A21' };
      case 'info':
        return { icon: <Info color="white" size={20} />, backgroundColor: '#335AB3' };
      case 'success':
      default:
        return { icon: <Check color="white" size={20} />, backgroundColor: '#34B566' };
    }
  };

  const { icon, backgroundColor } = getDefaults(type);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        if (onHide) onHide();
      });
    }, duration);

    return () => clearTimeout(timeout);
  }, [fadeAnim, duration, onHide]);

  return (
    <Animated.View style={[styles.container, { backgroundColor, opacity: fadeAnim }]}>
      <View style={styles.content}>
        {icon}
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -150 }, { translateY: -30 }], // Centers the alert
    width: 300,
    padding: 15,
    borderRadius: 8,
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 8,
  },
});

export default AlertMessage;