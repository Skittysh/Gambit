import * as signalR from "@microsoft/signalr";



class SignalRService {
    public connection: signalR.HubConnection;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5011/gameHub", {
                withCredentials: true
            })
            .build();

        this.connection.start().catch(err => console.error(err.toString()));
    }

    public JoinRoom(callback: (roomId: number, username: string) => void): void {
        this.connection.on("JoinRoom", callback);
    }

    public LeaveRoom(callback: (roomId: number, username: string) => void): void {
        this.connection.on("LeaveRoom", callback);
    }


    public onPlayerJoin(callback: (user: string) => void): void {
        this.connection.on("PlayerJoined", callback);
    }

    public offPlayerJoin(callback: (user: string) => void): void {
        this.connection.off("PlayerJoined", callback);
    }

    public onFull(callback: (message: string) => void): void {
        this.connection.off("GameFull", callback);
    }

    public joinPlayer(user: string): void {
        this.connection.invoke("JoinPlayer", user).catch(err => console.error(err.toString()));
    }

    public onDisplayCards(callback: (cards: any[]) => void): void {
        this.connection.on("DisplayCards", callback);
    }

    public offDisplayCards(callback: (cards: any[]) => void): void {
        this.connection.off("DisplayCards", callback);
    }

    public onDisplay2Cards(callback: (cards: any[]) => void): void {
        this.connection.on("DisplayCards2", callback);
    }

    public offDisplay2Cards(callback: (cards: any[]) => void): void {
        this.connection.off("DisplayCards2", callback);
    }

    public onReceiveAllScores(callback: (user: string, score: number) => void): void {
        this.connection.on("AllScores", callback);
    }

    public offReceiveAllScores(callback: (user: string, score: number) => void): void {
        this.connection.off("AllScores", callback);
    }

    public onReceiveScore(callback: (user: string, score: number) => void): void {
        this.connection.on("ReceiveScore", callback);
    }

    public offReceiveScore(callback: (user: string, score: number) => void): void {
        this.connection.off("ReceiveScore", callback);
    }

    public pickCard(user: string, points: number): void {
        this.connection.invoke("PickCard", user, points).catch(err => console.error(err.toString()));
    }
    public AddRoom(callback: (roomctr: number) => void): void {
        this.connection.invoke("AddRoom", callback)
    }

}

export const signalRService = new SignalRService();

