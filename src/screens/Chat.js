import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

const Chat = ({navigation, route}) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('chats')
      .doc(route.params.id + route.params.data.userID)
      .collection('message')
      .orderBy('createdAt', 'desc');

    subscriber.onSnapshot(querysnapshot => {
      const allmessages = querysnapshot.docs.map(item => {
        return {...item._data, createdAt: Date.parse(new Date())};
      });

      setMessages(allmessages);
    });

    return () => subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy: route.params.id,
      sendTo: route.params.data.userID,
      createdAt: Date.parse(msg.createdAt),
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    firestore()
      .collection('chats')
      .doc('' + route.params.id + route.params.data.userID)
      .collection('message')
      .add(myMsg);

    firestore()
      .collection('chats')
      .doc('' + route.params.data.userID + route.params.id)
      .collection('message')
      .add(myMsg);
  }, []);
  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: route.params.id,
        }}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
