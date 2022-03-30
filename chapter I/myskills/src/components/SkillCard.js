import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

export function SkillCard({ skills }) {
    return (
        <TouchableOpacity key={skills} style={styles.buttonSkill}>
            <Text style={styles.textSkill}>
                {skills}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonSkill: {
        backgroundColor: '#1f1e25',
        padding: 20,
        borderRadius: 50,
        alignItems: 'center',
        marginVertical: 10
    },
        textSkill: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})