import React from 'react';
import {
    TouchableOpacity,
    TouchableOpacityProps,
    Text,
    StyleSheet
} from 'react-native';

interface SkillCardProps extends TouchableOpacityProps {
    skills: string
}

export function SkillCard({ skills, ...rest }: SkillCardProps) {
    return (
        <TouchableOpacity 
            style={styles.buttonSkill}
            {...rest}
        >
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