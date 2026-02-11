const form=document.getElementById('todo');
const input=document.getElementById('task');
const list=document.getElementById('task-list');
form.addEventListener('submit', function(event){
    event.preventDefault();

    const text=input.value.trim();
    if(text=='') return;

    const li=document.createElement('li');

    const checkbox=document.createElement('input');
    checkbox.type='checkbox';

    const span=document.createElement('span');
    span.textContent=text;

    const deleteButton=document.createElement('button');
    deleteButton.textContent='Delete';

    checkbox.addEventListener('change', function(){
        span.classList.toggle('completed',checkbox.checked);
    });

    deleteButton.addEventListener('click', function(){
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    list.appendChild(li);
    input.value='';
});
