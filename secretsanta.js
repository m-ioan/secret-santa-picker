let assignments = [];
let assignmentsMade = false;

function shuffle(participant){
    for(let i= participant.length-1; i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [participant[i],participant[j]] = [participant[j],participant[i]];
    }
    return participant
}

function assignSecretSanta(participants){
    if(participants.length<2){
        return [];
    }

    const shuffledParticipants = shuffle(participants.slice());
    const assignments = [];

    for(let i=0;i<shuffledParticipants.length;i++){
        const gifter = shuffledParticipants[i];
        const giftee = shuffledParticipants[(i+1)%shuffledParticipants.length];
        assignments.push([gifter,giftee]);
    }
    return assignments;
}

window.addEventListener('DOMContentLoaded', () => {
    const participants = JSON.parse(localStorage.getItem('gameParticipants')) || [];
    assignments = assignSecretSanta(participants);
    renderParticipantsList(participants);
})

function renderParticipantsList(participants){
    const list = document.getElementById('participants-list');
    list.innerHTML = '';

    participants.forEach((participant,index) =>{
        const li = document.createElement('li');
        li.innerHTML = `
        <span>${participant}</span>
        <div class="buttons-style">
            <button onclick="revealGiftee('${participant}',${index})">Reveal</button>
        </div>
        
        `;
        list.appendChild(li);
    });
}

function revealGiftee(userName,index){

    

    const userAssignment = assignments.find(pair => pair[0] === userName);

    if(userAssignment){
        document.getElementById('assignments').innerHTML =`
        <p>${userName}, you have been picked to get a gift for ${userAssignment[1]}.</p>
        <button onclick="hideGiftee(${index})">Hide</button>
        `;

    }else{
        document.getElementById('assignments').innerHTML =`Sorry, your name was not found in the list.`;
    }

    
}

function hideGiftee() {
    document.getElementById('assignments').innerHTML = '';


}