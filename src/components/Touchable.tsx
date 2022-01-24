import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React from "react";

const Touchable: React.FC<TouchableOpacityProps> = (props) => {
  return <TouchableOpacity activeOpacity={0.7} {...props} />;
};

export default Touchable;
