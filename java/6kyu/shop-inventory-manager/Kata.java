public class ShopInventoryManager {
  private Item[] items;

  private static void degrade(Item item) {
    String name = item.getName().toLowerCase();
    int sellIn = item.getSellIn();
    int quality = item.getQuality();
    int decay = 1;

    if (quality >= 50 && (name.contains("aged brie") || name.contains("backstage passes"))) {
      // the quality of an item can never increase beyond 50
      decay = 0;
    } else if (name.contains("aged brie") || (name.contains("backstage passes") && sellIn > 10)) {
      // the "aged brie" goods actually increases in quality each passing day
      // "backstage passes", like aged brie, increases in quality as it's sell_in value decreases
      decay = -1;
    } else if (name.contains("backstage passes") && sellIn <= 10) {
      // for "backstage passes" quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less
      decay = sellIn > 5 ? -2 : -3;
    }

    if (sellIn < 0 && !name.contains("aged brie")) {
      // once the sell_in days is less then zero, quality degrades twice as fast
      decay *= 2;
    }

    if (name.contains("conjured")) {
      // "Conjured" items degrade in quality twice as fast as normal items
      decay *= 2;
    }

    if (name.contains("backstage passes") && sellIn <= 0) {
      // for "backstage passes" quality drops to 0 after the concert (sell_in 0 or lower)
      item.setQuality(0);
    } else if (!name.contains("sulfuras")) {
      if (quality - decay >= 50 && decay < 0) {
        // the quality of an item can never increase beyond 50
        item.setQuality(50);
      } else if (quality - decay <= 0) {
        // the quality of an item can never be negative
        item.setQuality(0);
      } else {
        item.setQuality(quality - decay);
      }
    }
  }

  public ShopInventoryManager(Item[] items) {
    this.items = items;
  }

  public void updateQuality() {
    for (int i = 0; i < items.length; i++) {
      Item item = items[i];
      String name = item.getName().toLowerCase();

      // "Sulfuras" goods, being legendary items, never change their sell_in or quality values
      if (!name.contains("sulfuras")) {
        // first, setSellIn to getSellIn() - 1
        item.setSellIn(item.getSellIn() - 1);
        // then, degrade item accordingly
        degrade(item);
      }
    }
  }
}
