import React , {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
//import { useFonts } from 'expo-font';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Share,
} from 'react-native';
 
export default function App(){
  const [inputValue, setInputValue] = useState('');
  const [appReady, SetappReady] = useState(false);

  useEffect(() => {
    async function prepare(){
      try {
        await SplashScreen.preventAutoHideAsync();
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e){
        console.warn(e);
      } finally {
        SetappReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if(appReady){
      await SplashScreen.hideAsync();
    }
  }, [appReady]);

  if (!appReady){
    return null;
  }

  const getDataUsingGet = () => {
    fetch(
      'https://tinyurl.com/api-create.php?url='+ inputValue.toString(),
      {
        method: 'GET',
      },
    )
      .then((response) => response.text())
      .then((responseJson) => {
        console.log(responseJson);
        Share.share({
          message:
            'Halo Kamu Telah Menerima Link Yang Telah Di Bagikan Lewat Aplikasi Simplify! Berikut Ini Adalah Linknya ' + responseJson + ' Terima Kasih!',
        })
          .then((result) => console.log(result))
          .catch((errorMsg) => console.log(errorMsg));
      })
      .catch((error) => {
        alert('Error -> ' + JSON.stringify(error));
        console.error(error);
      });
  };
  
  return (
      <SafeAreaView style={styles.container}>
        <View
          onLayout={onLayoutRootView}>
      </View>
        <View style={styles.container}>
          <Text style={styles.titleText}>
            Link Shortener Menggunakan (TinyURL) 
          </Text>
          <Text style={styles.textStyle}>
            Masukkan Link Yang Ingin Di - Simplify
          </Text>
          <TextInput  
            value={inputValue}
            onChangeText={
              (inputValue) => setInputValue(inputValue)
            }
            placeholder={'Masukkan Link'}
            style={styles.textInput}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={getDataUsingGet}>
            <Text style={styles.buttonTextStyle}>
              Bagikan Link Yang Di - Simplify (Tekan Tombol)
            </Text>
          </TouchableOpacity>
          <Text style={styles.textStyle}>
          
          </Text>
        </View>
      </SafeAreaView>
    ); 
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  titleText: {
    padding: 8,
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    //fontFamily: 'CarterOne'
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    marginTop: 15,
  },
  textStyleSmall: {
    textAlign: 'center',
    padding: 5,
  },
  buttonStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
    padding: 15,
    backgroundColor: '#8ad24e',
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});

