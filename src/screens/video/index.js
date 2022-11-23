import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  Modal,
  TouchableOpacity,
  View,
  Pressable,
  Image,
} from 'react-native';
import styles from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Loader from '../../components/Loader';
import VideoPlayer from 'react-native-video-controls';
import {
  FFmpegKit, ReturnCode} from 'ffmpeg-kit-react-native';
import RNFS, {TemporaryDirectoryPath} from 'react-native-fs';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {TimeConverter} from '../../utils/helpers';
const VideoModal = ({isOpen, onClose, videoUrl}) => {
  const [loading, setLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [duration, setDuration] = useState([['00:00', '00:00'], 10]);
  const player = useRef(null);
  const inputFilePath = `file:/${RNFS.DocumentDirectoryPath}/BigBuckBunny.mp4`;
  const outputVideoName = 'video1.mp4';
  const outputFilePath = `file:/${RNFS.DocumentDirectoryPath}/${outputVideoName}`;
  console.log('duration: ', duration);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];

  const saveOutput = () => {
    FFmpegKit.execute(`-i ${videoUrl} -r 24 ${outputFilePath}`).then(
      async session => {
        console.log('session: ', session);
        const returnCode = await session.getReturnCode();
        console.log('returnCode: ', returnCode, '----');
        if (ReturnCode.isSuccess(returnCode)) {
          // SUCCESS
          console.log('SUCCESS: ');
        } else if (ReturnCode.isCancel(returnCode)) {
          // CANCEL
          console.log('CANCEL: ');
        } else {
          // ERROR
          console.log('ERROR: ');
        }
      },
    );
  };
  const convertIntoAudio = () => {
    const ouputPath = `file:/${RNFS.DocumentDirectoryPath}/audio.mp3`;
    FFmpegKit.execute(`-i ${videoUrl} ${ouputPath}`).then(
      async session => {
        console.log('session: ', session);
        const returnCode = await session.getReturnCode();
        console.log('returnCode: ', returnCode, '----');
        if (ReturnCode.isSuccess(returnCode)) {
          // SUCCESS
          console.log('SUCCESS: ');
        } else if (ReturnCode.isCancel(returnCode)) {
          // CANCEL
          console.log('CANCEL: ');
        } else {
          // ERROR
          console.log('ERROR: ');
        }
      },
    );
  };
  console.log('iamge type::', videoUrl);
  return (
    <Modal animationType="slide" visible={isOpen} onRequestClose={onClose}>
      <View style={styles.mainContainer}>
        <View style={styles.controller}>
          <Pressable onPress={onClose}>
            <AntDesign name="close" color={'#FFF'} size={22} />
          </Pressable>
          <Pressable onPress={onClose}>
            <AntDesign name="checkcircle" color={'#FFF'} size={22} />
          </Pressable>
        </View>
        <Loader isLoading={loading} style={{backgroundColor: 'red'}} />
        {/* <Video
            source={require('../../assets/BigBuckBunny.mp4')} // Can be a URL or a local file.
            //  ref={(ref) => {
            //    this.player = ref
            //  }} 
            fullscreen={true}
            controls={true}
            resizeMode={'contain'}
            // poster={{uri:'../../assets/posterImage.png'}}
            playInBackground={false}     
            onLoadStart={(val)=>{console.log('start loading ',val);setLoading(true)}}
            onLoad={(val)=>{console.log('after loading',val);setLoading(false)}}                                // Store reference
             onBuffer={()=>{console.log('buffering')}}                // Callback when remote video is buffering
            //  onError={this.videoError}               // Callback when video cannot be loaded
            style={styles.videoContainer}
            paused={false}
          /> */}
        {isPaused ? (
          <Pressable
            style={{
              zIndex: 1,
              flex: 1,
              alignSelf: 'center',
              justifyContent: 'center',
              bottom: 20,
            }}
            onPress={() => setIsPaused(false)}>
            <AntDesign name="play" color={'#fff'} size={30} />
          </Pressable>
        ) : null}
        <VideoPlayer
          ref={player}
          source={{uri: videoUrl}}
          paused={isPaused}
          style={styles.videoContainer}
          disableBack={true}
          tapAnywhereToPause={true}
          onLoad={val => {
            console.log('after loading', val);
            setDuration([
              [duration[0][0], TimeConverter(val.duration)],
              val.duration,
            ]);
            setLoading(false);
          }}
          onPause={() => setIsPaused(true)}
          onPlay={() => setIsPaused(false)}
          disableFullscreen={true}
        />
      </View>
      <View style={styles.controller}>
        <TouchableOpacity style={styles.uploadButton} onPress={convertIntoAudio}>
          <Text style={[styles.buttonText, {fontSize: 16}]}>
            Convert into Audio
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={saveOutput}>
          <Text style={[styles.buttonText, {fontSize: 16}]}>
            Save Ouput file
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.durationBox}>
        <Text style={{color:'#FFF'}}>{duration[0][0]} - {duration[0][1]}</Text>
      </View>
      <View style={styles.trimmerContainer}>
        {arr.map(item => {
          return (
            <Image
              key={item}
              style={styles.frameSize}
              source={require('../../assets/posterImage.png')}
            />
          );
        })}
      </View>
      <View style={{backgroundColor: 'gray', alignSelf: 'center'}}>
        <MultiSlider
          values={[0, duration[1]]}
          sliderLength={400}
          enabledTwo={true}
          min={0}
          max={duration[1]}
          step={1}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={40}
          onValuesChangeStart={v => console.log('onChangeStart', v)}
          onValuesChangeFinish={v => {
            console.log('onchangeFinish', v);
            setDuration([
              [TimeConverter(v[0]), TimeConverter(v[1])],
              duration[1],
            ]);
          }}
        />
      </View>
    </Modal>
  );
};

export default VideoModal;
