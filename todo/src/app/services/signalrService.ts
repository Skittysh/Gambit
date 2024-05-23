import * as signalR from "@microsoft/signalr";

class SignalRService {
    private connection: signalR.HubConnection;

    constructor() {
        this.connection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5011/gameHub", {
                withCredentials: true
            })
            .build();

        this.connection.start().catch(err => console.error(err.toString()));
    }

    public onReceiveMove(callback: (user: string, move: string) => void): void {
        this.connection.on("ReceiveMove", callback);
    }

    public offReceiveMove(callback: (user: string, move: string) => void): void {
        this.connection.off("ReceiveMove", callback);
    }

    public sendMove(user: string, move: string): void {
        this.connection.invoke("SendMove", user, move).catch(err => console.error(err.toString()));
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
}

export const signalRService = new SignalRService();
