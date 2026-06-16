import {
  validarLogin,
  validarSenhaForte,
  validarCadastroUsuario,
  normalizaPreco,
  validarPreco
  
} from "./validations";

describe("Validacoes", () => {
  it("Valida login com campos vazios", () => {
    expect(validarLogin("", "")).toBe(
      "Preencha e-mail e senha para entrar!"
    );
  });

  it("aceita login preenchido", () => {
    expect(
      validarLogin("umemail@email.com", "123456")).toBeNull();
  })
  /* it ("valida senha forte",() => {
  // expect(validarSenhaForte("abc")).toBe(false);
  // expect(validaerSenhaForte("Senha@123")).toBe(true); 
  })
*/
  it("valida senha forte", () => {
    expect(validarSenhaForte("abc")).toEqual({
      valida: false,
      requisitosFaltando:[
        "no minimo 8 caracteres",
        "1 letra maiuscula",
        "1 numero",
        "1 caracter especial"
      ],
      mensagem:"A senha precisa conter: no minimo 8 caracteres, 1 letra maiuscula, 1 numero, 1 caracter especial."
    })
  
  });

  it ("bloqueia cadastro com senhas diferentes", () => {
    expect(
        validarCadastroUsuario({
            nome:"gabriel",
            email:"ana@email.com",
            senha:"Senha@123",
            confSenha:"123@Senha"
        })
    ).toBe("As senhas não conferem!")
  })
  it ("normaliza preço com virgula", () =>{
      expect(normalizaPreco("5,50")).toBe(5.5);
  })

  it ("bloqueia produto sem preço valido", () =>{
    expect(validarPreco("Brigadeiro","abc")).toBe("Informe um preco valido")
  })

});