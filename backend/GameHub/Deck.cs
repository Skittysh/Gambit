namespace GambitLogic;

public class Deck
{
    public List<Card> Cards { get; private set; }

    public Deck()
    {
        Cards = new List<Card>();
        CreateDeck();
        Shuffle();
    }

    private void CreateDeck()
    {
        foreach (Suitx suiter in Enum.GetValues(typeof(Suitx)))
        {
            foreach (Rank rank in Enum.GetValues(typeof(Rank)))
            {
                Cards.Add(new Card(suiter, rank));
            }
        }
    }

    private void Shuffle()
    {
        Random rng = new Random();
        int n = Cards.Count;
        while (n > 1)
        {
            n--;
            int k = rng.Next(n + 1);
            (Cards[k], Cards[n]) = (Cards[n], Cards[k]);
        }
    }
    
    public Card Draw()
    {
            Card card = Cards[0];
            Cards.RemoveAt(0);
            return card;
    }
    
}