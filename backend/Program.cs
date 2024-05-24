using Microsoft.EntityFrameworkCore;
using project.CardGameContext;

var builder = WebApplication.CreateBuilder(args);

var Configuration = builder.Configuration;
builder.Services.AddDbContext<CardGameCtx>(options =>
    options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});
builder.Services.AddSignalR();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.SuppressConsumesConstraintForFormFileParameters = true;
        options.SuppressInferBindingSourcesForParameters = true;
        options.SuppressModelStateInvalidFilter = true;
        options.SuppressMapClientErrors = true;
        options.ClientErrorMapping[StatusCodes.Status404NotFound].Link =
            "https://httpstatuses.com/404";
    });

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();
app.UseCors("AllowSpecificOrigin");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<GameHub>("/gameHub");
});
app.UseHttpsRedirection();
app.MapControllers();
app.Run();

// using GambitLogic;

// class Program
// {
//     private static Game game = new Game();
//     private static ConsoleInputs inputs = new ConsoleInputs();

//     static void Main()
//     {
//         while (true)
//         {
//             inputs.GetUserInput();
//             if (inputs.userInput == "1")
//             {
//                 game.Deal();
//                 game.Display();
//             }
//             else if (inputs.userInput == "2")
//             {
//                 inputs.GetCardInput();
//                 game.Play(int.Parse(inputs.userInput));
//                 Console.WriteLine($"Score: {game.score}");
//             }
            
//         }

//     }
// }