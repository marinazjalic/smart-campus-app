import React from 'react';
import { View, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native';

function RoomCapacityDropdown({ selectedValue, setSelectedValue }) {
  //const [selectedCapacity, setSelectedCapacity] = useState('1'); // default value

  return (
    <View style={styles.container}>
      
      <DropDownPicker
        //selectedValue={selectedValue}
        //onValueChange={onValueChange)
        items={[
            {label: '1', value: '1'},
            {label: '2', value: '2'},
            {label: '3', value: '3'},
            {label: '4', value: '4'},
            {label: '5', value: '5'},
            {label: '6', value: '6'},
            {label: '7', value: '7'},
            {label: '8', value: '8'},
          ]}
        defaultValue={selectedValue}
        containerStyle={{height: 40, width: 100}}
        style={{backgroundColor: '#fafafa'}}
        itemStyle={{ justifyContent: 'flex-start' }}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        onChangeItem={item => setSelectedValue(item.value)}
      />
        
     
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
    },
  });

export default RoomCapacityDropdown;
