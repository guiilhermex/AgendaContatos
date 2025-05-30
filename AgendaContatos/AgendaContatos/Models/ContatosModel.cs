namespace AgendaDeContatos.Models;

public class ContatosModel
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Telefone { get; set; }

    public int UsuarioId { get; set; }
    public UsuariosModel? Usuario { get; set; }

    public int? GrupoId { get; set; }
    public GruposModel? Grupo { get; set; }
}
