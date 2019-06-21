const initialState = [
  //   {
  //     id: 1,
  //     msg: 'Please log in',
  //     alertType: 'success'
  //   }
];

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_ALERT':
      return [...state, action.payload];
    case 'REMOVE_ALERT':
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
}
