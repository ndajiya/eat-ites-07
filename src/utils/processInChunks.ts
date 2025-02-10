
const CHUNK_SIZE = 50;

export function processInChunks<T>(
  items: T[],
  processor: (item: T, index: number) => T,
  chunkSize: number = CHUNK_SIZE
): T[] {
  // Add logging for SOC 2 audit trail
  console.log(`Processing ${items.length} items in chunks of ${chunkSize}`);
  const startTime = new Date();
  
  const results: T[] = [];
  
  for (let i = 0; i < items.length; i += chunkSize) {
    const chunk = items.slice(i, i + chunkSize);
    const processedChunk = chunk.map((item, index) => {
      const processed = processor(item, i + index);
      // Log processing for audit trail
      console.log(`Processed item ${i + index} at ${new Date().toISOString()}`);
      return processed;
    });
    results.push(...processedChunk);
  }
  
  // Log completion for audit trail
  const endTime = new Date();
  const duration = endTime.getTime() - startTime.getTime();
  console.log(`Chunk processing completed in ${duration}ms at ${endTime.toISOString()}`);
  
  return results;
}

