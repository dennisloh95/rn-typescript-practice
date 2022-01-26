import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/models/index";
import { ICategory } from "@/models/category";
import _ from "lodash";
import Item, { parentWidth, itemWidth, itemHeight, itemMargin } from "./Item";
import { RootStackNavigation } from "@/navigator/index";
import HeaderRightBtn from "./HeaderRightBtn";
import Touchable from "@/components/Touchable";
import { useEffect } from "react";
import * as Haptics from "expo-haptics";
import { DragSortableView } from "react-native-drag-sort";

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
  const [scrollEnabled, setScrollEnbled] = useState(true);

  useEffect(() => {
    const onSubmit = () => {
      dispatch({
        type: "category/toggle",
        payload: {
          myCategories: localMyCategories,
        },
      });
      if (isEdit) {
        navigation.goBack();
      }
    };

    navigation.setOptions({
      headerRight: () => <HeaderRightBtn onSubmit={onSubmit} />,
    });
  }, [dispatch, navigation, isEdit, localMyCategories]);

  useEffect(() => {
    return () => {
      dispatch({
        type: "category/setState",
        payload: {
          isEdit: false,
        },
      });
    };
  }, [dispatch]);

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

  const onDateChange = (data: ICategory[]) => {
    setLocalMyCategories(data);
  };

  function renderItem(item: ICategory, index: number) {
    const disabled = fixedItems.indexOf(index) > -1;
    return (
      <Item data={item} disabled={disabled} isEdit={isEdit} selected={true} />
    );
  }

  function renderUnSelectedItem(item: ICategory, index: number) {
    return (
      <Touchable
        key={item.id}
        onLongPress={onLongPress}
        onPress={() => onPress(item, index, false)}
      >
        <Item data={item} isEdit={isEdit} selected={false} />
      </Touchable>
    );
  }

  const onClickItem = (data: ICategory[], item: ICategory) => {
    onPress(item, data.indexOf(item), true);
  };

  return (
    <ScrollView style={styles.container} scrollEnabled={scrollEnabled}>
      <Text style={styles.classifyName}>我的分类</Text>
      <View style={styles.classifyView}>
        <DragSortableView
          fixedItems={fixedItems}
          dataSource={localMyCategories}
          renderItem={(item, index) => renderItem(item, index)}
          sortable={isEdit}
          keyExtractor={(item) => item.id}
          onDataChange={onDateChange}
          parentWidth={parentWidth}
          childrenWidth={itemWidth}
          childrenHeight={itemHeight}
          marginChildrenTop={itemMargin}
          onClickItem={onClickItem}
        />
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
