export const algorithmData = {
  title: 'Segment Tree (Aralık Ağacı) Veri Yapısı',
  description:
    'Segment Tree, bir dizi üzerinde aralık sorguları (range queries) ve nokta güncellemeleri ' +
    'yapabilmek için tasarlanmış binary tree tabanlı bir veri yapısıdır. Toplam, minimum, maksimum ' +
    'gibi işlemleri logaritmik zamanda gerçekleştirir.',
  timeComplexity: {
    best: 'O(log n)',
    average: 'O(log n)',
    worst: 'O(log n)',
  },
  spaceComplexity: 'O(n)',
  advantages: [
    'Aralık sorguları çok hızlıdır (O(log n))',
    'Nokta güncellemeleri etkilidir (O(log n))',
    'Lazy propagation ile aralık güncellemeleri destekler',
    'Çeşitli associative operations için kullanılabilir',
    'Online algorithm - önceden tüm sorguları bilmek gerekmez',
  ],
  disadvantages: [
    'Implementation karmaşıklığı yüksektir',
    'Sabit boyutlu diziler için ekstra bellek kullanır',
    'Cache performance bazı durumlarda kötü olabilir',
    'Küçük diziler için overhead fazla olabilir',
  ],
  pseudocode: `// Segment Tree Node yapısı
class SegmentTreeNode:
    start, end          // Bu düğümün kapsadığı aralık
    sum, min, max       // Aralıktaki değerler
    left, right         // Sol ve sağ çocuk düğümler

// Segment Tree implementasyonu
class SegmentTree:
    root = null
    
    function build(array, start, end):
        if start == end:
            return new Node(start, end, array[start])
        
        mid = (start + end) / 2
        node = new Node(start, end)
        node.left = build(array, start, mid)
        node.right = build(array, mid + 1, end)
        
        // Parent node değerlerini çocuklardan hesapla
        node.sum = node.left.sum + node.right.sum
        node.min = min(node.left.min, node.right.min)
        node.max = max(node.left.max, node.right.max)
        
        return node
    
    function query(node, queryStart, queryEnd):
        // Tam kapsama
        if queryStart <= node.start and queryEnd >= node.end:
            return node.sum
        
        // Kapsama yok
        if queryEnd < node.start or queryStart > node.end:
            return 0
        
        // Kısmi kapsama
        return query(node.left, queryStart, queryEnd) +
               query(node.right, queryStart, queryEnd)`,
  applications: [
    'Competitive programming ve algorithm contests',
    'Database indexing ve range queries',
    'Computer graphics (2D range trees)',
    'Computational geometry problems',
    'Stock market analysis (range statistics)',
    'Time series data analysis',
    'Game development (collision detection)',
  ],
};

export const segmentTreeImplementation = `// Segment Tree JavaScript implementasyonu
class SegmentTreeNode {
  constructor(start, end, sum = 0, min = Infinity, max = -Infinity) {
    this.start = start;
    this.end = end;
    this.sum = sum;
    this.min = min;
    this.max = max;
    this.left = null;
    this.right = null;
    this.lazyValue = 0;
    this.hasLazyValue = false;
  }
}

class SegmentTree {
  constructor(array) {
    this.originalArray = [...array];
    this.root = array.length > 0 ? this.buildTree(array, 0, array.length - 1) : null;
  }

  buildTree(array, start, end) {
    if (start === end) {
      return new SegmentTreeNode(
        start, 
        end, 
        array[start], 
        array[start], 
        array[start]
      );
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = this.buildTree(array, start, mid);
    const rightChild = this.buildTree(array, mid + 1, end);

    const node = new SegmentTreeNode(start, end);
    node.left = leftChild;
    node.right = rightChild;
    
    node.sum = leftChild.sum + rightChild.sum;
    node.min = Math.min(leftChild.min, rightChild.min);
    node.max = Math.max(leftChild.max, rightChild.max);

    return node;
  }

  querySum(queryStart, queryEnd) {
    if (!this.root || queryStart > queryEnd) return 0;
    return this.querySumHelper(this.root, queryStart, queryEnd);
  }

  queryMin(queryStart, queryEnd) {
    if (!this.root || queryStart > queryEnd) return Infinity;
    return this.queryMinHelper(this.root, queryStart, queryEnd);
  }

  queryMax(queryStart, queryEnd) {
    if (!this.root || queryStart > queryEnd) return -Infinity;
    return this.queryMaxHelper(this.root, queryStart, queryEnd);
  }

  updatePoint(index, newValue) {
    if (!this.root || index < 0 || index >= this.originalArray.length) return;
    this.originalArray[index] = newValue;
    this.updatePointHelper(this.root, index, newValue);
  }

  updateRange(updateStart, updateEnd, delta) {
    if (!this.root || updateStart > updateEnd) return;
    for (let i = updateStart; i <= updateEnd; i++) {
      if (i >= 0 && i < this.originalArray.length) {
        this.originalArray[i] += delta;
      }
    }
    this.root = this.buildTree(this.originalArray, 0, this.originalArray.length - 1);
  }

  querySumHelper(node, queryStart, queryEnd) {
    if (queryStart <= node.start && queryEnd >= node.end) return node.sum;
    if (queryEnd < node.start || queryStart > node.end) return 0;

    let result = 0;
    if (node.left) result += this.querySumHelper(node.left, queryStart, queryEnd);
    if (node.right) result += this.querySumHelper(node.right, queryStart, queryEnd);
    return result;
  }

  queryMinHelper(node, queryStart, queryEnd) {
    if (queryStart <= node.start && queryEnd >= node.end) return node.min;
    if (queryEnd < node.start || queryStart > node.end) return Infinity;

    let leftMin = Infinity;
    let rightMin = Infinity;
    if (node.left) leftMin = this.queryMinHelper(node.left, queryStart, queryEnd);
    if (node.right) rightMin = this.queryMinHelper(node.right, queryStart, queryEnd);
    return Math.min(leftMin, rightMin);
  }

  queryMaxHelper(node, queryStart, queryEnd) {
    if (queryStart <= node.start && queryEnd >= node.end) return node.max;
    if (queryEnd < node.start || queryStart > node.end) return -Infinity;

    let leftMax = -Infinity;
    let rightMax = -Infinity;
    if (node.left) leftMax = this.queryMaxHelper(node.left, queryStart, queryEnd);
    if (node.right) rightMax = this.queryMaxHelper(node.right, queryStart, queryEnd);
    return Math.max(leftMax, rightMax);
  }

  updatePointHelper(node, index, newValue) {
    if (node.start === node.end) {
      node.sum = newValue;
      node.min = newValue;
      node.max = newValue;
      return;
    }

    const mid = Math.floor((node.start + node.end) / 2);
    if (index <= mid && node.left) {
      this.updatePointHelper(node.left, index, newValue);
    } else if (node.right) {
      this.updatePointHelper(node.right, index, newValue);
    }

    if (node.left && node.right) {
      node.sum = node.left.sum + node.right.sum;
      node.min = Math.min(node.left.min, node.right.min);
      node.max = Math.max(node.left.max, node.right.max);
    }
  }

  getTreeStructure() {
    return this.root;
  }

  getHeight() {
    return this.getHeightHelper(this.root);
  }

  getHeightHelper(node) {
    if (!node) return 0;
    const leftHeight = this.getHeightHelper(node.left);
    const rightHeight = this.getHeightHelper(node.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }

  getArray() {
    return [...this.originalArray];
  }

  getStatistics() {
    let nodeCount = 0;
    let leafCount = 0;

    const traverse = (node) => {
      if (!node) return;
      nodeCount++;
      if (node.start === node.end) leafCount++;
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);

    return {
      nodeCount,
      leafCount,
      height: this.getHeight(),
      arraySize: this.originalArray.length
    };
  }

  validateTree() {
    if (!this.root) return true;

    const validate = (node) => {
      if (!node) return true;
      if (node.start === node.end) {
        const expectedValue = this.originalArray[node.start];
        return node.sum === expectedValue && 
               node.min === expectedValue && 
               node.max === expectedValue;
      }
      if (!node.left || !node.right) return false;

      const expectedSum = node.left.sum + node.right.sum;
      const expectedMin = Math.min(node.left.min, node.right.min);
      const expectedMax = Math.max(node.left.max, node.right.max);

      return node.sum === expectedSum &&
             node.min === expectedMin &&
             node.max === expectedMax &&
             validate(node.left) &&
             validate(node.right);
    };

    return validate(this.root);
  }
}`;
