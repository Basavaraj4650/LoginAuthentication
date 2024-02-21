import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, View, StatusBar, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../src/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import Buttons from '../components/Buttons';
import TouchID from 'react-native-touch-id';

const Login = ({ navigation }) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(false); 
    }, []);

    function handleBiometricLogin() {
        const configs = {
            title: 'Authentication Touch Id',
            color: '#FF0000',
            sensorErrorDescription: "Invalid Touch Id"
        };
        TouchID.authenticate("Login To App", configs)
            .then(success => {
                console.log("Success");
                setAuthenticated(true);
                navigation.navigate("Home");
            })
            .catch(error => {
                console.log("Biometric authentication failed. Trying mobile login.");
                setAuthenticated(true);
                Alert.alert(
                    "Biometric Not Matching",
                    "Biometric authentication was not successful. Please try logging in with your mobile number.",
                    [{ text: "OK", onPress: () => console.log("Biometric Authentication Fails")}],
                    { cancelable: false }
                );
            });
    }

    function handleMobileLogin() {
        if (!authenticated) {
            Alert.alert(
                "Biometric Validation Required",
                "Please verify biometric validation first.",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false }
            );
        } else {
            navigation.navigate("AuthenticationScreen");
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#fff', flexDirection: 'column' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
           
            <View style={{ flex: 2, flexDirection: 'column', backgroundColor: '#fff', paddingTop: 10, paddingHorizontal: '3%' }} >
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                    <Text style={{ fontFamily: 'OpenSans-SemiBold', fontSize: 30, color: Colors.black }} >Welcome Back</Text>
                    <Image source={require('../assets/images/waving_hand.png')} style={{ width: 30, height: 30 }} />
                </View>
                <Text style={{ fontFamily: "OpenSans-Medium", fontSize: 17, paddingTop: 10, color: "#777" }} >I am happy to see you again. You can continue where you left off by logging in</Text>

                <View style={{ flexDirection: 'column', paddingTop: 100 }} >
                    <Buttons btn_text={"Login With Biometric"} on_press={handleBiometricLogin} />
                    <Buttons btn_text={"Login With Mobile Number"} on_press={handleMobileLogin} />
                </View>
            </View>

            
            <View style={{ flex: 2, backgroundColor: '#fff', flexDirection: 'column', paddingHorizontal: '3%' }} >
                <Text style={{ fontFamily: "OpenSans-Bold", textAlign: 'center', marginVertical: 35, color: '#818181', fontSize: 20 }} >Or</Text>
                <View style={{ flexDirection: 'column', alignItems: 'center', width: '95%', alignSelf: 'center' }} >
                    <TouchableOpacity onPress={() => console.log("google login")} style={styles.social_btn} >
                        <Image style={styles.social_img} source={require('../assets/images/google_icon.png')} />
                        <Text style={{ width: '80%', textAlign: 'center', fontSize: 16, fontFamily: 'OpenSans-Medium' }} >Sign in with Google </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log("facebook login")} style={styles.social_btn} >
                        <Image style={styles.social_img} source={require('../assets/images/facebook_icon.png')} />
                        <Text style={{ width: '80%', textAlign: 'center', fontSize: 16, fontFamily: 'OpenSans-Medium' }} >Sign in with Facebook </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', backgroundColor: '#fff', marginBottom: 40 }} >
                    <Text style={{ fontFamily: 'OpenSans-Medium', fontSize: 17, color: '#818181' }} >Don't have a account? </Text>
                    <Text style={{ fontSize: 18, fontFamily: 'OpenSans-SemiBold', color: '#333' }} >Sign Up</Text>
                </View>
            </View>
        </ScrollView>
    );
}

export default Login;

const styles = StyleSheet.create({
    input: {
        position: 'relative',
        height: '100%',
        width: '90%',
        fontFamily: 'OpenSans-Medium',
        paddingLeft: 20,
    },
    social_btn: {
        height: 55,
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
    },
    social_img: {
        width: 25,
        height: 25,
        marginLeft: 15
    }
});
