import { TextInput } from "react-native";
import { styles } from "./styles";


export function Input() {
    return (
        <TextInput 
        style={styles.container}
        placeholder="O que deseja comprar?"
        placeholderTextColor="#B0B3B8"
        />
    )
}