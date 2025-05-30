using System.Text.Json.Serialization;

namespace AgendaDeContatos.Models;

public class UsuariosModel
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string SenhaHash { get; set; } = string.Empty;
    [JsonIgnore] 
    public List<ContatosModel> Contatos { get; set; } = new();
}
