# Desafio-Frontend-BDH
Este repositório contém a implementação de um sistema de consulta de filmes utilizando Next.js, desenvolvido como parte de um desafio de estágio. A aplicação integra-se à API pública do OMDb (Open Movie Database) para permitir a busca e exibição de informações sobre filmes.

# Descrição da Aplicação
A aplicação consiste em um sistema simples de consulta de filmes, que oferece as seguintes funcionalidades:

# Requisitos Atendidos
1. Integração com a API OMDb
A aplicação está configurada para consumir a API OMDb utilizando uma chave de API específica.
A funcionalidade de busca de filmes é implementada com base no título fornecido pelo usuário.
2. Página de Busca de Filmes
A página principal da aplicação permite aos usuários inserir um título e buscar filmes relacionados.
Os resultados da busca são exibidos em uma lista, mostrando o título, ano de lançamento e poster de cada filme.
3. Página de Detalhes do Filme
Ao clicar em um filme nos resultados da busca, os usuários são redirecionados para uma página de detalhes, que exibe informações completas sobre o filme selecionado.

# Compilação para Produção
Para criar uma versão otimizada da aplicação, execute:

    npm run build
E para rodar a versão de produção:

    npm start