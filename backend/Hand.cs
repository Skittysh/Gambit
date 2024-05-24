namespace GambitLogic;

public class Hand
{
    public List<Card> Cards { get; private set; }
    
    public Hand()
    {
        Cards = new List<Card>();
    }
    
}