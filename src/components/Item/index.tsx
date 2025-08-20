import { View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";
import { styles } from "./styles";
import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";


type ItemData = {
    status: FilterStatus;
    description: string;
}
type Props = {
    data: ItemData;
}

export function Item({ data }: Props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8}>
                <StatusIcon statusType={data.status} />
            </TouchableOpacity>
            <Text style={styles.description}>{data.description}</Text>
            <TouchableOpacity activeOpacity={0.8}>
                <Trash2 size={18} color={"#828282"} />
            </TouchableOpacity>
        </View>
    )
}