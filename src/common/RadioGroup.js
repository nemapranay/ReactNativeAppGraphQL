import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const RadioButton = ({ label, selected, onPress }) => {
    return (
        <Pressable style={styles.radioContainer} onPress={onPress}>
            <View style={[styles.radioCircle, selected && styles.selectedCircle]} />
            <Text style={styles.radioText}>{label}</Text>
        </Pressable>
    );
};

const RadioGroup = ({ getUserSelection }) => {
    const [selectedRole, setSelectedRole] = useState("ADMIN"); // Default selection

    useEffect(() => { if (getUserSelection) getUserSelection(selectedRole) }, [selectedRole])
    return (
        <View style={styles.container}>
            <RadioButton
                label="Admin"
                selected={selectedRole === "ADMIN"}
                onPress={() => setSelectedRole("ADMIN")}
            />
            <RadioButton
                label="Manager"
                selected={selectedRole === "MANAGER"}
                onPress={() => setSelectedRole("MANAGER")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    radioContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10
    },
    radioCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#007BFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    selectedCircle: {
        backgroundColor: "#007BFF",
    },
    radioText: {
        fontSize: 16,
    },
});

export default RadioGroup;
