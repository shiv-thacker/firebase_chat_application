import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Loader from './components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');
  const [visible, setvisible] = useState(false);

  const LoginUser = () => {
    setvisible(true);
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        if (res.docs[0] !== []) {
          console.log(res.docs[0].data());
          Alert.alert('Login Successfully');
          setvisible(false);
          goTOnext(
            res.docs[0].data().name,
            res.docs[0].data().email,
            res.docs[0].data().userID,
          );
        } else {
          Alert.alert('Check Your Credentials');
          setvisible(false);
        }
      })
      .catch(error => {
        Alert.alert('Check Your Credentials');
        setvisible(false);
      });
  };

  const goTOnext = async (name, email, userId) => {
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('email', email);
    await AsyncStorage.setItem('userId', userId);

    navigation.navigate('Mainpage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Enter your Email"
        style={[styles.input, {marginTop: 50}]}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter your Password"
        style={styles.input}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity style={styles.btn} onPress={() => LoginUser()}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.orLogin}
        onPress={() => navigation.navigate('Signup')}>
        Or Signup
      </Text>
      <Loader visible={visible} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    marginTop: 50,
    fontWeight: '600',
  },

  input: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
    paddingLeft: 20,
    color: 'black',
  },

  btn: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    backgroundColor: 'purple',
  },

  btnText: {
    color: 'white',
    fontSize: 20,
  },
  orLogin: {
    alignSelf: 'center',
    marginTop: 50,
    fontSize: 20,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: 'black',
    textDecorationColor: 'black',
  },
});
