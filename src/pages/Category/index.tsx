import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/models/index";
import { ICategory } from "@/models/category";
import _ from "lodash";
import Item from "./Item";
import { RootStackNavigation } from "@/navigator/index";
import HeaderRightBtn from "./HeaderRightBtn";

interface IProps {
  navigation: RootStackNavigation;
}

const Category: React.FC<IProps> = ({ navigation }) => {
  const {
    category: { myCategories, categories },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  console.log({ myCategories, categories });
  const [localMyCategories, setLocalMyCategories] = useState(myCategories);

  const onSubmit = () => {
    dispatch({
      type: "category/toggle",
    });
  };

  navigation.setOptions({
    headerRight: () => <HeaderRightBtn onSubmit={onSubmit} />,
  });

  const classifyGroup = _.groupBy(categories, (item) => item.classify);

  function renderItem(item: ICategory) {
    return <Item data={item} key={item.id} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.classifyName}>我的分类</Text>
      <View style={styles.classifyView}>
        {localMyCategories.map(renderItem)}
      </View>
      <View>
        {Object.keys(classifyGroup).map((classify) => {
          return (
            <View key={classify}>
              <Text style={styles.classifyName}>{classify}</Text>
              <View style={styles.classifyView}>
                {classifyGroup[classify].map(renderItem)}
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
