import { View, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const ITEMS = [
  {
    ID: "1",
    status: FilterStatus.PENDING,
    description: "Item 1",
  },
  {
    ID: "2",
    status: FilterStatus.DONE,
    description: "Item 2",
  },
];
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
            <Filter key={status} status={status} isActive />
          ))}
          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.ID}
          renderItem={({ item }) => (
             <Item data={item} />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />} // Linha separadora entre os itens
          contentContainerStyle={styles.listContent} // Estilos para o conteúdo da lista
          ListEmptyComponent={() => <Text style={styles.emptyText}>Nenhum item encontrado</Text>} 
        />
      </View>
    </View>
  );
}
