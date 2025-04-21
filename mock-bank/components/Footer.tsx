import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const Footer: React.FC = () => {
    const router = useRouter();

    return (
        <View style={styles.footer}>
            <TouchableOpacity
                style={styles.footerButton}
                onPress={() => router.push('/Dashboard')}
            >
                <MaterialIcons name="home" size={30} color="#171717" />
                <Text style={styles.buttonText}>Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.footerButton}
                onPress={() => router.push('/Profile')}
            >
                <MaterialIcons name="account-circle" size={30} color="#171717" />
                <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        marginTop: 20,
        padding: 10,
        margin: 15,
    },
    footerButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#171717',

    },

});

export default Footer;
