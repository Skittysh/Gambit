namespace GambitLogic;

public struct Card
{
    public Suitx suit { get; }
    public Rank rank { get; }
    public int id {get;}
    
    public Card(Suitx suit_, Rank rank_)
    {
        
        suit = suit_;
        rank = rank_;
        id = (int)suit + (int)rank;
    }
}