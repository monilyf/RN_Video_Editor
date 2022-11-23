import {StyleSheet,Dimensions,Platform} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    uploadButton:{
        backgroundColor:'#59C1BD',
        paddingHorizontal:20,
        paddingVertical:8,
        borderRadius:8
    },
    buttonText:{
        color:'#fff',
        fontSize:20

    },
    mainContainer:{
        height: windowWidth * 9 / 16,
        width: '100%'
    },
    videoContainer:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0
    },
    controller:{
        flexDirection:'row',
        margin:18,
        alignItems:'center',
        justifyContent:"space-between",
        zIndex:1,
    }
    
});
export default styles;


