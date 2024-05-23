using Microsoft.EntityFrameworkCore;
using project.Model;
using project.Model;

namespace project.CardGameContext;

public class CardGameCtx : DbContext
{
    public CardGameCtx(DbContextOptions<CardGameCtx> options) : base(options)
    {
    }

    public DbSet<Result> Results { get; set; }
}