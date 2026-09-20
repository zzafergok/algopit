export const pseudocode = `class TrieNode:
    children = Map()
    isEndOfWord = false

class Trie:
    root = TrieNode()
    
    function insert(word):
        node = root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.isEndOfWord = true
        
    function search(word):
        node = root
        for char in word:
            if char not in node.children:
                return false
            node = node.children[char]
        return node.isEndOfWord
        
    function startsWith(prefix):
        node = root
        for char in prefix:
            if char not in node.children:
                return false
            node = node.children[char]
        return true`;

export const implementations = {
  typescript: `class TrieNode {
  children = new Map<string, TrieNode>();
  isEndOfWord = false;
}

class Trie {
  root = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }
    node.isEndOfWord = true;
  }

  search(word: string): boolean {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return node.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return false;
      node = node.children.get(char)!;
    }
    return true;
  }
}`,
  python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word`,
  java: `public class Trie {
    // Java Trie implementation
}`,
};
