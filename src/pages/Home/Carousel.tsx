import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import SnapCarousel, {
  AdditionalParallaxProps,
  ParallaxImage,
  Pagination,
} from "react-native-snap-carousel";
import { hp, viewportWidth, wp } from "@/utils/index";
import { ICarousel } from "@/models/home";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/models/index";

const sliderWidth = viewportWidth;
const slideWidth = wp(90);
export const slideHeight = hp(26);
const itemWidth = slideWidth + wp(2) * 2;

const Carousel: React.FC = () => {
  const {
    home: { carousels: data, activeCarouselIndex },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  data;

  const renderItem = (
    { item }: { item: ICarousel },
    parallaxProps?: AdditionalParallaxProps
  ) => {
    return (
      <ParallaxImage
        {...parallaxProps}
        source={{ uri: item.image }}
        style={styles.image}
        parallaxFactor={0.5}
        containerStyle={styles.imageContainer}
        showSpinner
        spinnerColor="rgba(0,0,0,.25)"
      />
    );
  };

  const onSnapToItem = (index: number) => {
    dispatch({
      type: "home/setState",
      payload: {
        activeCarouselIndex: index,
      },
    });
  };

  const PaginationItem = () => {
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          dotsLength={data.length}
          activeDotIndex={activeCarouselIndex}
          dotStyle={styles.dot}
          dotContainerStyle={styles.dotContainer}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    );
  };

  return (
    <View>
      <SnapCarousel
        data={data}
        hasParallaxImages
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        onSnapToItem={onSnapToItem}
        loop
        autoplay
      />
      <PaginationItem />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: itemWidth,
    height: slideHeight,
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  paginationWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  paginationContainer: {
    position: "absolute",
    top: -20,
    backgroundColor: "rgba(0,0,0,.25)",
    paddingHorizontal: 3,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,.9)",
  },
});

export default Carousel;
