const findObjectById = <T extends {id: string}>(array: Array<T>, id: string): T | null => {
  for(let item of array) {
    if(item.id !== undefined && item.id === id) {
      return item;
    }
  }
  return null
}

export default findObjectById