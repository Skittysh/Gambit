namespace project.Model;

public class Room
{
    public string Player1 { get; set; }
    public string Player2 { get; set; }
    public void Join(string username)
    {
        Player1 ??= username;
        Player2 ??= username;
    }
    public void Leave(string username)
    {
        if (Player1 == username)
        {
            Player1 = null;
        }
        if (Player2 == username)
        {
            Player2 = null;
        }
    }

    public int Capacity()
    {
        int capacity = 0;
        if (Player1 != null)
        {
            capacity++;
        }
        if (Player2 != null)
        {
            capacity++;
        }
        return capacity;
    }
}