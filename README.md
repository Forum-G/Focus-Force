# Focus-Force

It is a React Native app that allows a user to create a to-do list, add, edit, and delete to-do items, and sort and filter the list.

The app manages state using the useState hook. It defines a number of state variables: toDoList (an array of to-do items), inputValue (the input value for adding new items), editIndex (the index of the item being edited, if any), showCompleted (a boolean indicating whether completed items should be shown), and sortBy (the current sorting method).

The app contains several functions to handle adding, toggling, and deleting to-do items, updating the text of an item, and sorting and filtering the list. The sorted and filtered list is then rendered using a ScrollView and mapped to individual to-do items.

The app also contains some basic styling using the StyleSheet API, including containers, inputs, buttons, and text.
