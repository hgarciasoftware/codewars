# Shop Inventory Manager

https://www.codewars.com/kata/55d1d06def244b18c100007c

Hi and welcome to team Gilded Rose.

You are asked to fix the code for our store management system.

All items have a `sell_in` value which denotes the number of days we have left to sell the item and a `quality` value which denotes how valuable the item is. (For Java specifics see ** Java Notes ** below)

At the end of each day our software should lower both values for every item.

Pretty simple, right? Well this is just the general rule with some exception:

- once the sell_in days is less then zero, quality degrades twice as fast;

- the quality of an item can never be negative or increase beyond 50;

- the _"Aged Brie"_ goods actually increases in quality each passing day;

- _"Sulfuras"_ goods, being legendary items, never change their sell_in or quality values;

- _"backstage passes"_, like aged brie, increases in quality as it's sell_in value decreases;

- not just that: for _"backstage passes"_ quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but quality drops to 0 after the concert (sell_in 0 or lower).

Complicated enough, now? Well, there is a new item category that we would like to see added to the inventory management system:

- _"Conjured"_ items degrade in quality twice as fast as normal items.

You can change the update_quality method, add any new code, but you should NOT edit the item constructor/class: it belong to the goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code ownership.

Just for extra clarification, an item can never have its quality increase above 50, however "Sulfuras" is a legendary item and as such its quality is 80 and it never alters.

You won't find mixed categories (like a "Conjured Sulfuras Backstage pass of Doom"), but the category name may be not in the first position (ie: expect something like "SuperUberSword, Conjured" or "Mighty Sulfuras Armour of Ultimate Awesomeness").

** Java Notes **

- `sell_in` value can be accessed using `getSellIn()` and `setSellIn()` methods

- `quality` value can be accessed using `getQuality()` and `setQuality()` methods

--------------------------------------------------

Personal note: I was recently asked during an interview to solve a relatively simple, yet interesting problem, original taken from [here](https://github.com/emilybache/GildedRose-Refactoring-Kata).

As I was apparently scouted thanks to CodeWars, I think the bare minimum I could do to give back to the community was to turn this idea into a bug-fixes kata, with some small twists added to the original they showed me :)

#bugs #classes #basic-language-features #object-oriented-programming #fundamentals

### :slightly_smiling_face:
