import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";



export function Button(props: TouchableOpacityProps) {
    return (
        <TouchableOpacity style={styles.container} {...props} >
            <Text style={styles.title}>
                Adicionar
            </Text>
        </TouchableOpacity>
    )
}