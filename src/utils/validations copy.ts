export function validarLogin(email: string, senha: string) {
    if (!email || !senha){
        return "Preencha e-mail e senha para entrar!";
    }
    return null;
}

export function validarSenhaForte(senha: string ){
    const temMinimo = senha.length >= 8
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /\d/.test(senha);
    const temEspecial = /[^A-Za-z0-9]/.test(senha);
    return temMinimo && temMaiuscula && temMinuscula && temNumero && temEspecial;

}

export function validarCadastroUsuario( params:{
    nome: string;
    email: string;
    senha: string;
    confSenha: string;
}) {
    const { nome, email, senha, confSenha } = params;
    if (!nome || !email || !senha || !confSenha){
        return "Preencha todos os campos"
    }
    if (senha !== confSenha){
        return "As senhas não conferem!";
    }
    if (!validarSenhaForte(senha)){
        return "A senha deve ter no minimo 8 caracteres, com maiuscula, minuscula, mumero"
    }
    return null;

}

export function normalizaPreco(preco: string){
    return Number(preco.replace(",","."))
}

export function validarPreco(nome: string, preco:string){
    if (!nome || !preco){
        return "Por favor, preencha o nome e o preço!"
    }
    const precoNumerico = normalizaPreco(preco);
    if (Number.isNaN(precoNumerico) || precoNumerico <=0){
        return "Informe um preco valido"
    }
    return null;
    
}