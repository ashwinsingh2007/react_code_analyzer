export default function counter (state = 0, { type, data }) {
  switch (type) {
    case 'INCREMENT':
      return state + 1;
    case 'INCREMENT_IF_ODD':
      return (state % 2 !== 0) ? state + 1 : state;
    case 'DECREMENT':
      return state - 1;
    case 'SHOW_MESSAGE':
      return data;
    case 'LOADING':
      return {...state, ...data};
    default:
      return state;
  }
}
