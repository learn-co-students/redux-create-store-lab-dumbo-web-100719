// write your createStore function here

const createStore = reducer => {
  // initial state declaration
  let state;

  // dispatch
  const dispatch = action => {
    state = candyReducer(state, action);
    render();
  };

  // getState
  const getState = () => {
    return state;
  };

  return {
    dispatch,
    getState
  };
};

// REDUCER FUNCTION
function candyReducer(state = [], action) {
  switch (action.type) {
    case "ADD_CANDY":
      return [...state, action.candy];
    default:
      return state;
  }
}

// RENDER FUNCTION
function render() {
  let container = document.getElementById("container");
  if (store.getState()) {
    container.textContent = store.getState().join(" ");
  } else {
    throw new Error("the store's state has not been defined yet");
  }
}

// use your createStore function and the functions provided here to create a store
const store = createStore(candyReducer);
// once the store is created, call an initial dispatch
store.dispatch({ type: "@@INIT" });
