
let search = ''
function handledLoad(){
    loadPageInfo()
    .then(json => {
        displayPageInfo(json)
    })
}
function handleSearch(ev) {
    ev.preventDefault()
  
     search = ev.target.elements['search'].value
    loadUser(search)
    .then(json => {
        console.log('inside loaduser',json)
        displayUser(json)
        
    })
    .catch(err => {
        console.error('user',err)
      })
   
  }

function handeEdit(ev){
    ev.preventDefault()
   let title = ev.target.elements['title'].value
   let description = ev.target.elements['description'].value

   updatePage(title,description)
   .then(data => updatecurrentPage(data))

}

function updatecurrentPage(data){
    let currentH1 = document.getElementById('page-title');
    let currentP = document.getElementById('page-description');
    currentH1.innerText = data.title
    currentP.innerText = data.description

}


function loadUser(user){
    return fetch(`https://api.github.com/search/users?q=${user}`)
    .then(res => res.json())
    .then(data => data)
}

function loadRepos(user){
    return fetch(`https://api.github.com/users/${user}/repos`)
    .then(res => res.json())
    .then(data => data)
}
function loadPageInfo(){
    return fetch('http://localhost:3000/pageinfo')
    .then(res => res.json())
    .then(data => data)
}
function updatePage(title,description){
       console.log(title,description)
    return fetch('http://localhost:3000/pageinfo/1',{
     method: 'PUT',
     headers: {
       'Content-Type' : 'application/json',
       // 'Accept' : 'application/json'
     },
     body: JSON.stringify ({
       title: title,
       description: description
     })
   }).then(res => res.json());
}

function displayUser(users){
    for (let i = 0; i < 1; i++) {
        let user = users.items[i]
        addUser(user)
        loadRepos(search)
        .then(json => {
          displayRepos(json)
          
        })
        .catch(err => {
          console.error('repo',err)
        })

      }
}
function displayRepos(repos){
    for (let i = 0; i < 5 || i < repos.length; i++) {
      let repo = repos[i]
      addRepo(repo)
    }
}

function displayPageInfo(data){
    console.log(data)
    let dataH1 = document.createElement('h1');
    let dataP = document.createElement('p');
    let dataContainer = document.getElementById('page-info');
    dataH1.innerText = data[0].title
    dataP.innerText = data[0].description
    dataH1.id = 'page-title'
    dataP.id = 'page-description'
    dataContainer.appendChild(dataH1);
    dataContainer.appendChild(dataP);
}

function addUser(user){
    let userLi = createLi(user);
    let userUL = document.getElementById('user-list');
    let userimg = createUserimg(user);
    userUL.appendChild(userLi);
    userUL.appendChild(userimg);
}
function addRepo(repo){
    let repoLi = createLi(repo)
    let repoUL = document.getElementById('repos-list');
    repoUL.appendChild(repoLi);
}


function createLi(data){
    console.log(data)
    let dataName = ''
    if("name" in data == true){
        dataName = data.name
    }else {
        dataName = data.login
    }
    let dataURL = data.url
    let anchor = document.createElement('a');
    let li = document.createElement('li');
    anchor.href = dataURL
    anchor.innerText = dataName
    li.appendChild(anchor);
  return li
}

function yourname(name){
    loadName()
}

function createUserimg(data){
    let avatar = document.createElement("img");
    let li = document.createElement('li');
    avatar.src = data.avatar_url
    avatar.style.top = '50px';
    avatar.style.left = '50px';
    li.appendChild(avatar);
    return li
}
function main(){
    handledLoad()
    let searchForm = document.getElementById('github-form')
    searchForm.addEventListener('submit', handleSearch)
    let editForm = document.getElementById('edit-form')
    editForm.addEventListener('submit', handeEdit)
}

main();


