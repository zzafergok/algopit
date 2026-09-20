export const pseudocode = `function floydCycleFinding(arr):
    # Faz 1: Döngünün varlığını tespit et
    tortoise = 0 # Yavaş işaretçi
    hare = 0     # Hızlı işaretçi
    
    repeat
        tortoise = getNextIndex(arr, tortoise)
        hare = getNextIndex(arr, getNextIndex(arr, hare))
        
        if tortoise is invalid or hare is invalid
            return {cycleExists: false}
    until tortoise == hare
    
    # Faz 2: Döngünün başlangıç noktasını bul
    tortoise = 0
    while tortoise != hare
        tortoise = getNextIndex(arr, tortoise)
        hare = getNextIndex(arr, hare)
    
    # Döngünün uzunluğunu hesapla
    cycleLength = 1
    hare = getNextIndex(arr, tortoise)
    while tortoise != hare
        hare = getNextIndex(arr, hare)
        cycleLength++
    
    return {
        cycleExists: true,
        cycleStart: tortoise,
        cycleLength: cycleLength
    }`;

export const implementations = {
  typescript: `function floydCycleFinding<T>(arr: T[]): { cycleExists: boolean; cycleStart?: number; cycleLength?: number } {
  if (arr.length === 0) {
    return { cycleExists: false };
  }

  let tortoise = 0;
  let hare = 0;
  
  do {
    tortoise = getNextIndex(arr, tortoise);
    hare = getNextIndex(arr, getNextIndex(arr, hare));
    
    if (tortoise === -1 || hare === -1) {
      return { cycleExists: false };
    }
  } while (tortoise !== hare);
  
  tortoise = 0;
  while (tortoise !== hare) {
    tortoise = getNextIndex(arr, tortoise);
    hare = getNextIndex(arr, hare);
  }
  
  let cycleLength = 1;
  hare = getNextIndex(arr, tortoise);
  while (tortoise !== hare) {
    hare = getNextIndex(arr, hare);
    cycleLength++;
  }
  
  return {
    cycleExists: true,
    cycleStart: tortoise,
    cycleLength: cycleLength
  };
}`,
  python: `def floyd_cycle_finding(arr):
    if not arr:
        return {"cycle_exists": False}
    
    tortoise = 0
    hare = 0
    
    while True:
        tortoise = get_next_index(arr, tortoise)
        hare = get_next_index(arr, get_next_index(arr, hare))
        
        if tortoise == -1 or hare == -1:
            return {"cycle_exists": False}
        
        if tortoise == hare:
            break
    
    tortoise = 0
    while tortoise != hare:
        tortoise = get_next_index(arr, tortoise)
        hare = get_next_index(arr, hare)
    
    cycle_length = 1
    hare = get_next_index(arr, tortoise)
    while tortoise != hare:
        hare = get_next_index(arr, hare)
        cycle_length += 1
    
    return {
        "cycle_exists": True,
        "cycle_start": tortoise,
        "cycle_length": cycle_length
    }`,
};
