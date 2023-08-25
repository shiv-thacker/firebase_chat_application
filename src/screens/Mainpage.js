import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Users from '../tabs/Users';
import Setting from '../tabs/Setting';

const Mainpage = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.container}>
      {selectedTab == 0 ? <Users navigation={navigation} /> : <Setting />}
      <View style={styles.bottomtab}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Image
            source={require('../images/user.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 0 ? 'white' : '#aaaaaa'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Image
            source={require('../images/setting.png')}
            style={[
              styles.tabIcon,
              {tintColor: selectedTab == 1 ? 'white' : '#aaaaaa'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Mainpage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  bottomtab: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: 'purple',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  tab: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  tabIcon: {
    height: 40,
    aspectRatio: 1,
    borderRadius: 5,
  },
});
