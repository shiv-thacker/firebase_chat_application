import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalview}>
        <View style={styles.mainview}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalview: {
    width: Dimensions.get('window').width,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainview: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
