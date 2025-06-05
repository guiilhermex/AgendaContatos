document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  try {
    const resposta = await fetch("https://localhost:7110/api/Usuarios");

    if (!resposta.ok) {
      throw new Error("Erro ao buscar usuários");
    }

    const usuarios = await resposta.json();

    const usuario = usuarios.find(u => u.email === email && u.senhaHash === senha);

    if (usuario) {
      console.log("Login realizado com sucesso!");
      
      // Armazenar apenas o ID do usuário logado
      localStorage.setItem("usuarioId", usuario.id);

      window.location.href = "index.html";
    } else {
      alert("E-mail ou senha inválidos.");
    }

  } catch (erro) {
    console.error("Erro no login:", erro);
    alert("Erro ao conectar com o servidor.");
  }
});
