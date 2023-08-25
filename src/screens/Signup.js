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
import uuid from 'react-native-uuid';

const Signup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = () => {
    const userID = uuid.v4();

    firestore()
      .collection('users')
      .doc(userID)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userID: userID,
      })
      .then(() => {
        console.log('user created');
        Alert.alert('Sign up Successfully');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.log(error);
      });
  };

  const validate = () => {
    let isValid = true;
    if (name == '') {
      isValid = false;
    }
    if (email == '') {
      isValid = false;
    }
    if (mobile == '') {
      isValid = false;
    }
    if (password == '') {
      isValid = false;
    }
    if (confirmPassword !== password) {
      isValid = false;
    }

    return isValid;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        placeholder="Enter your name"
        style={[styles.input, {marginTop: 30}]}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        placeholder="Enter your Email"
        style={styles.input}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        placeholder="Enter your Mobile"
        style={styles.input}
        keyboardType={'number-pad'}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        placeholder="Enter your Password"
        style={styles.input}
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TextInput
        placeholder="Enter your Conform Password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (validate()) {
            registerUser();
          } else {
            Alert.alert('please check your feilds');
          }
        }}>
        <Text style={styles.btnText}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.orLogin} onPress={() => navigation.goBack()}>
        Or Login
      </Text>
    </View>
  );
};

export default Signup;

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
