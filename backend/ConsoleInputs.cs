namespace GambitLogic;

public class ConsoleInputs
{
    public string userInput;
    public void GetUserInput()
    {
        Console.WriteLine("1 to draw card");
        Console.WriteLine("2 to play card");
        userInput = Console.ReadLine();
    }
    
    public void GetCardInput()
    {
        Console.WriteLine("Enter the id of the card you want to play");
        userInput = Console.ReadLine();
    }
}