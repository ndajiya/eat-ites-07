
const CHUNK_SIZE = 50;

export function processInChunks<T>(
  items: T[],
  processor: (item: T, index: number) => T,
  chunkSize: number = CHUNK_SIZE
): T[] {
  const results: T[] = [];
  
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const processedChunk = chunk.map((item, index) => processor(item, i + index));
    results.push(...processedChunk);
  }
  
  return results;
}
