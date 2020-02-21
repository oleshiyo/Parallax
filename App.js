import React from 'react';
import {StatusBar, View} from 'react-native';
import Parallax from './components/parallax';
import {SvgImage1, SvgImage2, SvgImage3} from './components/svg';


export default class App extends React.Component {


  render() {
    return (
        <Parallax
            accelerometerXRange={[0.5, 1]}
            accelerometerYRange={[-0.2, 0.2]}
            orientationVertical={false}>
          <SvgImage1 offset={0}/>
          <SvgImage2 offset={10}/>
          <SvgImage3 offset={30}/>
        </Parallax>
    );
  }
}





