import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
    marginBottom: 30,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  headerTextFlatList: {
    marginBottom: 12,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  cardsContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    backgroundColor: '#1CBDCF',
    marginBottom: 14,
    borderRadius: 10,
    width: 320,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContent: {
    color: '#fff',
    paddingLeft: 12,
    paddingRight:12,
  },
  textPressableContent: {
    color: '#1CBDCF',
  },
  concluirPressable: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fff',
    width: 100,
    height: 30,
    borderRadius: 10,
    margin: 6,
    marginLeft: 8,
    shadowRadius: 2,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60
  }
});
