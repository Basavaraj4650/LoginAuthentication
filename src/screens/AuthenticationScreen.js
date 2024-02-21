import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity, Modal, SafeAreaView, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Countries } from '../Countries';

const AuthenticationScreen = ({ navigation }) => {

    let textInput = useRef(null);
    const defaultCodeCountry = "+84"
    const defaultMaskCountry = "902 291 011"
    const [phoneNumber, setPhoneNumber] = useState();
    const [focusInput, setFocusInput] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [dataCountries, setDataCountries] = useState(Countries)
    const [codeCountry, setCodeCountry] = useState(defaultCodeCountry)
    const [placeholder, setPlaceholder] = useState(defaultMaskCountry)

    const onShowHideModal = () => {
        setModalVisible(!modalVisible)
    }

    const onChangeText = (number) => {
        setPhoneNumber(number);
    }

    const onPressContinue = () => {
        if (phoneNumber && phoneNumber.length === 10) {
            navigation.navigate('InputOTPScreen');
        } else {
            alert("Please enter a valid 10-digit phone number.");
        }
    }


    const onChangeFocus = () => {
        setFocusInput(true)
    }

    const onChangeBlur = () => {
        setFocusInput(false)
    }

    useEffect(() => {
        textInput.focus()
    })

    const onShowHideModel = () => {

    }

    const filterCountries = (value) => {
        if (value) {
            const countryData = dataCountries.filter((obj) =>
                (obj.en.indexOf(value) > -1) || obj.dialCode.indexOf(value) > -1)
            setDataCountries(countryData);
        } else {
            setDataCountries(Countries)
        }
    }

    const onCountryChange = (item) => {
        console.log("Selected country:", item);
        setCodeCountry(item.dialCode);
        setPlaceholder(item.mask);
        onShowHideModal()
    };


    const renderModal = () => {
        return (
            <Modal
                animationType='slide'
                transparent={false}
                visible={modalVisible}
            >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.modalContainer}>
                        <View style={styles.filterInputContainer}>
                            <TextInput
                                autoFocus={true}
                                onChangeText={filterCountries}
                                placeholder={"Filter"}
                                focusable={true}
                                style={styles.filterInputStyle}
                            />
                        </View>
                        <FlatList
                            style={{ flex: 1 }}
                            data={dataCountries}
                            extraData={dataCountries}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableWithoutFeedback onPress={() => onCountryChange(item)}>
                                    <View style={styles.countryModalStyle}>
                                        <View style={styles.modelItemContainer}>
                                            <Text style={styles.modelItemName}>{item.en}</Text>
                                            <Text style={styles.modelItemDialCode}>{item.dialCode}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                        />
                    </View>

                    <TouchableOpacity onPress={onShowHideModel} style={styles.closeButtonStyle}>
                        <Text style={styles.closeTextStyle}>
                            {"Close"}
                        </Text>
                    </TouchableOpacity>

                </SafeAreaView>
            </Modal>
        )
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'padding'}
                style={styles.containerAvoidingView}
            >
                <Text style={styles.textTitle}>Please Input Your phone Number</Text>
                <View style={[styles.containerInput, { borderBlockColor: focusInput ? '#244DB7' : '#ffffff' }]}>

                    <TouchableOpacity onPress={onShowHideModal}>
                        <View style={styles.openDialogView}>
                            <Text>{codeCountry + " |"}</Text>
                        </View>
                    </TouchableOpacity>
                    {renderModal()}
                    <TextInput
                        ref={(input) => textInput = input}
                        style={styles.phoneInputStyle}
                        placeholder={placeholder}
                        keyboardType='numeric'
                        value={phoneNumber}
                        onChangeText={onChangeText}
                        secureTextEntry={false}
                        onFocus={onChangeFocus}
                        onBlur={onChangeBlur}
                        autoFocus={focusInput}
                    />
                </View>
                <View style={styles.viewBottom}>
                    <TouchableOpacity onPress={onPressContinue}>
                        <View style={[styles.btnContinue, { backgroundColor: phoneNumber ? '#244DB7' : 'grey' }]}>
                            <Text style={styles.textContinue}>Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerAvoidingView: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    textTitle: {
        marginBottom: 50,
        marginTop: 50,
        fontSize: 16
    },
    containerInput: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: "center",
        borderBottomWidth: 1.5
    },
    openDialogView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    phoneInputStyle: {
        marginLeft: 5,
        flex: 1,
        height: 50
    },
    viewBottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginTop: 200,
        alignItems: 'center'
    },
    btnContinue: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#244DB7'
    },
    textContinue: {
        color: '#ffffff',
        alignItems: 'center'
    },
    modalContainer: {
        paddingTop: 15,
        paddingLeft: 25,
        paddingRight: 25,
        flex: 1,
        backgroundColor: 'white'
    },
    filterInputStyle: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
        color: '#424242'
    },
    countryModalStyle: {
        flex: 1,
        borderColor: 'black',
        borderTopWidth: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    modelItemContainer: {
        flex: 1,
        paddingLeft: 5,
        flexDirection: 'row',
    },
    modelItemName: {
        flex: 1,
        fontSize: 16,
    },
    modelItemDialCode: {
        fontSize: 16
    },
    filterInputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    closeButtonStyle: {
        padding: 12,
        alignItems: 'center'
    },
    closeTextStyle: {
        padding: 5,
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    }
});

export default AuthenticationScreen;
