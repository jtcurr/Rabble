import React from 'react';
import { Image, Text, View, Button } from 'react-native';
import styles from '../../styles';
import VenueStyles from './VenueStyles';

const ScheduleRow = ({ name, startTime, endTime, geoFences, day }) => (
  <View>
    <View>
      <Image style={VenueStyles.profile_img} source={{ uri: name.img }}/>
      <Text style={VenueStyles.maintext}>{name}</Text>
      <View>
        <Text style={VenueStyles.text}>{geoFences}</Text>
        <Text style={VenueStyles.subtext}>
          {startTime.slice(0,-6)+" "+startTime.slice(startTime.length-2)+" "+
           " - "+endTime.slice(0,-6)+" "+endTime.slice(endTime.length-2)
          }
        </Text>
          <Button
          // onPress={onPressLearnMore}
            title="+"
            color="#b3e0ff"
            accessibilityLabel="Learn more about this purple button"
          />

      </View>
    </View>
    <View style={styles.thinLine} />
  </View>
);

export default ScheduleRow;
