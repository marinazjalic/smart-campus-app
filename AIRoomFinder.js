import React from 'react';
import { Text, View } from 'react-native';

function AIRoomFinder() {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{fontSize: 32 }}>Sorry,</Text>
            <Text style={{fontSize: 24}}>there are no available rooms</Text>
            <Text style={{fontSize: 24}}>with those preferences...</Text>
        </View>
        
    );
}

export default AIRoomFinder;
