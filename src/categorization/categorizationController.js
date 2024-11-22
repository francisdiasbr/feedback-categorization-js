import OpenAI from 'openai';

// Inicializa a configuração da OpenAI com a chave da API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const commentCategorization = async (req, res) => {
  const { comments } = req.body;
  const model = req.headers['model'] || 'gpt-4';

  if (!comments || !Array.isArray(comments)) {
    return res.status(400).json({ error: 'Lista de comentários não fornecida corretamente' });
  }

  try {
    const results = await Promise.all(
      comments.map(async (commentObj) => {
        const prompt = `
          Categorize este comentário em uma das seguintes categorias, com base na descrição a seguir:

          1. **ATTENDANCE**: Comentários sobre o atendimento ao cliente, como comportamento dos atendentes, tempo de resposta, cortesia e qualidade do serviço.
            Exemplo: "O atendente foi extremamente educado e me ajudou a resolver minha dúvida rapidamente."

          2. **PAYMENT**: Comentários sobre o processo de pagamento, incluindo métodos de pagamento, problemas ou facilidades durante o pagamento.
            Exemplo: "Tive problemas para pagar com meu cartão, o sistema não estava funcionando."

          3. **COMFORT**: Comentários sobre o conforto físico ou psicológico no ambiente, como a limpeza, temperatura ou ambiente da loja e acessibilidade (ex: entradas para cadeirantes, facilidades para pessoas com mobilidade reduzida, entre outros).
            Exemplo: "A loja estava muito quente e desconfortável, não consegui ficar por muito tempo."

          4. **WAITING_TIME**: Comentários sobre o tempo de espera para ser atendido ou para realizar qualquer processo (como pagamento ou assistência).
            Exemplo: "Tive que esperar 30 minutos para ser atendido, o que foi frustrante."

          5. **PRODUCT_AVAILABILITY**: Comentários sobre a disponibilidade de produtos, como falta de estoque ou produtos fora de linha.
            Exemplo: "Queria comprar um item, mas estava fora de estoque."

          6. **PRICE**: Comentários sobre os preços, como sendo muito altos ou acessíveis, ou sobre a relação custo-benefício.
            Exemplo: "Achei os preços muito caros para a qualidade dos produtos."

          7. **PRODUCT_QUALITY**: Comentários sobre a qualidade do produto, como defeitos, durabilidade ou satisfação com a compra.
            Exemplo: "O produto que comprei quebrou em poucos dias, a qualidade é péssima.", "Apesar do valor ser menor alguns produtos não São de boa qualidade. E ainda falta algumas coisas mais basicas que precisamos pra casa."

          8. **COMPLIMENT**: Elogios gerais sobre a loja, os produtos ou o atendimento.
            Exemplo: "Amei a loja e o atendimento, com certeza voltarei!"

          9. **NONE**: Quando o comentário não se encaixa em nenhuma das categorias acima ou não especifica um problema claro.
            Exemplo: "Minha experiência foi boa, mas não tenho algo específico a comentar."

          10. **INTERESTS**: Comentários sobre interesse em produtos ou serviços, ou sugestões para novos produtos.
            Exemplo: "Eu adoraria ver mais opções de produtos ecológicos."

          11. **FINANCIAL_PRODUCTS**: Comentários sobre produtos financeiros, como seguros, cartões de crédito, empréstimos, entre outros.
            Exemplo: "Estou interessado em saber mais sobre os planos de financiamento disponíveis."

          Comentário: "${commentObj.comment}"

          Responda apenas com o nome da categoria correspondente, sem explicações adicionais.
          `;


        const response = await openai.chat.completions.create({
          model: model,
          messages: [{ role: "user", content: prompt }],
          max_tokens: 20,
          temperature: 0.3,
        });

        return {
          id: commentObj.id,
          comment: commentObj.comment,
          category: response.choices[0].message.content.trim()
        };
      })
    );

    res.status(200).json({ data: results });

  } catch (error) {
    console.error('Erro na categorização:', error.message);
    res.status(500).json({ error: error.message });
  }
};
