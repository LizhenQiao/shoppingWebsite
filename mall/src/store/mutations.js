export default{
  addCart(state, payload){
    let oldProduct = null
    for (let item of state.cartList){
      if (item.iid === payload.iid){
        oldProduct = item
      }
    }
    if (oldProduct){
      oldProduct.count += 1
    }
    else{
      payload.count = 1
      state.cartList.push(payload)
    }
  }
}