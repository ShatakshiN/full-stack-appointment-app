async function saveToCloudStorageForBooking(event){
    event.preventDefault();
    const name = event.target.customerName.value;
    const contact = event.target.contact.value;
    const mail = event.target.mail.value;

    obj = {
        name,
        contact,
        mail
    }
    try {
        const response = await axios.post('http://localhost:4000/add-user', obj);
        showUsersOnScreen(response.data.newUserDetail);
    } catch (err) {
        console.log('Error sending data to the server:', err);
        // Handle the error appropriately, e.g., show an error message to the user
    }
   
    
}

function showUsersOnScreen(obj) {
    const parentElem = document.getElementById('listOfUsers');
    const childElem = document.createElement('li');
    childElem.textContent = `${obj.name} - ${obj.contact} - ${obj.mail}`;

    const delButton = document.createElement('button');
    const delText = document.createTextNode('Delete');
    delButton.appendChild(delText);
    childElem.appendChild(delButton); // so that each entry has a delete button

    const editButton = document.createElement('button');
    const editText = document.createTextNode('Edit');
    editButton.appendChild(editText);
    childElem.appendChild(editButton);

    parentElem.appendChild(childElem);
}
