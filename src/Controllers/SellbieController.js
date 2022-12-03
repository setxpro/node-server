const axios = require("axios");
const Book = require("../Models/Relatories");

module.exports.token = async (req, res) => {
  const { Token } = req.body;

  try {
    const { data } = await axios.post("https://bi.sellbie.com.br/api/auth", {
      Token,
    });

    if (data) {
      res.status(200).json({ data });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.sellbieSalesFlex = async (req, res) => {
  const { dataInicio, dataFim } = req.params;

  const acessToken = req.headers;

  try {
    const { data } = await axios.get(
      `https://bi.sellbie.com.br/api/flex?idEmpresa=${process.env.REACT_APP_NUM_BAGAGGIO}&dataInicio=${dataInicio}&dataFim=${dataFim}`,
      {
        headers: { Authorization: acessToken.authorization },
      }
    );

    if (data.resultado) {
      res.status(200).json(data.resultado);
      console.log(info);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.sellbieRelatorySales = async (req, res) => {
  const { dataInicio, dataFim } = req.params;

  const acessToken = req.headers;

  try {
    const { data } = await axios.get(
      `https://bi.sellbie.com.br/api/bi/comprasconversao?idEmpresa=${process.env.REACT_APP_NUM_BAGAGGIO}&dataInicio=${dataInicio}&dataFim=${dataFim}`,
      {
        headers: { Authorization: acessToken.authorization },
      }
    );
    if (data.resultado) {
      res.status(200).json(data.resultado);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.sendrelatories = async (req, res) => {
  const relatories = req.body.relatories;

  for (let i = 0; i < relatories.length; i++) {
    const items = relatories[i];

    const relatory = new Book({
      Loja_Compra: items.Loja_Compra || "",
      Tipo_de_Loja: items.Tipo_de_Loja || "",
      Vendedor_Compra: items.Vendedor_Compra || "",
      Data_Compra: items.Data_Compra || "",
      Valor_Compra: items.Valor_Compra || "",
      Nome_Cliente: items.Nome_Cliente || "",
      CPF_Cliente: items.CPF_Cliente || "",
      Telefone_Contato: items.Telefone_Contato || "",
      Vendedor_Contato: items.Vendedor_Contato || "",
      Vendedor_Contato_Matricula: items.Vendedor_Contato_Matricula || "",
      Loja_Vendedor_Contato: items.Loja_Vendedor_Contato || "",
      Data_Contato: items.Data_Contato || "",
      Nome_Acao: items.Nome_Acao || "",
      Nome_Campanha: items.Nome_Campanha || "",
    });

    try {
      await Book.create(relatory);
      res
        .status(200)
        .json({ status: true, message: "Sending data to server! 🚀" });
    } catch (error) {
      console.log(error);
    }
  }
};
