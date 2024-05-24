namespace GambitLogic;

public class Game
{
    private Hand hand = new Hand();
    private Deck deck = new Deck();
    public int score = 0;
    
    public void Deal()
    {
        hand.Cards.Add(deck.Draw());
    }

    public void Play(int id)
    {
        score = score + (int)(hand.Cards.Find(card => card.ID == id).Rank);
        hand.Cards.Remove(hand.Cards.Find(card => card.ID == id));
    }

    public void Display()
    {
        foreach (Card card in hand.Cards)
        {
            Console.WriteLine($"{card.Rank} of {card.Suit} with id ({card.ID})");
        }
    }
}