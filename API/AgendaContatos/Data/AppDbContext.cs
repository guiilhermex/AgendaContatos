using AgendaDeContatos.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace AgendaContatos.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<UsuariosModel> Usuarios { get; set; }
        public DbSet<ContatosModel> Contatos { get; set; }
        public DbSet<GruposModel> Grupos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           
            modelBuilder.Entity<ContatosModel>()
                .HasOne(c => c.Usuario)
                .WithMany(u => u.Contatos)
                .HasForeignKey(c => c.UsuarioId)
                .OnDelete(DeleteBehavior.Cascade); 

          
            modelBuilder.Entity<ContatosModel>()
                .HasOne(c => c.Grupo)
                .WithMany(g => g.Contatos)
                .HasForeignKey(c => c.GrupoId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<UsuariosModel>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
