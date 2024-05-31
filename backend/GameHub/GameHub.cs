using GambitLogic;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;

public class GameHub : Hub
{
    private static ConcurrentDictionary<string, int> playerScores = new ConcurrentDictionary<string, int>();
    private static ConcurrentDictionary<string, string> players = new ConcurrentDictionary<string, string>();

    private static int currentPlayer = 0;

    static Game game;


    public async Task JoinPlayer(string user)
    {
        if (players.Count < 5)
        {
            playerScores.TryAdd(user, 0);
            game.Join(user, new List<Card>());
            players.AddOrUpdate(Context.ConnectionId, user, (key, oldValue) => user);
            game.Deal(user);
            game.Deal(user);
            game.Deal(user);
                        await Clients.Client(Context.ConnectionId).SendAsync("DisplayCards", game.playerHand[user]);

            await Clients.All.SendAsync("PlayerJoined", user);
        }
        else
        {
            await Clients.Caller.SendAsync("GameFull", "The game is full.");
        }
    }
    public async Task PickCard(string user, int points)
    {
            playerScores.AddOrUpdate(user, points, (key, oldValue) => oldValue + points);
            var newScore = playerScores[user];
            game.Deal(user);
            Console.WriteLine("TO NA GORZE CHCIALES");
            Console.WriteLine("Cards in deck: " + game.deck.cards.Count);
            game.Deal(user);
            await Clients.Client(Context.ConnectionId).SendAsync("DisplayCards", game.playerHand[user]);
            await Clients.Caller.SendAsync("ReceiveScore", user, newScore);
            await AllScores();
    }
    
    public async Task AllScores()
    {
        foreach (var playerScore in playerScores)
        {
            await Clients.All.SendAsync("AllScores", playerScore.Key, playerScore.Value);
        }
    }

    public override async Task OnConnectedAsync()
    {
        game = new Game();
        players.TryAdd(Context.ConnectionId, "username");
        // if (players.Count == 1)
        // {

        //     await Clients.Client(Context.ConnectionId).SendAsync("DisplayCards", game.hand.Cards);
        // }

        // else if (players.Count == 2)
        // {
         
        //     await Clients.Client(Context.ConnectionId).SendAsync("DisplayCards2", game.hand2.Cards);
        // }
        await base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        players.TryRemove(Context.ConnectionId, out _);
        return base.OnDisconnectedAsync(exception);
    }
}