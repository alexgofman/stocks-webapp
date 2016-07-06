export function deleteStock(id, index, data) {
  return ({ type: 'server/delete_stock',
    payload: { id, index, data }
  })
}

export function fetchStocks() {
  return ({ type: 'server/get_stocks'})
}

export function addStock(symbol, data) {
  return ({ type: 'server/add_stock', payload: { symbol, data }})
}