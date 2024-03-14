import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, View, TextInput, Dimensions } from 'react-native';
import {
  GestureDetector,
  Gesture,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import formatWriteDate from '../../utils/formatWriteDate';
import ModalHeader from './ModalHeader';
import { Article } from '../../types/Article';

export interface WritingModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAddArticle: (newArticle: Article) => void;
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const generateID = () => Date.now().toString();
const getCurrentDate = () => new Date().toString();

const WritingModal: React.FC<WritingModalProps> = ({
  isVisible,
  onClose,
  onAddArticle,
}) => {
  const [content, setContent] = useState('');
  const [isScrollEnabled, setIsScrollEnabled] = useState(true);

  const backdropOpacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isClosing = useSharedValue(false);

  const today = formatWriteDate(new Date());
  useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      });
      backdropOpacity.value = withTiming(1, {
        duration: 300,
      });
      isClosing.value = false;
    }
  }, [isVisible, translateY, isClosing, backdropOpacity]);

  useEffect(() => {
    backdropOpacity.value = withTiming(isVisible ? 1 : 0, {
      duration: 300,
    });
  }, [isVisible, backdropOpacity]);

  const animatedBackdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  const saveArticle = async () => {
    const newArticle: Article = {
      id: generateID(),
      date: getCurrentDate(),
      content: content,
      bookMark: false,
      publish: false,
    };
    try {
      const existingArticlesJson = await AsyncStorage.getItem('articles');
      const existingArticles = existingArticlesJson
        ? JSON.parse(existingArticlesJson)
        : [];
      const updatedArticles = [...existingArticles, newArticle];
      await AsyncStorage.setItem('articles', JSON.stringify(updatedArticles));

      onAddArticle(newArticle);
      onClose();
      setContent('');
    } catch (error) {
      console.error('Failed to save the article:', error);
    }
  };

  const onCloseModified = () => {
    isClosing.value = false;
    onClose();
  };

  const closeGesture = Gesture.Pan()
    .onStart(() => {
      isClosing.value = false;
      runOnJS(setIsScrollEnabled)(false);
    })
    .onUpdate((event) => {
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (translateY.value > deviceHeight / 4) {
        translateY.value = withTiming(
          deviceHeight,
          {
            duration: 300,
            easing: Easing.inOut(Easing.cubic),
          },
          () => {
            runOnJS(onClose)();
          },
        );
        isClosing.value = true;
      } else {
        translateY.value = withTiming(0, {
          duration: 300,
          easing: Easing.inOut(Easing.cubic),
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    let position = isClosing.value
      ? withTiming(deviceHeight, {
          duration: 300,
          easing: Easing.inOut(Easing.cubic),
        })
      : translateY.value;
    return {
      transform: [{ translateY: position }],
    };
  });

  return (
    <>
      <Animated.View
        style={[
          styles.backdrop,
          animatedBackdropStyle,
          {
            pointerEvents: isVisible ? 'auto' : 'none',
          },
        ]}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onCloseModified}
      >
        <GestureDetector gesture={closeGesture}>
          <Animated.View style={[styles.modalContainer, animatedStyle]}>
            <ModalHeader formattedDate={today} onSaveArticle={saveArticle} />
            <View style={styles.boundary}></View>
            <ScrollView
              style={styles.scrollView}
              scrollEnabled={isScrollEnabled}
            >
              <TextInput
                style={styles.textInput}
                placeholder="오늘의 성찰을 여기에 디폴트로 깔아주면 될듯"
                multiline
                value={content}
                onChangeText={setContent}
              />
            </ScrollView>
          </Animated.View>
        </GestureDetector>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    marginHorizontal: deviceWidth * 0.03,
    marginTop: deviceHeight * 0.1,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  backdrop: {
    position: 'absolute',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#B7B7B7',
  },
  boundary: {
    padding: 1,
    backgroundColor: '#F7F7F7',
    marginBottom: 5,
  },
  scrollView: {
    flex: 1,
  },
  textInput: {
    fontSize: 18,
    textAlignVertical: 'top',
    marginHorizontal: 16,
  },
});

export default WritingModal;
