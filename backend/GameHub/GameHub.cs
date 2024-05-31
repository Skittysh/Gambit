using GambitLogic;
using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using project.Model;

public class GameHub : Hub
{
    private static ConcurrentDictionary<string, int> playerScores = new ConcurrentDictionary<string, int>();
    private static ConcurrentDictionary<string, string> players = new ConcurrentDictionary<string, string>();
    private static int currentPlayer = 0;
    private static List<Room> RoomList = new List<Room>();

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
 
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        players.TryRemove(Context.ConnectionId, out _);
        return base.OnDisconnectedAsync(exception);
    }
    public async Task getPlayersCtrInRoom(int roomIndex)
    {
        await Clients.All.SendAsync("getPlayersCtrInRoom", RoomList[roomIndex].Capacity());
    }

    public async Task JoinRoom(int roomIndex, string username)
    {
        if ( RoomList[roomIndex].Capacity() < 2)
        {
            RoomList[roomIndex].Join(username);
            await Clients.All.SendAsync("JoinRoom", roomIndex, username);
        }
        else
        {
            await Clients.Caller.SendAsync("RoomFull", "The room is full.");
        }
    }
    
    public async Task LeaveRoom(int roomIndex, string username)
    {
        RoomList[roomIndex].Leave(username);
        await Clients.All.SendAsync("LeaveRoom", roomIndex, username);
    }
    
    public async Task AddRoom()
    {
        Console.WriteLine(RoomList.Count);
        RoomList.Add(new Room());
        await Clients.Client(Context.ConnectionId).SendAsync("AddRoom", RoomList.Count);
        await Clients.Caller.SendAsync("AddRoom", RoomList.Count);
        await Clients.All.SendAsync("AddRoom", RoomList.Count);
    }
}