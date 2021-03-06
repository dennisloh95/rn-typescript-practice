import {
  FlatList,
  ScrollView,
  View,
  Text,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RootStackNavigation } from "@/navigator/index";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/models/index";
import Carousel, { slideHeight } from "@/pages/Home/Carousel";
import Guess from "@/pages/Home/Guess";
import ChannelItem from "@/pages/Home/ChannelItem";
import { IChannel } from "@/models/home";

interface IProps {
  navigation: RootStackNavigation;
}

const Home: React.FC<IProps> = () => {
  const {
    home: {
      channels,
      pagination: { hasMore },
      gradientVisible,
    },
    loading: { effects: loading },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch({
      type: "home/fetchCarousels",
    });

    dispatch({
      type: "home/fetchChannels",
    });
  }, []);

  const onPress = (data: IChannel) => {
    console.log(data);
  };

  const renderItem = ({ item }: ListRenderItemInfo<IChannel>) => (
    <ChannelItem data={item} onPress={onPress} />
  );

  // why not use arrow function because it will always rerender
  function header() {
    return (
      <View>
        <Carousel />
        <View style={styles.background}>
          <Guess />
        </View>
      </View>
    );
  }

  function footer() {
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>--我是有底线的--</Text>
        </View>
      );
    }

    if (loading["home/fetchChannels"] && hasMore && channels.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>正在加载中...</Text>
        </View>
      );
    }
  }

  function empty() {
    if (loading["home/fetchChannels"]) return;
    return (
      <View style={styles.empty}>
        <Text>No data</Text>
      </View>
    );
  }

  const keyExtractor = (item: IChannel) => {
    return item.id;
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch({
      type: "home/fetchChannels",
      callback: () => {
        setRefreshing(false);
      },
    });
  };

  const onEndReached = () => {
    if (loading["home/fetchChannels"] || !hasMore) return;
    dispatch({
      type: "home/fetchChannels",
      payload: {
        loadMore: true,
      },
    });
  };

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offSetY = nativeEvent.contentOffset.y;
    let newGradientVisible = offSetY < slideHeight;
    if (gradientVisible !== newGradientVisible) {
      dispatch({
        type: "home/setState",
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  };

  return (
    <FlatList
      ListHeaderComponent={header()}
      ListFooterComponent={footer()}
      ListEmptyComponent={empty()}
      data={channels}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.2}
      onScroll={onScroll}
    />
  );
};

const styles = StyleSheet.create({
  end: {
    alignItems: "center",
    paddingVertical: 10,
  },
  loading: {
    alignItems: "center",
    paddingVertical: 10,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 100,
  },
  background: {
    backgroundColor: "#fff",
  },
});

export default Home;
