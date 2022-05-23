// Copyright 2022 Nang Khai.  All rights reserved.
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
    #rootNode = new TrieNode();

    // inserts a string into the Trie
    insert(string) {
        string = this.#validateStringInput(string);

        let curr = this.#rootNode;
        for (let i = 0;i < string.length;i++) {
            const alaphabetPos = string.charCodeAt(i) - 97;
            if (alaphabetPos > 25 || alaphabetPos < 0) throw new Error("Input string can only be made up of only letters from the alphabet");
            if (curr.neighbors[alaphabetPos] === undefined) curr.neighbors[alaphabetPos] = new TrieNode();
            if (!curr.neighbors[alaphabetPos].endNode) curr.neighbors[alaphabetPos].endNode = (i === string.length - 1);
            curr = curr.neighbors[alaphabetPos];
        }
    }

    // Attempts to find a string inside the Trie, 
    // returns a boolean
    contains(string) {
        string = this.#validateStringInput(string)

        let curr = this.#rootNode;
        for (let i = 0;i < string.length;i++) {
            const alaphabetPos = string.charCodeAt(i) - 97;
            if (alaphabetPos > 25 || alaphabetPos < 0) throw new Error("Input string can only be made up of only letters from the alphabet");
            if (curr.neighbors[alaphabetPos] === undefined) return false;
            if (i === string.length - 1 && curr.neighbors[alaphabetPos].endNode !== true) return false;
            curr = curr.neighbors[alaphabetPos];
        }
        return true;
    }

    // Search for words using prefixes with support for a limiting the result length
    // returns an array of strings
    search(prefix, limit = 10) {
        if (limit <= 0 || typeof(limit) != 'number') throw new Error("Limit should be a postive non-zero integer.");
        prefix = this.#validateStringInput(prefix);
        if (prefix.length < 3) throw new Error("Prefix should be of length 3 or more");
        const output = [];

        let curr = this.#rootNode;
        for (let i = 0;i < prefix.length;i++) {
            const alaphabetPos = prefix.charCodeAt(i) - 97;
            if (alaphabetPos > 25 || alaphabetPos < 0) throw new Error("Input string can only be made up of only letters from the alphabet");
            
            // Depth-first search through neighbors to find endNodes
            const dfs = (node, prefix) => {
                for (const neighborPos in node.neighbors) {
                    if (output.length >= limit) return;
                    if (node.neighbors[neighborPos] === undefined) continue;
                    if (node.neighbors[neighborPos].endNode === true) {
                        output.push(prefix + String.fromCharCode(parseInt(neighborPos) + 97));
                    }
                    dfs(node.neighbors[neighborPos], prefix + String.fromCharCode(parseInt(neighborPos) + 97), neighborPos)
                }
            }

            // End of prefix, search for matching words
            if (i === prefix.length - 1) {
                // checks if the prefix itself is a word
                if (curr.neighbors[alaphabetPos].endNode === true) {
                    output.push(prefix);
                }
                dfs(curr.neighbors[alaphabetPos], prefix);
            }

            if (curr.neighbors[alaphabetPos] == null) break;
            curr = curr.neighbors[alaphabetPos]
        }

        return output;
    }

    // Validates input as a string
    // Returns a trimed and lowercased string
    #validateStringInput(string) {
        if (typeof(string) !== 'string') throw new Error("Trie only takes string inputs.");
        return string.trim().toLowerCase();
    }
}