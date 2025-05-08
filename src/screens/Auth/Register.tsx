import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { Mail, Lock, ChevronLeft } from 'lucide-react-native';

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backButton}>
        <View style={styles.iconWrapper}>
          <ChevronLeft size={24} />
        </View>
      </Pressable>

      {/* Title + Subtitle */}
      <Text style={styles.title}>Welcome to Wash World</Text>
      <Text style={styles.subtitle}>
        Sign up to unlock premium washes and exclusive deals—fast and easy!
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          placeholderTextColor="#999"
          keyboardType="email-address"
        />
        <View style={styles.iconWrapper}>
          <Mail size={20} />
        </View>
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Password"
          style={styles.textInput}
          secureTextEntry
          placeholderTextColor="#999"
        />
        <View style={styles.iconWrapper}>
          <Lock size={20} />
        </View>
      </View>

      {/* Repeat Password Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Repeat Password"
          style={styles.textInput}
          secureTextEntry
          placeholderTextColor="#999"
        />
        <View style={styles.iconWrapper}>
          <Lock size={20} />
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity style={[styles.button, styles.buttonDisabled]}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account? <Text style={styles.link}>Login instead</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
  },
  iconWrapper: {
    marginLeft: 8,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonActive: {
    backgroundColor: '#0AC267',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: '#333',
  },
  link: {
    color: '#0AC267',
    fontWeight: 'bold',
  },
});
