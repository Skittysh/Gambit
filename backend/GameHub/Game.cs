using System.Collections.Concurrent;

namespace GambitLogic;

public class Game
{
    // public Hand hand = new Hand();
    // public Hand hand2 = new Hand();
    public Deck deck = new Deck();

    
    public ConcurrentDictionary<string, List<Card>> playerHand = new ConcurrentDictionary<string, List<Card>>();
    public int score = 0;

    public void Join(string username, List<Card> cards)
    {
        playerHand.TryAdd(username, cards);
    }

    public void Deal(string username)
    {
        if (deck.cards.Count > 0)
        {
           // hand.Cards.Add(deck.Draw());
            playerHand[username].Add(deck.Draw());
        }
    }

    public List<Card> Display(string username)
    {
        return playerHand[username];
    }
}