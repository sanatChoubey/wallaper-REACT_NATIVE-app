
import { StyleSheet, Text, View,ActivityIndicator,FlatList,Dimensions ,Image,TouchableOpacity,TouchableWithoutFeedback,CameraRoll,Share} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
import React, { Component } from 'react';
import axios from 'axios'
const {width,height}=Dimensions.get('window')
    export default class App extends Component {
share=async(data)=>{

try{

await Share.share({
  message :"check this wallpaper:  "+data
});



}catch(e){
  console.log(e)
}



}
savecameraroll=async(data)=>{
if(data){let cp =await Permissions.getAsync(Permissions.CAMERA_ROLL)

if(cp.status!=='granted'){
cp=await Permissions.askAsync(Permissions.CAMERA_ROLL);


}
if(cp.status==='granted'){

  FileSystem.downloadAsync(data,FileSystem.documentDirectory+'.jpg') .then(({ uri }) => {
    console.log('Finished downloading to ', uri);
    CameraRoll.saveToCameraRoll(uri)
    alert('saved to photos')
  })
  .catch(error => {
    console.error(error);
  });


}}else{

}

}
pop(){
if(this.state.click){
return<View style={{position:'absolute',bottom:100,left:0,right:0,alignItems:'center',justifyContent:'center',flexDirection: 'row' ,justifyContent:'space-around'}}>

<TouchableOpacity onPress={()=>{this.componentDidMount()}}><Ionicons name="md-refresh" size={38} color="white" /></TouchableOpacity>
<TouchableOpacity onPress={()=>{this.savecameraroll(this.state.data)}}><Ionicons name="md-save" size={38} color="white" /></TouchableOpacity>
<TouchableOpacity onPress={()=>{this.share(this.state.data)}}><Ionicons name="md-share" size={38} color="white" /></TouchableOpacity>

</View>

}

}




      componentDidMount(){
        axios.get('https://api.unsplash.com/photos/random?count=30&client_id=23163a2bde951c66bcb0b0f7ef79b076b66c7da915228d3693c238303b3c07eb').then((res)=>{

        console.log(res.data)
        this.setState({Images:res.data,isLoading:false})


        }).catch((e)=>{
         console.log(e)


        })



      }
      constructor(props){
        super(props);

        this.state = {
          isLoading:true,
          Images:[],
          click:false,
          data:'',
          share:'',
        };
      }
      render(){
        if(this.state.isLoading){return(
          <View style={{flex:1,backgroundColor:'black'
          ,alignItems:'center',justifyContent:'center'}}>
           <ActivityIndicator size="large" color ="blue" />
          </View>
        );}else{
        return(

          <View style={{flex:1 , backgroundColor:"gray"}}>

         <FlatList
         scrollEnabled={!this.state.click}
          horizontal
          pagingEnabled
          data={this.state.Images}
          keyExtractor={item=>item.id}
          renderItem={({item})=>{

          return(
            <View style={{flex:1}}>
            <View style={{position:'absolute',top:0,bottom:0,left:0,right:0,alignItems:'center',justifyContent:'center'}}>

           <ActivityIndicator size="large"color="green"/>


            </View>

          <View style={{width,height}}>
          <TouchableWithoutFeedback onPress={()=>{
      if(this.state.click){
        console.log(item.urls.regular)
        this.setState({click:false,data:item.urls.regular})
      }else{
        console.log(item.urls.regular)
        this.setState({click:true,data:item.urls.regular})
      }


             }}>
          <Image
          style={{flex:1,width:null,height:null}}
          source={{uri:item.urls.regular}}
          />
          </TouchableWithoutFeedback >

          </View>

          </View>



          )



          }}

         />

{this.pop()}


        </View>





      )


        }
      }
    }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
