import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { COLORS, FONT } from "../../constants/theme";

const Chat = () => {
    return (
        <View style={styles.chat}>
            <ChatBubble message="Hello" sender="User" />
            <ChatBubble message="Why hello there" sender="AI" />
        </View>
    );
};

export default Chat;

const ChatBubble = ({ message, sender }) => {
    return (
        <View style={[styles.message, sender == 'User' ? styles.userMessage : styles.aiMessage]}>
            <View style={[styles.chatBubble, sender == 'User' ? styles.userBubble : styles.aiBubble]}>
                <Text style={styles.chatText}>{message}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chat: {
        flex: 1,
        padding: 10,
    },
    chatText: {
        color: COLORS.white,
        fontFamily: FONT.family,
    },
    chatBubble: {
        backgroundColor: COLORS.messageBackground,
        borderRadius: 20,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15
    },
    userBubble: {
        backgroundColor: COLORS.messageBackground,
    },
    aiBubble: {
        backgroundColor: COLORS.aiAccent,
    },
    message: {
        flexDirection: 'row',
        marginBottom: 10
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    aiMessage: {
        justifyContent: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
});