import React, {Component} from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native';
import {Accelerometer} from "expo-sensors";


export default class AnimatedComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationValue: {x: new Animated.Value(1), y: new Animated.Value(1)},
            accelerometerData: {x: 0, y: 0, z: 0}
        };
    }

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    startScaleAnimation = () => {
        Animated.timing(this.state.animationValue.x, {
            toValue: -100 * this.state.accelerometerData.x,
            timing: 10
        }).start();
        Animated.timing(this.state.animationValue.y, {
            toValue: 200 * this.state.accelerometerData.y,
            timing: 10
        }).start();
    }

    _subscribe = () => {
        this._subscription = Accelerometer.addListener((accelerometerData) => {
            this.setState({accelerometerData});
            this.startScaleAnimation();
        });
    }

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <View style={{alignItems: "center"}}>
                    <Animated.View style={{
                        width: 180,
                        height: 180,
                        backgroundColor: '#FF6F00',
                        transform: [{translateX: this.state.animationValue.x}, {translateY: this.state.animationValue.y}]
                    }}>
                        <Text>{this.state.accelerometerData.x}</Text>
                    </Animated.View>
                </View>
            </View>
        )
    }
}
