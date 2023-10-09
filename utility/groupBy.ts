interface Item<T> {
  items: T[]
}

/**
 * Groups an array of items by a specified key.
 * @param array The array of items to group.
 * @param selector A function that selects the key to group by.
 * @returns An object with keys as the selected key and values as arrays of items with that key.
 */

const groupBy = <T>(
  array: Item<T>,
  selector: (item: T) => string // Takes argument of type T and returns a string used as the key to join
): Record<string, T[]> => {
  const result = array.items.reduce((group: Record<string, T[]>, item: T) => {
    const key = selector(item)

    if (!(key in group)) {
      group[key] = []
    }

    group[key].push(item)
    return group
  }, {})

  return result
}

export default groupBy
