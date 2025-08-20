import { View, Image, TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input />
        <Button />
      </View>
      <View style={styles.content}>
        <View style={styles.headerContent}>
        {FILTER_STATUS.map((status) => (
          <Filter key={status} status={status} isActive/>
        ))}
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
