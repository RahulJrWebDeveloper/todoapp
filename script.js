const adduserbtn = document.getElementById('adduser');
const btntext=adduserbtn.innerText
const addusername = document.getElementById('username');
const recorddisplay=document.getElementById('records')
let userArray = [];
let edit_id=null

let objstr = localStorage.getItem('users');
if (objstr) {
    userArray = JSON.parse(objstr);
}

displaydata()
adduserbtn.addEventListener('click', () => {
    const name = addusername.value;
    if(edit_id!=null){
        userArray.splice(edit_id,1,{ 'name': name })
        edit_id=null
    }
    else{
       
        userArray.push({ 'name': name });
    }
   
    savedata(userArray);
    addusername.value=""
    adduserbtn.innerText=btntext
});

function savedata(userArray) {
    let str = JSON.stringify(userArray);
    localStorage.setItem('users', str);
    displaydata()
}

function displaydata(){
    let statement=''
    userArray.forEach((user,i)=>{
        statement+=`
        <tr>
        <th scope="row">${i+1}</th>
        <td>${user.name}</td>
        <td><i class="fa-solid btn btn-info text-white fa-pen-to-square mx-2" onclick="editdata(${i})"></i><i class="fa fa-trash btn btn-danger text-white" onclick="deletedata(${i})"></i></td>
      </tr>
        `
    })
    recorddisplay.innerHTML=statement
}
function editdata(id){
    edit_id=id
    addusername.value=userArray[id].name
    adduserbtn.innerText="Changed"
}
function deletedata(id){
    userArray.splice(id,1)
    savedata(userArray)

}

const alltr=document.querySelectorAll('#records tr')

const search=document.querySelector('#search')
search.addEventListener('input',function(e){
    let searchstr=e.target.value.toLowerCase()
    recorddisplay.innerHTML=""
    alltr.forEach(tr=>{
     const tdintr=   tr.querySelectorAll('td')
      if(tdintr[0].innerText.toLocaleLowerCase().indexOf(searchstr)>-1){
        recorddisplay.appendChild(tr)
      }
    })
    if(recorddisplay.innerHTML==""){
        recorddisplay.innerHTML="No Records Founds"
    }
})