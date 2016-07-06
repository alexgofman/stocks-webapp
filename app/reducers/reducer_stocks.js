export default function(state = [], action) {
  switch(action.type) {
    case 'symbols':
      return action.payload;
    case 'deleteStock':
      return action.payload;
    case 'addStock':
      return action.payload;
  }
  return state;
}