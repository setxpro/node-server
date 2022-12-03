const mongoose = require("mongoose");
const BookSchema = mongoose.Schema(
  [
    {
      Loja_Compra: String,
      Tipo_de_Loja: String,
      Vendedor_Compra: String,
      Data_Compra: String,
      Valor_Compra: Number,
      Nome_Cliente: String,
      CPF_Cliente: String,
      Telefone_Contato: String,
      Vendedor_Contato: String,
      Vendedor_Contato_Matricula: String,
      Loja_Vendedor_Contato: String,
      Data_Contato: String,
      Nome_Acao: String,
      Nome_Campanha: String,
    },
  ],
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Book", BookSchema);
