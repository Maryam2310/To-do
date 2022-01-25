//get data from localstorage and if there is no data then pass an empty array
let itemArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];


//event listeners
document.getElementById('add-icon').addEventListener('click', () => {
  saveItem();

});

document.getElementById('user-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    saveItem();
  }

});


//save items in localstorage and render them on DOM through createList();
saveItem = () => {
  let input = document.getElementById('user-input');
  let inputValue = input.value;

  itemArray.push({
    'item': inputValue
  });
  localStorage.setItem('items', JSON.stringify(itemArray));
  createList();

  input.value = '';

}
//create items
createList = () => {
  let list = '';
  for (var i = 0; i < itemArray.length; i++) {

    list += `<div class='list-item'>
         <p class="${itemArray[i].done ? 'done' : ''}">
         ${itemArray[i].item}</p>
         <button class="${itemArray[i].done ? 'done' : ''} complete" onclick='done(${i})'><i class="fas fa-check "></i></button>
         <button class="delete" onclick='del(${i})'><i class="fas fa-minus"></i></i></button>
          </div>`
  }
  document.getElementById('to-do-items').innerHTML = list;
}




//delete all items from localstorage
document.getElementById('del-all').addEventListener('click', () => {
  localStorage.clear();
  document.getElementById('to-do-items').innerHTML = '';
  itemArray = [];
});


//when the item is completed 
done = (index) => {
  itemArray[index].done = !itemArray[index].done;

  localStorage.setItem('items', JSON.stringify(itemArray));
  createList();

}
//delete an individual item
del = (index) => {
  itemArray.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(itemArray));
  createList();
}

itemArray.forEach(createList);




