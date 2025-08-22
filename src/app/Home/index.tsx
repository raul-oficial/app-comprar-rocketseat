import {
  View,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { useEffect, useState } from "react";
import { ItemStorage, itemsStorage } from "@/storage/itemsStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  async function handleAdd() {
    if (!description.trim()) {
      return Alert.alert("Aviso", "Descrição não pode ser vazia.");
    }
    const newItem = {
      id: String(new Date().getTime()), // Gerando um ID único baseado no timestamp
      description,
      status: FilterStatus.PENDING,
    };
    await itemsStorage.add(newItem);
    await itemsByStatus();
    Alert.alert("Sucesso", `Adicionado ${description}`);
    setFilter(FilterStatus.PENDING);
    setDescription(""); // Limpa o campo de descrição após adicionar o item
  }
  async function itemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } catch (error) {
      console.error("Failed to retrieve items:", error);
      Alert.alert("Erro", "Não foi possível carregar os itens.");
    }
  }
  async function handleRemove(id: string) {
    try {
      await itemsStorage.remove(id);
      await itemsByStatus();
    } catch (error) {
      console.error("Failed to remove item:", error);
      Alert.alert("Erro", "Não foi possível remover o item.");
    }
  }
  function handleClear() {
    Alert.alert("Limpar", "Tem certeza que deseja limpar todos os itens?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Limpar",
        onPress: async () => {
          await itemsStorage.clear();
          setItems([]);
        },
      },
    ]);
  }
  useEffect(() => {
    itemsByStatus();
  }, [filter]);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/logo.png")} />
      <View style={styles.form}>
        <Input value={description} onChangeText={setDescription} />
        <Button onPress={handleAdd} />
      </View>
      <View style={styles.content}>
        <View style={styles.headerContent}>
          {FILTER_STATUS.map((status) => (
            <Filter
              key={status}
              status={status}
              isActive={filter === status}
              onPress={() => setFilter(status)}
            />
          ))}
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              data={item}
              onRemove={() => handleRemove(item.id)}
              onStatus={() => console.log("Olá")}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />} // Linha separadora entre os itens
          contentContainerStyle={styles.listContent} // Estilos para o conteúdo da lista
          ListEmptyComponent={() => (
            <Text style={styles.emptyText}>Nenhum item encontrado</Text>
          )}
        />
      </View>
    </View>
  );
}
