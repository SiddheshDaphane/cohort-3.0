function deleteTodo(index) {
  const element = document.getElementById("todo-"+index)
  document.getElementById("todoParent").removeChild(element);
}