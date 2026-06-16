export function validarLogin(email: string, senha: string) {
  if (!email || !senha) {
    return "Preencha e-mail e senha para entrar!";
  }
  return null;
}

type ResultadoSenhaForte = {
  valida: boolean;
  requisitosFaltando: string[];
  mensagem: string | null;
};

export function validarSenhaForte(
  senha: string
): ResultadoSenhaForte {
  const requisitosFaltando: string[] = [];

  const temMinimo = senha.length >= 8;
  const temMaiuscula = /[A-Z]/.test(senha);
  const temNumero = /\d/.test(senha);
  const temEspecial = /[^A-Za-z0-9]/.test(senha);

  if (!temMinimo) {
    requisitosFaltando.push("no minimo 8 caracteres");
  }

  if (!temMaiuscula) {
    requisitosFaltando.push("1 letra maiuscula");
  }

  if (!temNumero) {
    requisitosFaltando.push("1 numero");
  }

  if (!temEspecial) {
    requisitosFaltando.push("1 caracter especial");
  }

  const valida = requisitosFaltando.length === 0;

  return {
    valida,
    requisitosFaltando,
    mensagem: valida
      ? null
      : `A senha precisa conter: ${requisitosFaltando.join(", ")}.`,
  };
}

export function validarCadastroUsuario(params: {
  nome: string;
  email: string;
  senha: string;
  confSenha: string;
}) {
  const { nome, email, senha, confSenha } = params;

  if (!nome || !email || !senha || !confSenha) {
    return "Preencha todos os campos";
  }

  if (senha !== confSenha) {
    return "As senhas não conferem!";
  }

  const resultadoSenha = validarSenhaForte(senha);

  if (!resultadoSenha.valida) {
    return resultadoSenha.mensagem;
  }

  return null;
}

export function normalizaPreco(preco: string) {
  return Number(preco.replace(",", "."));
}

export function validarPreco(nome: string, preco: string) {
  if (!nome || !preco) {
    return "Por favor, preencha o nome e o preço!";
  }

  const precoNumerico = normalizaPreco(preco);

  if (Number.isNaN(precoNumerico) || precoNumerico <= 0) {
    return "Informe um preco valido";
  }

  return null;
}