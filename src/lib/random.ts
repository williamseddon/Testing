export function cryptoRandomInt(maxExclusive: number) {
  const arr = new Uint32Array(1)
  crypto.getRandomValues(arr)
  return arr[0] % maxExclusive
}

export function drawUnique<T>(items: T[], count: number): T[] {
  if (count > items.length) throw new Error('count exceeds items length')
  const pool = items.slice()
  const out: T[] = []
  for (let i = 0; i < count; i++) {
    const idx = cryptoRandomInt(pool.length)
    out.push(pool[idx]!)
    pool.splice(idx, 1)
  }
  return out
}
