class Node {
    constructor(text,data) {
      this.data = {[text]:data};
      this.prev = null;
      this.next = null;
    }
  }
  
  class LruCache {
    constructor() {
      this.obj = {};
      this.maxLength = 5;
      this.length = 0;
      this.head = null;
      this.tail = null;
    }
  
    addData(text, data) {
      let newNode = new Node(text,data);
      this.obj[text] = newNode;
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        this.length++;
      } else {
        if (this.length >= this.maxLength) {
          let temp = this.head.next;
          let headData = Object.keys(this.head.data)[0]
          this.head.next = null;
          this.head = temp;
          this.head.prev = null;
          delete this.obj[headData]
          this.length--;
        }
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
        this.length++;
      }
    }
  
    retrieveData(text) {
      if (!this.obj[text]) {
        return null;
      } else {
        let selectedNode = this.obj[text];
        if (this.head === selectedNode) {
          let temp = this.head.next;
          this.head.next = null;
          temp.prev = null;
          this.tail.next = selectedNode;
          selectedNode.prev = this.tail;
          this.tail= selectedNode;
          this.head = temp;
        } else if (this.tail !== selectedNode&&this.length>=3) {
          selectedNode.prev.next = selectedNode.next;
          selectedNode.next.prev = selectedNode.prev;
          selectedNode.prev = null;
          selectedNode.next = null;
          this.tail.next = selectedNode;
          selectedNode.prev = this.tail;
          this.tail = selectedNode;
        }
        return Object.values(selectedNode.data)[0];
      }
    }
  }
  
  export default LruCache;
  