using System.Text.Json.Serialization;

namespace AgendaDeContatos.Models;

public class GruposModel
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    [JsonIgnore] 
    public List<ContatosModel> Contatos { get; set; } = new();
}
