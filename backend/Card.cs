namespace GambitLogic;

public struct Card
{
    public Suit Suit { get; }
    public Rank Rank { get; }

    public int ID;
    
    public Card(Suit suit, Rank rank)
    {
        Suit = suit;
        Rank = rank;
        ID = (int)suit + (int)rank;
    }
    
}