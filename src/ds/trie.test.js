// Copyright 2022 Nang Khai.  All rights reserved.
// Use of this source code is governed by a GNU General Public License v3.0
// license that can be found in the LICENSE file.

import { Trie, TrieNode } from "./trie";

describe("TrieNode Class", () => {
    describe("#constructor", () => {
        it('should convert the endNode argument to false if passed any nullable types', () => {
            const node = new TrieNode();
            const node2 = new TrieNode(null);
            const node3 = new TrieNode(undefined);
            const node4 = new TrieNode('');
            expect(node.endNode).toBeFalsy();
            expect(node2.endNode).toBeFalsy();
            expect(node3.endNode).toBeFalsy();
            expect(node4.endNode).toBeFalsy();
        });
    
        it('should construct an array property neighbors of length 26', () => {
            const node = new TrieNode();
            expect(node.neighbors.length).toBe(26);
        })
    })
});

describe("Trie Data Structure", () => {
    describe("#constructor", () => {
        it('should be constructed with a root node that is empty', () => {
            const trie = new Trie();
            expect(trie.rootNode).toStrictEqual(new TrieNode());
        });
    });
    describe("#insert", () => {
        it('should throw an error if given a non-string argument', () => {
            const trie = new Trie();
            expect(() => trie.insert(2)).toThrowError();
            expect(() => trie.insert(null)).toThrowError();
            expect(() => trie.insert({})).toThrowError();
            expect(() => trie.insert(2.3)).toThrowError();
        });

        it('should insert the string to the root TrieNode', () => {
            const trie = new Trie();
            trie.insert("test");
            trie.insert("tes");
            trie.insert("te");
            expect(trie.contains("test")).toBe(true);
            expect(trie.contains("tes")).toBe(true);
            expect(trie.contains("te")).toBe(true);
        });
    });

    describe("#contains", () => {
        it('should throw an error if given a non string argument', () => {
            const trie = new Trie();
            expect(() => trie.contains(2)).toThrowError();
            expect(() => trie.contains(null)).toThrowError();
            expect(() => trie.contains({})).toThrowError();
            expect(() => trie.contains(2.3)).toThrowError();
        });

        it('should return true if Trie contains the item', () => {
            const trie = new Trie();
            trie.insert("test");
            expect(trie.contains("test")).toBeTruthy();
            expect(trie.contains("tes")).toBeFalsy();
            expect(trie.contains("te")).toBeFalsy();
        });
    });

    describe("#search", () => {
        it('should throw an error if given a prefix that is not of type string', () => {
            const trie = new Trie();
            expect(() => trie.search(2)).toThrowError();
            expect(() => trie.search(null)).toThrowError();
            expect(() => trie.search({})).toThrowError();
            expect(() => trie.search(2.3)).toThrowError();
        });

        it('should throw an error if given a prefix with a length less than 3', () => {
            const trie = new Trie();
            expect(() => trie.search("a")).toThrow();
            expect(() => trie.search("ab")).toThrow();
            expect(() => trie.search("wo ")).toThrow();
            expect(() => trie.search("      ")).toThrow();
        });

        it('should return all relevant results', () => {
            const trie = new Trie();
            trie.insert("car");
            trie.insert("cat");
            trie.insert("program");
            trie.insert("career");
            trie.insert("cartoon");
            trie.insert("cart");
            trie.insert("tester");
            trie.insert("carol");
            trie.insert("carrier");

            expect(trie.search("car").sort()).toEqual([
                "car", 
                "career", 
                "cartoon", 
                "cart", 
                "carol", 
                "carrier",
            ].sort());
        });

        it('should limit the result length if passed in a limit argument', () => {
            const trie = new Trie();
            trie.insert("car");
            trie.insert("cat");
            trie.insert("program");
            trie.insert("career");
            trie.insert("cartoon");
            trie.insert("cart");
            trie.insert("tester");
            trie.insert("carol");
            trie.insert("carrier");

            expect(trie.search("car", 4).length).toBeLessThanOrEqual(4);
            expect(trie.search("car", 1).length).toBeLessThanOrEqual(1);
            expect(trie.search("car", 2).length).toBeLessThanOrEqual(2);
        });

        it("should throw an erorr if not passed a postive non-zero integer", () => {
            const trie = new Trie();
            expect(() => trie.search("test", -1)).toThrowError();
            expect(() => trie.search("test", null)).toThrowError();
            expect(() => trie.search("test", {})).toThrowError();
            expect(() => trie.search("test", 0)).toThrowError();
        });
    });
});