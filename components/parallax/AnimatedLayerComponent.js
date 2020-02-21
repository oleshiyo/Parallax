import {Animated} from "react-native";
import React from "react";
import PropTypes from 'prop-types'

const AnimatedLayerComponent = (props) => {
    return (
        <Animated.View style={{
            transform: [{
                translateX: props.animationValue.y.interpolate({
                    inputRange: props.orientationVertical
                        ? props.accelerometerXRange : props.accelerometerYRange,
                    outputRange: [-props.offset, props.offset]
                })
            },
                {
                    translateY: props.animationValue.x.interpolate({
                        inputRange: props.orientationVertical
                            ? props.accelerometerYRange : props.accelerometerXRange,
                        outputRange: [-props.offset, props.offset]
                    })
                }], position: 'absolute'
        }}>
            {props.children}
        </Animated.View>
    );
};

export default AnimatedLayerComponent;