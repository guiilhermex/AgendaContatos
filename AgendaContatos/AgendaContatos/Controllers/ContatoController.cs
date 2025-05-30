using AgendaContatos.Data;
using AgendaDeContatos.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AgendaDeContatos.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContatoController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContatoController(AppDbContext context)
    {
        _context = context;
    }
    //apenas teste
    //[HttpGet]
    //public IActionResult GetTodos()
    //{
    //    try
    //    {
    //        var contatos = _context.Contatos
    //            .Include(c => c.Usuario)
    //            .Include(c => c.Grupo)
    //            .AsNoTracking()
    //            .ToList();

    //        return Ok(contatos);
    //    }
    //    catch (Exception ex)
    //    {
    //        return StatusCode(500, new { mensagem = "Erro interno", erro = ex.Message });
    //    }
    //}

    [HttpGet("{id}")]
    public IActionResult GetPorId(int id)
    {
        var contato = _context.Contatos
            .Include(c => c.Usuario)
            .Include(c => c.Grupo)
            .AsNoTracking()
            .FirstOrDefault(c => c.Id == id);

        if (contato == null)
            return NotFound("Contato não encontrado.");

        return Ok(contato);
    }

    [HttpPost]
    public IActionResult Criar(ContatosModel novoContato)
    {
        if (string.IsNullOrWhiteSpace(novoContato.Nome))
            return BadRequest("Nome é obrigatório.");

        _context.Contatos.Add(novoContato);
        _context.SaveChanges();

        return CreatedAtAction(nameof(GetPorId), new { id = novoContato.Id }, novoContato);
    }

    [HttpPut("{id}")]
    public IActionResult Atualizar(int id, ContatosModel contatoAtualizado)
    {
        var contato = _context.Contatos.FirstOrDefault(c => c.Id == id);

        if (contato == null)
            return NotFound("Contato não encontrado.");

        contato.Nome = contatoAtualizado.Nome;
        contato.Email = contatoAtualizado.Email;
        contato.Telefone = contatoAtualizado.Telefone;
        contato.UsuarioId = contatoAtualizado.UsuarioId;
        contato.GrupoId = contatoAtualizado.GrupoId;

        _context.SaveChanges();

        return Ok(contato);
    }

    [HttpDelete("remover/{id}")]
    public IActionResult Deletar(int id)
    {
        var contato = _context.Contatos.FirstOrDefault(c => c.Id == id);

        if (contato == null)
            return NotFound(new { mensagem = "Contato não encontrado." });

        _context.Contatos.Remove(contato);
        _context.SaveChanges();

        return Ok(new { mensagem = "Contato removido com sucesso." });
    }
}
