# salesforce-recaseify
Recover IDs that may have had their case changed (all upper or all lower).

The last three letters of a Salesforce ID are a compacted way of remembering the original case of the previous 15 characters. Each letter represents a "mask" that covers 5 of the 15 characters. The mask is simple: if there's a 1 in that spot, then uppercase, otherwise lowercase.

[This old page](https://astadiaemea.wordpress.com/2010/06/21/15-or-18-character-ids-in-salesforce-com-%E2%80%93-do-you-know-how-useful-unique-ids-are-to-your-development-effort/ ) has a really nice diagram, but keep in mind, it's showing you how to go from 15 to 18, which is the opposite of what I'm doing here. But, the chart with `A=00000` etc is very useful.

1. For each of the last 3 characters of the 18 digit ID:
  1. Calculate the distance from the letter A. For numbers, you can do 26 + theNumber. `A=0, B=1, C=2`, etc.
  2. Get a binary representation of that same number. Hopefully you already know this one. `A=00000, B=00001, C=00010`, etc.
  3. Reverse that binary. **I have no idea why this is done, I would love to know.**
2. Put those three masks together in the order you saw them.
3. Smash your big mask together with the first 15 characters of your ID using the following:
  1. If 1, uppercase, if 0, lowercase.

## Example

My input ID is `A1NG0000006HIZRMAI`.
```
M = 12 = 01100 =(reverse) 00110
A = 0 = 00000
I = 8 = 00100 

mask = 00110 00000 00100
  id = A1NG0 00000 6HIZR MA5
       a1NG0 00000 6hIzr MA5 => 
       
  15:   a1NG0000006hIzr
  18:   a1NG0000006hIzrMA5
```
