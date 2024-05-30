const adicionarItem = () => {
  const inputText = document.getElementById("inputText").value;
  const lista = document.getElementById("todoList");

  const cleanValue = inputText.replaceAll(" ", "");
  if (cleanValue.length === 0) {
    alert("Digite Algo");
  } else {
    const newLiItem = document.getElementById("li");
    newLiItem.innerText = inputText;

    lista.appendChild(newLiItem);
  }
};
