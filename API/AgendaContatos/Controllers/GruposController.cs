using AgendaContatos.Data;
using AgendaDeContatos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace AgendaDeContatos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class GruposController : ControllerBase
{
    private readonly AppDbContext _context;

    public GruposController(AppDbContext context)
    {
        _context = context;
    }
    //apenas teste
    [HttpGet]
    public async Task<IActionResult> GetGrupos()
    {
        var grupos = await _context.Grupos.ToListAsync();
        return Ok(grupos);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGrupoPorId(int id)
    {
        var grupo = await _context.Grupos.FindAsync(id);
        if (grupo == null)
            return NotFound("Grupo não encontrado.");

        return Ok(grupo);
    }

    [HttpPost]
    public async Task<IActionResult> CriarGrupo([FromBody] GruposModel grupo)
    {
        if (string.IsNullOrWhiteSpace(grupo.Nome))
            return BadRequest("Nome do grupo é obrigatório.");

        _context.Grupos.Add(grupo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetGrupoPorId), new { id = grupo.Id }, grupo);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> AtualizarGrupo(int id, [FromBody] GruposModel grupoAtualizado)
    {
        var grupo = await _context.Grupos.FindAsync(id);
        if (grupo == null)
            return NotFound("Grupo não encontrado.");

        grupo.Nome = grupoAtualizado.Nome;
        await _context.SaveChangesAsync();

        return Ok(grupo);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletarGrupo(int id)
    {
        var grupo = await _context.Grupos
            .Include(g => g.Contatos)
            .FirstOrDefaultAsync(g => g.Id == id);

        if (grupo == null)
            return NotFound("Grupo não encontrado.");

        if (grupo.Contatos.Any())
            return BadRequest("Não é possível excluir um grupo com contatos associados.");

        _context.Grupos.Remove(grupo);
        await _context.SaveChangesAsync();

        return Ok("Grupo excluído com sucesso.");
    }
}
