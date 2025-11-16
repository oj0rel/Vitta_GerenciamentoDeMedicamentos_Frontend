import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 10,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  flatList: {
    flex: 1,
    margin: 10,
    width: "100%",
  },
  cardsContainer: {
    justifyContent: "center",
  },
  cardContent: {
    backgroundColor: '#1CBDCF',
    margin: 14,
    borderRadius: 10,
    width: 350,
    justifyContent: "flex-start",
    paddingVertical: 10,
    gap: 16,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  textContent: {
    color: '#fff',
    paddingLeft: 12,
    paddingRight:12,
  },
  textPressableContent: {
    color: '#1CBDCF',
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    width: '100%',
    justifyContent: "flex-start",
    paddingHorizontal: 14,
  },
  cardBottomRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 6,
    paddingHorizontal: 14,
  },
  rightButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pressableButton: {
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 50,
    height: 30,
  },
  modalContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  dateContainer: {
    flexDirection: "row",
    gap: 20,
    paddingLeft: 12,
    marginTop: 10,
  },
  dateContainerVencido: {
    justifyContent: "center",
    paddingLeft: 0,
    gap: 0,
    marginTop: 10,
  },
  dateText: {
    color: '#fff',
    fontSize: 14,
  },
  concluidoText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  viewModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  viewModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  viewModalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: '#1CBDCF',
    marginBottom: 20,
    textAlign: "center",
  },
  viewModalSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 4,
  },
  viewModalText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    paddingLeft: 5,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
})
