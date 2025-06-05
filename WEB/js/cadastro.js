document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const response = await fetch("https://localhost:7110/api/Usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        senhaHash: senha,
      }),
    });

    if (response.status === 409) {
      alert("Já existe um usuário com este e-mail.");
      return;
    }

    if (!response.ok) {
      throw new Error("Erro ao cadastrar usuário.");
    }

    const novoUsuario = await response.json();
    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html"; // Redireciona para login
  } catch (error) {
    alert("Erro ao cadastrar: " + error.message);
  }
});
