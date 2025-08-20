import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D0D2D8",
    alignItems: "center",
    paddingTop: 62,
  },
  logo: {
    width: 134,
    height: 34,
    marginBottom: 42,
  },
  form: {
    width: '100%',
    paddingHorizontal: 16,
    gap: 7,
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingTop: 32,
    marginTop: 24,
  },
  headerContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#D0D2D8',
    paddingBottom: 12
  },
  clearButton: {
    marginLeft: "auto"
  },
  clearText: {
    color: '#828282',
    fontSize: 12,
    fontWeight: 600
  }
});
