let participants=[];

function  addParticipant(){
    const participantName = document.getElementById('name-entry').value.trim();

    if(participantName !== '' && !participants.includes(participantName)){
        participants.push(participantName);
        document.getElementById('name-entry').value = '';
        updateNamesList();
    }else{
        alert('Please enter a valid name (no same names allowed).');
    }
}

document.getElementById('name-entry').addEventListener('keydown',(event) =>{
    if(event.key === 'Enter'){
        event.preventDefault();
        addParticipant();
    }
})

function updateNamesList(){
    const namesListContainer = document.getElementById('names-list');
    namesListContainer.innerHTML = "<p>Names entered:</p>";
    const ul = document.createElement('ul');

    participants.forEach((participant,index)=>{
        const li = document.createElement('li');
                li.innerHTML = `<span>${participant}</span>
            <div class="buttons-style">
                <button onclick="editName(${index})">Edit</button>
                <button onclick="deleteName(${index})">Delete</button>
            </div>`;
        ul.appendChild(li);
    });

    namesListContainer.appendChild(ul);
}

function editName(index){
    const newName = prompt('Enter the new name:',participants[index]);

    if (newName != null && newName.trim() !=''){
        participants[index] = newName.trim();
       
        updateNamesList();
    }
}

function deleteName(index){
    
    participants.splice(index,1);
    updateNamesList();

    
}


function start(){
    if(participants.length<2){
        alert('Please enter at least two names to start.');

    }
    else{
        localStorage.setItem('gameParticipants',JSON.stringify(participants));
        window.location.href = 'secretsanta.html';
    }
}