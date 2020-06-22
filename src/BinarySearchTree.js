const { BFS, DFSIterative } = require('./BinaryTreeTraversal')

const BinarySearchTree = (() => {
  class TreeNode {
    constructor(key, left = null, right = null) {
      this.key = key
      this.left = left
      this.right = right
    }
  }

  class BinarySearchTree {
    #root
    constructor() {
      this.#root = null
    }

    get root() {
      return this.#root
    }
    /* Creates a TreeNode and inserts it while preserving BST properties into the tree.  */
    insert(key) {
      const newNode = new TreeNode(key)

      if (this.root === null) {
        this.#root = newNode
        return newNode
      }

      let prev = null,
        curr = this.root

      while (curr !== null) {
        if (key === curr.key) return 'Key Already Exists!'
        else if (key < curr.key) {
          prev = curr
          curr = curr.left
        } else {
          prev = curr
          curr = curr.right
        }
      }

      if (key < prev.key) prev.left = newNode
      if (key > prev.key) prev.right = newNode
      return this.#root
    }
    /* Searches the tree for the given key.  */
    search(key) {
      let curr = this.root
      while (curr !== null) {
        if (key === curr.key) return curr
        else if (key < curr.key) curr = curr.left
        else curr = curr.right
      }
      return null
    }
    /* Finds the minimum key in the tree. */
    findMin(node = this.root) {
      if (node === null) return null

      let curr = node
      while (curr.left !== null) {
        curr = curr.left
      }
      return curr.key
    }
    /* Finds the maximum key in the tree. */
    findMax(node = this.root) {
      if (node === null) return null

      let curr = node
      while (curr.right !== null) {
        curr = curr.right
      }

      return curr.key
    }
    /* Finds the successor of the given key.  */
    successor(key) {
      const predecessor = this.search(key)
      if (this.root === null || !predecessor) return null
      if (predecessor.right !== null) {
        let curr = predecessor.right
        while (curr.left !== null) {
          curr = curr.left
        }
        return curr
      }

      let ancestor = null,
        curr = this.root

      while (curr.key !== predecessor.key) {
        if (predecessor.key < curr.key) {
          ancestor = curr
          curr = curr.left
        } else curr = curr.right
        if (ancestor) console.log(ancestor.key)
      }
      return ancestor
    }
    /* Finds the predecessor of the given key.  */
    predecessor(key) {
      const successor = this.search(key)
      if (this.root === null || !successor) return null
      if (successor.left !== null) {
        let curr = successor.left
        while (curr.right !== null) {
          curr = curr.right
        }
        return curr
      }

      let ancestor = null,
        curr = this.root

      while (curr.key !== successor.key) {
        if (successor.key > curr.key) {
          ancestor = curr
          curr = curr.right
        } else curr = curr.left
        if (ancestor) console.log(ancestor.key)
      }
      return ancestor
    }
    /* Deletes the node with given key from tree. */
    delete(key) {
      function deleteNode(key, root) {
        let curr = root,
          prev = null

        while (curr !== null) {
          if (key === curr.key) break
          else if (key < curr.key) {
            prev = curr
            curr = curr.left
          } else {
            prev = curr
            curr = curr.right
          }
        }
        // key doesn't exist
        if (curr === null) return root

        // Deletion case 1: Node has NO children (leaf node)
        if (curr.left === null && curr.right === null) {
          if (prev === null) return null
          if (curr.key === prev.left.key) prev.left = null
          else prev.right = null
        }
        // Deletion case 2: Node has one child
        let child = null
        if (curr.left === null && curr.right !== null) child = curr.right
        if (curr.right === null && curr.left !== null) child = curr.left
        if (child !== null) {
          if (prev === null) return child
          if (curr.key === prev.left.key) prev.left = child
          else prev.right = child
        }
        // Deletion case 3: Node has two children.
        if (curr.left !== null && curr.right !== null) {
          let succ = curr.right
          prev = curr
          while (succ.left !== null) {
            prev = succ
            succ = succ.left
          }
          curr.key = succ.key
          if (succ === prev.left) prev.left = succ.right
          else prev.right = succ.right
        }
        return root
      }

      this.#root = deleteNode(key, this.root)
    }

    // tree traversals
    // returns array of keys
    printInOrder() {
      const res = DFSIterative.inOrder(this.#root)
      console.log(res)
      return res
    }

    printPreOrder() {
      const res = DFSIterative.preOrder(this.#root)
      console.log(res)
      return res
    }

    printPostOrder() {
      const res = DFSIterative.postOrder(this.#root)
      console.log(res)
      return res
    }

    printLevelOrder() {
      const res = BFS(this.#root)
      console.log(res)
      return res
    }
  }
  return BinarySearchTree
})()
module.exports = BinarySearchTree
