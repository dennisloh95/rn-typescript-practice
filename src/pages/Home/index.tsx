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
import { IChannel, IGuess } from "@/models/home";
import { RouteProp } from "@react-navigation/native";
import { HomeParamList } from "@/navigator/HomeTabs";

interface IProps {
  navigation: RootStackNavigation;
  route: RouteProp<HomeParamList, string>;
}

const Home: React.FC<IProps> = ({
  route: {
    params: { namespace },
  },
  navigation,
}) => {
  const state = useSelector((state: RootState) => state);
  const carousels = state[namespace].carousels;
  const channels = state[namespace].channels;
  const hasMore = state[namespace].pagination.hasMore;
  const gradientVisible = state[namespace].gradientVisible;
  const loading = state.loading.effects[`${namespace}/fetchChannels`];

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch({
      type: `${namespace}/fetchCarousels`,
    });

    dispatch({
      type: `${namespace}/fetchChannels`,
    });
  }, []);

  const goAlbum = (data: IChannel | IGuess) => {
    navigation.navigate("Album", { item: data });
  };

  const renderItem = ({ item }: ListRenderItemInfo<IChannel>) => (
    <ChannelItem data={item} onPress={goAlbum} />
  );

  // why not use arrow function because it will always rerender
  function header() {
    return (
      <View>
        <Carousel />
        <View style={styles.background}>
          <Guess namespace={namespace} goAlbum={goAlbum} />
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

    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>正在加载中...</Text>
        </View>
      );
    }
  }

  function empty() {
    if (loading) return;
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
      type: `${namespace}/fetchChannels`,
      callback: () => {
        setRefreshing(false);
      },
    });
  };

  const onEndReached = () => {
    if (loading || !hasMore) return;
    dispatch({
      type: `${namespace}/fetchChannels`,
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
        type: `${namespace}/setState`,
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
