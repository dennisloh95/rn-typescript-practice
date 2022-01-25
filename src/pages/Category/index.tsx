import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/models/index";
import { ICategory } from "@/models/category";
import _ from "lodash";
import Item from "./Item";
import { RootStackNavigation } from "@/navigator/index";
import HeaderRightBtn from "./HeaderRightBtn";
import Touchable from "@/components/Touchable";
import { useEffect } from "react";
import * as Haptics from "expo-haptics";

interface IProps {
  navigation: RootStackNavigation;
}

const fixedItems = [0, 1];

const Category: React.FC<IProps> = ({ navigation }) => {
  const {
    category: { myCategories, categories, isEdit },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [localMyCategories, setLocalMyCategories] = useState(myCategories);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={onSubmit} />,
    });

    return () => {
      dispatch({
        type: "category/setState",
        payload: {
          isEdit: false,
        },
      });
    };
  }, []);

  const onSubmit = () => {
    dispatch({
      type: "category/toggle",
      payload: {
        myCategories: localMyCategories,
      },
    });
  };

  const classifyGroup = _.groupBy(categories, (item) => item.classify);

  const onLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch({
      type: "category/setState",
      payload: {
        isEdit: true,
      },
    });
  };

  const onPress = (item: ICategory, index: number, selected: boolean) => {
    const disabled = fixedItems.indexOf(index) > -1;
    if (disabled && selected) return;
    if (isEdit) {
      if (selected) {
        setLocalMyCategories(
          localMyCategories.filter(
            (selectedItem) => selectedItem.id !== item.id
          )
        );
      } else {
        setLocalMyCategories(localMyCategories.concat([item]));
      }
    }
  };

  function renderItem(item: ICategory, index: number) {
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      <Touchable
        key={item.id}
        onLongPress={onLongPress}
        onPress={() => onPress(item, index, true)}
      >
        <Item data={item} disabled={disabled} isEdit={isEdit} selected={true} />
      </Touchable>
    );
  }

  function renderUnSelectedItem(item: ICategory, index: number) {
    return (
      <Touchable
        key={item.id}
        onLongPress={onLongPress}
        onPress={() => onPress(item, index, false)}
      >
        <Item disabled={false} data={item} isEdit={isEdit} selected={false} />
      </Touchable>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.classifyName}>我的分类</Text>
      <View style={styles.classifyView}>
        {localMyCategories.map((item, index) => renderItem(item, index))}
      </View>
      <View>
        {Object.keys(classifyGroup).map((classify) => {
          return (
            <View key={classify}>
              <Text style={styles.classifyName}>{classify}</Text>
              <View style={styles.classifyView}>
                {classifyGroup[classify].map((item, index) => {
                  if (
                    localMyCategories.find(
                      (selectedItem) => selectedItem.id === item.id
                    )
                  ) {
                    return null;
                  }
                  return renderUnSelectedItem(item, index);
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6f6",
  },
  classifyName: {
    fontSize: 16,
    marginTop: 14,
    marginBottom: 8,
    marginLeft: 10,
  },
  classifyView: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 5,
  },
});

export default Category;
