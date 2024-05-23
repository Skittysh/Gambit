using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using System.Threading.Tasks;

public class GameHub : Hub
{
    private static ConcurrentDictionary<string, int> playerScores = new ConcurrentDictionary<string, int>();

    public async Task SendMove(string user, string move)
    {
        playerScores.AddOrUpdate(user, 1, (key, oldValue) => oldValue + 1);
        var newScore = playerScores[user];
        await Clients.All.SendAsync("ReceiveMove", user, move);
        await Clients.Caller.SendAsync("ReceiveScore", user, newScore);
    }

    public async Task PickCard(string user, int points)
    {
        playerScores.AddOrUpdate(user, points, (key, oldValue) => oldValue + points);
        var newScore = playerScores[user];
        await Clients.Caller.SendAsync("ReceiveScore", user, newScore);
    }

    public override Task OnConnectedAsync()
    {
        playerScores.TryAdd(Context.ConnectionId, 0);
        return base.OnConnectedAsync();
    }

    public override Task OnDisconnectedAsync(Exception exception)
    {
        playerScores.TryRemove(Context.ConnectionId, out _);
        return base.OnDisconnectedAsync(exception);
    }
}