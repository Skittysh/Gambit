// See https://aka.ms/new-console-template for more information// using GambitLogic;

using GambitLogic;

class Program
{
    private static Game game = new Game();
    private static ConsoleInputs inputs = new ConsoleInputs();

    static void Main()
    {
        while (true)
        {
            inputs.GetUserInput();
            if (inputs.userInput == "1")
            {
                game.Deal();
                game.Display();
            }
            else if (inputs.userInput == "2")
            {
                inputs.GetCardInput();
                game.Play(int.Parse(inputs.userInput));
                Console.WriteLine($"Score: {game.score}");
            }
            
        }

    }
}
