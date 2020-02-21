import React, {Component} from 'react';
import {View, Animated, StatusBar} from 'react-native';
import {Accelerometer} from 'expo-sensors';
import AnimatedLayerComponent from './AnimatedLayerComponent';
import {SvgImage1, SvgImage2, SvgImage3} from '../svg';


export default class Parallax extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animationValue: {x: new Animated.Value(0), y: new Animated.Value(0)}
        };
    }

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    proceedAnimation = (value) => {
        Animated.timing(this.state.animationValue.x, {
            toValue: this.getAdjustedValue(value.x, this.props.accelerometerXRange[0], this.props.accelerometerXRange[1]),
            timing: 1
        }).start();
        Animated.timing(this.state.animationValue.y, {
            toValue: this.getAdjustedValue(value.y, this.props.accelerometerYRange[0], this.props.accelerometerYRange[1]),
            timing: 1
        }).start();
    };

    getAdjustedValue = (value, startValue, endValue) => {
        if (value > endValue) {
            return endValue;
        }
        if (value < startValue) {
            return startValue;
        }
        return value;
    };

    _subscribe = () => {
        this._subscription = Accelerometer.addListener((accelerometerData) => {
            this.proceedAnimation(accelerometerData);
        });
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };

    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                {this.props.children.map((child, index) => {
                    return (
                        <AnimatedLayerComponent
                            key={index}
                            orientationVertical={this.props.orientationVertical}
                            animationValue={this.state.animationValue}
                            accelerometerXRange={this.props.accelerometerXRange}
                            accelerometerYRange={this.props.accelerometerYRange}
                            offset={child.props.offset}>
                            {child}
                        </AnimatedLayerComponent>
                    )
                })}
            </View>
        )
    }
}
