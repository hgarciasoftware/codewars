import java.util.ArrayList;
import java.util.HashSet;

class Song {
  private String artist;
  private HashSet<String> listeners;
  private String title;

  public Song(String title, String artist) {
    this.artist = artist;
    this.listeners = new HashSet<String>();
    this.title = title;
  }

  public String getArtist() {
    return this.artist;
  }

  public String getTitle() {
    return this.title;
  }

  public int howMany(ArrayList<String> list) {
    int previousSize = listeners.size();

    for (int i = 0; i < list.size(); i++) {
      listeners.add(list.get(i).toLowerCase());
    }

    return listeners.size() - previousSize;
  }
}
