// Copyright 2020 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

/**
 * TrieNode is an object that holds neighbors of a char-linked string
 */
export class TrieNode {
    constructor(isEndNode) {
        // endNode is true when the character is a endNode of a existing character
        this.endNode = !!isEndNode;
        // neighbors is a an array of the entire lowercased alphabet where the value is their corresponding TrieNode
        this.neighbors = new Array(26);
    }
}

/**
 * Trie is a data structure that stores strings in a tree-like data structure
 */
export class Trie {
    constructor() {
        this.rootNode = new TrieNode();
    }

    // inserts a string into the Trie
    insert(string) {
        throw new Error("Not Implemented");
    }

    // Attempts to find a string inside the Trie, 
    // returns a boolean
    contains(string) {
        throw new Error("Not Implemented");
    }

    // Search for words using prefixes with support for a limiting the result length
    search(prefix, limit = 10) {
        throw new Error("Not Implemented");
    }
}