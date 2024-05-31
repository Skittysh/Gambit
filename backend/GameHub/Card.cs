namespace GambitLogic;

public struct Card
{
    public Suitx Suiterownik { get; }
    public Rank Rank { get; }
    public int ider {get;}
    
    public Card(Suitx suiter, Rank rank)
    {
        Suiterownik = suiter;
        Rank = rank;
        ider = (int)suiter + (int)rank;
    }
    
}