import { FilterStatus } from "@/types/FilterStatus";
import { CircleDashed, CircleCheck } from "lucide-react-native";

/* 
 FilterStatus é responsavel por renderizar o ícone de status baseado 
 no status.
*/

export function StatusIcon({ statusType }: { statusType: FilterStatus }) {
  return statusType === FilterStatus.DONE ? (
    <CircleCheck size={18} color="#2C46B1" />
  ) : (    
    <CircleDashed size={18} color="#000000" />
  )
}