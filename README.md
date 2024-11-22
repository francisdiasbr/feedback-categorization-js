# POC Comments Categorization (JavaScript)

## Descrição

Esta POC tem como objetivo categorizar comentários de clientes utilizando a OpenAI.

A categorização dos comentários é feita com base no comentário, a fim de atribuir uma categoria específica que melhor descreva o feedback.

As categorias consideradas são:

- **ATTENDANCE**
- **PAYMENT**
- **COMFORT**
- **WAITING_TIME**
- **PRODUCT**
- **PRODUCT_AVAILABILITY**
- **PRICE**
- **PRODUCT_QUALITY**
- **COMPLIMENT**
- **NONE**
- **INTERESTS**
- **FINANCIAL_PRODUCTS**


## Resumo geral

Este código cria uma API Express.js com uma rota POST no endpoint `/categorization`, responsável por categorizar comentários.

-> ETAPA 1: script que extrai dados específicos de um arquivo CSV e os converte para um formato JSON estruturado. - pular a etapa 1 caso os dados já estejam no formato JSON

-> ETAPA 2: script que categoriza os comentários usando o modelo GPT-4o.


## Estrutura do Projeto

```
📁 src
├── 📁 categorization
│   ├── 📜 app.js
│   ├── 📜 categorizationController.js
│   └── 📜 categorizationRoutes.js
└── 📁 extractor
    ├── 📜 extractor.js     # Script de extração dos dados
    ├── 📜 input.csv        # Arquivo CSV de entrada
    └── 📜 output.json      # Arquivo JSON de saída
📜 README.md
📜 package-lock.json
📜 package.json
```

### Pré-requisitos: 

- Obter uma api-key no site da OpenAI - https://platform.openai.com/api-keys


## Instalação

```bash
npm install
```

## Execução dos scripts

### Extração de dados

1. Coloque o arquivo CSV de entrada com o nome `input.csv` na raiz do projeto

2. Execute o script:

```bash
npm run dev:extractor
```

3. O arquivo `extracted.json` será gerado com os dados extraídos


Observação: O arquivo CSV de entrada deve conter as seguintes colunas (entre outras):

```
ID, COMENTARIO, CATEGORIA
```

### Saída (extracted.json)
O arquivo JSON de saída terá a seguinte estrutura:
```
[
  {
    "ID": "123",
    "COMENTARIO": "texto do comentário",
    "CATEGORIA": "categoria"
  }
]
```


### Categorização de dados

1. Coloque a api-key da OpenAI com o nome `OPENAI_API_KEY` no arquivo `.env`

2. Execute o script:

```
npm run dev:categorization
```

3. Acesse a rota:

Request (with cURL):
```
curl --location 'http://127.0.0.1:5001/categorization' \
--header 'api-key: sk-svcacct-tKKATWjonRsAKSMzstTsCCSAmMkUAW7lgj-lXKExkl3dxh-bxWGwdgpo1VwvYOGqBxarZw8E4arZBMT3BlbkFJL9QB3m87mmGjlEgeIwL7Be-eZ_rYikurwjJLlQk9rY52vvX3MY_MEsn5lUiC74YhzF37PoSzz61S4A' \
--header 'model: gpt-4o' \
--header 'Content-Type: application/json' \
--data '{
    "comments": [
        {
            "id": "13928743",
            "comment": "Podem melhorar na acessibilidade"
        },
        {
            "id": "13663934",
            "comment": "Aumentando o numero de parcelas sem turos"
        },
        {
            "id": "14008204",
            "comment": "Se melhorar estraga"
        },
        {
            "id": "13989703",
            "comment": "Apesar do valor ser menor alguns produtos não São de boa qualidade. E ainda falta algumas coisas mais basicas que precisamos pra casa."
        }
    ]
}'
```


Response:
```
{
    "data": [
        {
            "id": "13928743",
            "comment": "Podem melhorar na acessibilidade",
            "category": "COMFORT"
        },
        {
            "id": "13663934",
            "comment": "Aumentando o numero de parcelas sem turos",
            "category": "FINANCIAL_PRODUCTS"
        },
        {
            "id": "14008204",
            "comment": "Se melhorar estraga",
            "category": "COMPLIMENT"
        },
        {
            "id": "13989703",
            "comment": "Apesar do valor ser menor alguns produtos não São de boa qualidade. E ainda falta algumas coisas mais basicas que precisamos pra casa.",
            "category": "PRODUCT_QUALITY"
        }
    ]
}
```

## Descrição das categorias

- **ATTENDANCE**: Relacionado à qualidade do atendimento ao cliente, incluindo comportamento dos atendentes, cortesia e profissionalismo. Pode incluir situações de bom ou mau atendimento.

- **COMFORT**: Envolve o conforto físico e psicológico do cliente, como o ambiente da loja, a temperatura, a limpeza, o espaço e a sensação geral de bem-estar durante a visita e acessibilidade (ex: entradas para cadeirantes, facilidades para pessoas com mobilidade reduzida, entre outros).

- **COMPLIMENT**: Comentários positivos ou elogios sobre a empresa, atendimento, produto ou qualquer outro aspecto da experiência de compra.

- **FINANCIAL_PRODUCTS**: Refere-se a produtos financeiros oferecidos pela empresa, como empréstimos, financiamentos, seguros, ou cartões de crédito. Comentários podem envolver problemas, interesse ou questões sobre esses produtos.

- **INTERESTS**: Relacionado a produtos ou serviços que despertaram o interesse do cliente, mas não necessariamente uma compra imediata. Pode incluir sugestões de novos produtos ou áreas de interesse para futuras compras.

- **NONE**: Categoria genérica para quando não há uma categoria específica aplicável ao comentário, ou quando o cliente não especifica uma preocupação concreta.

- **PAYMENT**: Refere-se a problemas ou experiências relacionadas ao processo de pagamento, como dificuldades ao pagar, problemas com o sistema de pagamento, ou insatisfação com métodos de pagamento disponíveis.

- **PRICE**: Envolve a percepção do cliente sobre os preços, como se acham os preços justos, caros ou acessíveis, ou se há uma sensação de má relação custo-benefício.

- **PRODUCT**: Relacionado à qualidade ou características gerais dos produtos oferecidos, sem especificar se é um problema de qualidade, falta de estoque ou outro fator. Pode incluir qualquer tipo de comentário sobre o produto em si.

- **PRODUCT_AVAILABILITY**: Refere-se à disponibilidade dos produtos, ou seja, quando um produto desejado não está em estoque ou não pode ser adquirido.

- **PRODUCT_QUALITY**: Relacionado à qualidade dos produtos, como durabilidade, aparência e desempenho. Pode incluir problemas de defeito ou insatisfação com a qualidade percebida.

- **WAITING_TIME**: Refere-se ao tempo de espera do cliente, seja para ser atendido, para realizar o pagamento, ou qualquer outro tipo de fila. Clientes podem expressar insatisfação com longos tempos de espera.


