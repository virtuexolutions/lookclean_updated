import React, { useRef, useState } from "react";
import {
    ActivityIndicator,
    BackHandler,
    SafeAreaView,
    StyleSheet
} from "react-native";
import { WebView } from "react-native-webview";
import { useDispatch } from "react-redux";
import { setUserLogoutAuth } from "../Store/slices/auth";
import BackButton from "../Components/BackButton";
import Color from "../Assets/Utilities/Color";
import { scale } from "react-native-size-matters";

const DeleteAccount = () => {
    const webviewRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        const backAction = () => {
            if (webviewRef.current) {
                webviewRef.current.goBack();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <BackButton color={Color.black} style={styles.button}/>
            <WebView
                ref={webviewRef}
                source={{ uri: "https://app.lookclean.us/delete-account" }}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                injectedJavaScript={
                    `(function() {
                    const bodyText = document.body.innerText;
                    window.ReactNativeWebView.postMessage(bodyText);
                 })();`
                }
                onMessage={(event) => {
                    const content = event.nativeEvent.data;
                    console.log("Page Content:", content);
                    if (content.includes("Account has been deleted.")) {
                        dispatch(setUserLogoutAuth());
                    }
                }}
            />


            {loading && (
                <ActivityIndicator
                    color="blue"
                    size="large"
                    style={styles.loading}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    loading: {
        position: "absolute",
        top: "50%",
        left: "50%",
        marginLeft: -20,
        marginTop: -20,
    },
    button:{
        top:scale(50)
    }
});

export default DeleteAccount;
