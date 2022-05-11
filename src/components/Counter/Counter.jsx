import { useReducer, useEffect } from 'react'

const colors = {
  pink: 'rgb(236, 72, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
}

const initialCountColor = { count: 0, currentColor: colors.pink }

function reduce(state, action) {
  // console.log('state', state)
  // console.log('action', action)
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1, currentColor: state.currentColor }

    case 'decrement':
      return { count: state.count - 1, currentColor: state.currentColor }
    case 'reset':
      return { count: 0, currentColor: state.currentColor }
    case 'change':
      return { count: state.count, currentColor: action.payload.color }
    default:
      throw new Error()
  }
}

export default function Counter() {
  const [countChange, dispatch] = useReducer(reduce, initialCountColor)

  useEffect(() => {
    if (countChange.count === 0) {
      dispatch({ type: 'change', payload: { color: colors.pink } })
    }

    if (countChange.count > 0) {
      dispatch({ type: 'change', payload: { color: colors.green } })
    }

    if (countChange.count < 0) {
      dispatch({ type: 'change', payload: { color: colors.red } })
    }
  }, [countChange.count])

  return (
    <main className="bg-black bg-opacity-90 min-h-screen flex flex-col items-center justify-center text-4xl text-pink-500">
      <h1 className="mb-5" style={{ color: countChange.currentColor }}>
        {countChange.count}
      </h1>
      <div className="flex w-1/2 justify-around">
        <button
          className="text-green-400 border-2 border-green-400 p-3"
          type="button"
          onClick={() => dispatch({ type: 'increment' })}
          aria-label="increment"
        >
          Increment
        </button>
        <button
          className="text-red-500 border-2 border-red-500 p-2"
          type="button"
          onClick={() => dispatch({ type: 'decrement' })}
          aria-label="decrement"
        >
          Decrement
        </button>
        <button
          className="text-pink-500 border-2 border-pink-500 p-2"
          type="button"
          aria-label="reset"
          onClick={() => dispatch({ type: 'reset' })}
        >
          Reset
        </button>
      </div>
    </main>
  )
}
