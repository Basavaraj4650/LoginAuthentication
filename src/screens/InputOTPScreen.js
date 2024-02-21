import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';

const InputOTPScreen = ({ navigation }) => {
    let textInput = useRef(null);
    let clockCall = null;
    const lengthInput = 6;
    const defaultCountDown = 30;
    const [internalVal, setInternalVal] = useState("");
    const [countDown, setCountDown] = useState(defaultCountDown);
    const [enableResend, setEnableResend] = useState(false);

    useEffect(() => {
        clockCall = setInterval(() => {
            decrementClock();
        }, 1000);
        return () => {
            clearInterval(clockCall);
        };
    });

    const decrementClock = () => {
        if (countDown === 0) {
            setEnableResend(true);
            setCountDown(0);
            clearInterval(clockCall);
        } else {
            setCountDown(countDown => countDown - 1);
        }
    };

    const onChangeText = (val) => {
        setInternalVal(val);
        if (val && val.length === lengthInput) {
            navigation.navigate("Home");
        }
    };

    const onResendOTP = () => {
        if (enableResend) {
            setCountDown(defaultCountDown);
            setEnableResend(false);
            clearInterval(clockCall);
            clockCall = setInterval(() => {
                decrementClock();
            }, 1000);
        }
    };

    const onChangenumber = () => {
        setInternalVal("");
    };

    const focusTextInput = () => {
        textInput.focus();
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'padding'}
                style={styles.containerAvoidingView}
            >
                <Text style={styles.textTitle}>{"Please Enter OTP Number sent via SMS"}</Text>
                <View style={styles.containerInput} onTouchStart={focusTextInput}>
                    <TextInput
                        ref={input => (textInput = input)}
                        style={styles.phoneInputStyle}
                        keyboardType='numeric'
                        value={internalVal}
                        maxLength={lengthInput}
                        returnKeyType='done'
                        onChangeText={onChangeText}
                    />
                    {
                        Array(lengthInput).fill().map((data, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.cellView,
                                    {
                                        borderBottomColor: index === internalVal.length ? '#FB6C6A' : '#234DB7'
                                    }
                                ]}
                            >
                                <Text
                                    style={styles.celltext}
                                >
                                    {internalVal && internalVal.length > 0 ? internalVal[index] : ""}
                                </Text>
                            </View>
                        ))
                    }
                </View>

                <View style={styles.bottomView}>
                    <TouchableOpacity onPress={onChangenumber}>
                        <View style={styles.btnChangeNumber}>
                            <Text style={styles.textChange}>Change number</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onResendOTP}>
                        <View style={[
                            styles.btnresend,
                            {
                                color: enableResend ? '#234DB7' : 'grey'
                            }
                        ]}>
                            <Text style={[
                                styles.textresend,
                                {
                                    color: enableResend ? '#234DB7' : 'grey'
                                }
                            ]}>Resend OTP ({countDown})</Text>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellView: {
        paddingVertical: 11,
        width: 40,
        margin: 5,
        justifyContent: 'center',
        alignItems: "center",
        borderBottomWidth: 1.5
    },
    celltext: {
        textAlign: 'center',
        fontSize: 16
    },
    bottomView: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 50,
        alignItems: 'flex-end',
    },
    btnChangeNumber: {
        width: 150,
        height: 50,
        borderRadius: 10,
        justifyContent: 'flex-start',
        justifyContent: 'center'
    },
    textChange: {
        color: '#234DB7',
        alignItems: 'center',
        fontSize: 15
    },
    btnresend: {
        width: 150,
        height: 50,
        borderRadius: 10,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    textresend: {
        alignItems: 'center',
        fontSize: 15
    },
    phoneInputStyle: {
        width: 0,
        height: 0,
        left: 25
    }
});

export default InputOTPScreen;
