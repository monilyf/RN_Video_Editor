import React from 'react';
import { ActivityIndicator } from 'react-native';

const Loader = ({isLoading,style}) => {
  return (
    <>
     {isLoading ?  <ActivityIndicator size="large" style={style}/> : null}
    </>
  )
}

export default Loader;