function createStore(initialState) {
  let state = { ...initialState }

  const saved = localStorage.getItem("currencyBotHistory");
  if (saved) state.history = JSON.parse(saved)

  return {
    getState: () => ({ ...state }),

    addMessage(role, text) {
      const msg = { role, text, id: Date.now() }
      state.history = [...state.history, msg]
      localStorage.setItem("currencyBotHistory", JSON.stringify(state.history));
      return msg;
    },

    clearHistory() {
      state.history = []
      localStorage.removeItem("currencyBotHistory")
    },
  };
}

export const store = createStore({ history: [] })
