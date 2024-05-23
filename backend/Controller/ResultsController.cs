using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project.CardGameContext;
using project.Model;

namespace project.Controller;

[Route("API/[controller]")]
[ApiController]
public class ResultsController : ControllerBase
{
    private readonly CardGameCtx _context;

    public ResultsController(CardGameCtx context)
    {
        _context = context;
    }

    [EnableCors("AllowSpecificOrigin")]
    [HttpGet]
    public async Task<List<Result>> GetResults()
    {
        return await _context.Results.ToListAsync();
    }

    [EnableCors("AllowSpecificOrigin")]
    [HttpGet("{id}")]
    public async Task<ActionResult<Result>> GetResult(int id)
    {
        var Result = await _context.Results.FindAsync(id);

        if (Result == null)
        {
            return NotFound();
        }

        return Result;
    }

    [EnableCors("AllowSpecificOrigin")]
    [HttpPost]
    public async Task<ActionResult<Result>> PostResult(Result result)
    {
        _context.Results.Add(result);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetResult", new { id = result.Id }, result);
    }

    [EnableCors("AllowSpecificOrigin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> PutResult(int id, Result result)
    {
        if (id != result.Id)
        {
            return BadRequest();
        }

        _context.Entry(result).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ResultExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [EnableCors("AllowSpecificOrigin")]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteResult(int id)
    {
        var Result = await _context.Results.FindAsync(id);

        if (Result == null)
        {
            return NotFound();
        }

        _context.Results.Remove(Result);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ResultExists(int id)
    {
        return _context.Results.Any(e => e.Id == id);
    }
}