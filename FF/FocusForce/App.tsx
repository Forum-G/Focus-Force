import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";

/**
 * Gets the width of the current device window.
 * @returns The width of the device window.
 */
const { width } = Dimensions.get("window");

/**
 * Manages the state of a to-do list, including the list of to-do items, the input value for adding new items,
 * the index of the item being edited (if any), whether completed items should be shown, and the current sorting method.
 * @returns An array of state values and their corresponding setter functions.
 * The first element is the to-do list array, the second is the input value string, the third is the edit index number,
 * the fourth is a boolean indicating whether completed items should be shown, and the fifth is the current sorting method.
 */
export default function App() {
  const [toDoList, setToDoList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [showCompleted, setShowCompleted] = useState(true);
  const [sortBy, setSortBy] = useState(null);

  /**
   * Adds a new to-do item to the to-do list if the input value is not empty.
   * Clears the input value after adding the new item.
   * @returns None
   */
  const handleAddToDo = () => {
    if (inputValue) {
      setToDoList([...toDoList, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  /**
   * Handles toggling the completed status of a to-do item in the to-do list.
   * @param {number} index - The index of the to-do item to toggle.
   * @returns None
   */
  const handleToggleCompleted = (index) => {
    const updatedToDoList = [...toDoList];
    updatedToDoList[index].completed = !updatedToDoList[index].completed;
    setToDoList(updatedToDoList);
  };

  /**
   * Deletes a to-do item from the to-do list at the specified index.
   * @param {number} index - The index of the to-do item to delete.
   * @returns None
   */
  const handleDeleteToDo = (index) => {
    const updatedToDoList = [...toDoList];
    updatedToDoList.splice(index, 1);
    setToDoList(updatedToDoList);
  };

  /**
   * Updates the text of a to-do item at the given index with the new text.
   * @param {number} index - The index of the to-do item to update.
   * @param {string} newText - The new text to replace the old text with.
   * @returns None
   */
  const handleEditToDo = (index, newText) => {
    const updatedToDoList = [...toDoList];
    updatedToDoList[index].text = newText;
    setToDoList(updatedToDoList);
    setEditIndex(null);
  };

  /**
   * Toggles the state of the showCompleted boolean.
   * @returns None
   */
  const handleToggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  /**
   * Sets the sort order to be by name.
   * @returns None
   */
  const handleSortByName = () => {
    setSortBy("name");
  };

  /**
   * Sorts a to-do list based on the specified sorting method.
   * @param {Array} toDoList - the to-do list to be sorted
   * @param {string} sortBy - the sorting method to be used ("name" or "date")
   * @returns A sorted copy of the to-do list.
   */
  const sortedToDoList = [...toDoList];
  if (sortBy === "name") {
    sortedToDoList.sort((a, b) => a.text.localeCompare(b.text));
  }

  /**
   * Filters the sorted to-do list based on whether or not completed to-dos should be shown.
   * @param {Array} sortedToDoList - the sorted to-do list to filter
   * @param {boolean} showCompleted - whether or not completed to-dos should be shown
   * @returns {Array} - the filtered to-do list
   */
  const filteredToDoList = sortedToDoList.filter(
    (toDo) => showCompleted || !toDo.completed
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Focus Force</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="What's your focus of the day?"
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddToDo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <ScrollView>
          {filteredToDoList.map((toDo, index) =>
            editIndex === index ? (
              <View key={index} style={styles.editItemContainer}>
                <TextInput
                  style={styles.editInput}
                  value={toDo.text}
                  onChangeText={(text) => handleEditToDo(index, text)}
                />
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => setEditIndex(null)}
                >
                  <Text style={styles.updateButtonText}>Update</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View key={index} style={styles.itemContainer}>
                <TouchableOpacity
                  style={styles.checkBox}
                  onPress={() => handleToggleCompleted(index)}
                >
                  {toDo.completed && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <Text
                  style={[
                    styles.itemText,
                    toDo.completed && styles.completedItemText,
                  ]}
                  onLongPress={() => setEditIndex(index)}
                >
                  {toDo.text}
                </Text>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteToDo(index)}
                >
                  <Text style={styles.deleteButtonText}>X</Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            showCompleted && styles.filterButtonActive,
          ]}
          onPress={handleToggleShowCompleted}
        >
          <Text style={styles.filterButtonText}>
            {showCompleted ? "Hide Completed" : "Show Completed"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton} onPress={handleSortByName}>
          <Text style={styles.sortButtonText}>Sort by Name</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/**
 * A StyleSheet object containing styles for a todo list app.
 * @returns An object containing styles for various components of the app.
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: width - 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  listContainer: {
    flex: 1,
    alignSelf: "stretch",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  editItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  editInput: {
    flex: 1,
    height: 40,
    marginRight: 10,
    paddingHorizontal: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  updateButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  checkBox: {
    height: 20,
    width: 20,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    fontSize: 14,
    color: "black",
  },
  itemText: {
    flex: 1,
    fontSize: 18,
  },
  completedItemText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 15,
  },

  filterButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  filterButtonActive: {
    backgroundColor: "#ccc",
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 18,
  },

  sortButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  sortButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
