import React, { useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
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
import formatDate from '../utils/formatDate';

const deviceHeight = Dimensions.get('window').height;

interface WritingModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const WritingModal: React.FC<WritingModalProps> = ({ isVisible, onClose }) => {
  const translateY = useSharedValue(0);
  useEffect(() => {
    if (!isVisible) {
      translateY.value = 0;
    }
  }, [isVisible]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      // TODO 닫힘 애니메이션 개선 필요.
      if (translateY.value > deviceHeight / 3) {
        translateY.value = withTiming(
          deviceHeight,
          {
            duration: 1,
            easing: Easing.inOut(Easing.cubic),
          },
          () => {
            runOnJS(onClose)();
          },
        );
      } else {
        translateY.value = withTiming(0, {
          duration: 1,
          easing: Easing.inOut(Easing.cubic),
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    let topPosition =
      translateY.value < -deviceHeight * 0.15
        ? -deviceHeight * 0.15
        : translateY.value;
    topPosition =
      topPosition > deviceHeight * 0.15 ? deviceHeight * 0.15 : topPosition;

    return {
      top: deviceHeight * 0.15,
      transform: [{ translateY: topPosition }],
    };
  });

  const today = new Date();
  const formattedToday = formatDate(today);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalDate}>{formattedToday}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalCloseButtonText}>완료버튼</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.boundary}></View>
          <ScrollView style={styles.scrollView}>
            <TextInput
              style={styles.textInput}
              placeholder="오늘의 성찰을 여기에 디폴트로 깔아주면 될듯"
              multiline
            />
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
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
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginRight: 10,
  },
  modalDate: {
    marginLeft: 10,
    fontSize: 24,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#B7B7B7',
  },
  modalCloseButtonText: {
    fontSize: 18,
    color: '#B7B7B7',
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
