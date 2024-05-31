namespace GambitLogic;

public class Deck
{
    public List<Card> cards { get; private set; }

    public Deck()
    {
        cards = new List<Card>();
        CreateDeck();
        Shuffle();
    }

    private void CreateDeck()
    {
        foreach (Suitx suiter in Enum.GetValues(typeof(Suitx)))
        {
            foreach (Rank rank in Enum.GetValues(typeof(Rank)))
            {
                cards.Add(new Card(suiter, rank));
            }
        }
    }

    private void Shuffle()
    {
        Random rng = new Random();
        int n = cards.Count;
        while (n > 1)
        {
            n--;
            int k = rng.Next(n + 1);
             (cards[k], cards[n]) =  (cards[n], cards[k]);
        }
    }
    
    public Card Draw()
    {
            Card card = cards[0];
            cards.RemoveAt(0);
            return card;
    }
    
}