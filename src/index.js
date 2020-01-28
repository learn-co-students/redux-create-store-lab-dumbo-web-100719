function createStore(reducer){
  let state;

  function dispatch(action){
    state=reducer(state, action);
    render();
  }

  function getState(){
    return state;
  };

  return{
    getState,
    dispatch
  };
};

function addCandy(the_candy){
  return{
    type: "ADD_CANDY",
    the_candy
  }
}

function candyReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_CANDY':
      return [...state, action.the_candy];
    default:
      return state;
  }
}

function render() {
  if(store.getState()) {
    let filteredState= store.getState().filter(item=> {
      return item !== undefined
    })

    candyShelf.innerText = filteredState.map(item=> {
      return ` ${item}`
    })

  } else {
    throw new Error("the store's state has not been defined yet")
  }
};

let peanutMandMsButton= document.createElement('button')
peanutMandMsButton.innerText="Restock Peanut M&M's"
let peanutButterCupsButton=document.createElement('button')
peanutButterCupsButton.innerText="Restock Peanut Butter Cups"
let candyListHeading=document.createElement('h3')
candyListHeading.innerText="Candy available at present:"
let candyShelf= document.createElement('p')
candyShelf.innerText="You have no candy yet."
document.body.append(candyListHeading, candyShelf, peanutMandMsButton, peanutButterCupsButton)
peanutMandMsButton.addEventListener("click", ()=>{
  console.log("candy")
   candyShelf.innerText="candy"
   return store.dispatch(addCandy("peanut m&m's"))
})
peanutButterCupsButton.addEventListener("click", ()=>{
  return store.dispatch(addCandy("peanut butter cups"))
})

let store=createStore(candyReducer)

store.dispatch({type: "@@INIT"})
store.dispatch({type: "ADD_CANDY"})
store.dispatch(addCandy("orangettes"))
store.dispatch(addCandy("granola bites"))

