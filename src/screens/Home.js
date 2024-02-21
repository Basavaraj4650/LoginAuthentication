import LottieView from 'lottie-react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Buttons from '../components/Buttons';

const Home = ({ navigation }) => {
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowSuccess(true);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    function logout() {
        navigation.navigate("Onboarding");
    }

    return (
        showSuccess ? (
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 40, top: 300 }}>Welcome! You are now logged in.</Text>
                <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', top: 300 }}>
                    <Buttons btn_text={"Logout"} on_press={logout} />
                </View>
            </View>
        ) : (
            <LottieView
                style={{ flex: 1 }}
                source={require("../components/landingpageloader.json")}
                autoPlay
                loop
            />
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default Home;
