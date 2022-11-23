import React, {useState, useRef,useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native';
import VideoModal from '../video';
import styles from './style';
import DocumentPicker from 'react-native-document-picker'

const Home = () => {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [result, setResult] = useState(null);
  
  // const handleVideoModal = () => {
  //   setShowVideoModal(true);
  // };
  const handleUploadVideo = async()=>{
    try{
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle:'fullScreen',
        copyTo:'documentDirectory'
      });
      console.log('pickerResult: ', pickerResult);
      setResult(pickerResult)
      setShowVideoModal(true);

    }catch(e){
      console.log('handleUploadVideo error:', e)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity style={styles.uploadButton} onPress={handleVideoModal}>
        <Text style={styles.buttonText}>Edit Video</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadVideo}>
        <Text style={styles.buttonText}>Upload Video</Text>
      </TouchableOpacity>
      <VideoModal videoUrl={result?.fileCopyUri} isOpen={showVideoModal} onClose={()=>setShowVideoModal(false)}/>
    </SafeAreaView>
  );
};

export default Home;
