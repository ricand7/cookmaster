
# Cookmaster Project

# Contexto
Projeto cuja função é o cadastro de usuarios para realização de um crud 
de receitas 

## Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, MongoDB


## Instalando Dependências

> Backend
```bash
cd pastadoprojeto/ 
npm install
``` 
## Executando aplicação


* Para Criar o banco(É preciso ter um banco Mongodb rodando na maquina com a
  liberacao na porta 27017:
  Abra o PLayground no Vscode e digite:

  ```
  use Cookmaster
  
  db.users.insertOne({ name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' });
  
  ```

* Para rodar o back-end:

  ```
  cd pastadoprojeto/ && npm start
  ```

## Testando as requisições

> Requisição para Criar usuario , tipo Post http://localhost:3000/users/
      Exemplo de Json enviado no Body:
      
  ``` 
    {
	"name": "teste",
	"email": "teste26@email.com",
	"password": "teste"
    }
  ```
<br>
<br> 
   
> Requisição para login do usuario , tipo Post http://localhost:3000/login
     Exemplo de Json enviado no Body:
  ```  
    {
	"email": "teste25@email.com",
	"password": "teste"
    }
  ```
<br>
<br>
  
> Requisição para pegar lista de receitas, tipo Get http://localhost:3000/recipes
<br>
<br>


> Requisição para  criar receita, tipo Post http://localhost:3000/recipes
      Exemplo de Json enviado no Body:
  ```   
     {
        "name": "cocacola",
        "ingredients": "500 ml de Agua, 29 colheres de Açucar cheias, 2 folhas de coca,
        "preparation": "junta tudo no liquidificador"
      }
  ```
<br>
<br>
     
>  Requisição para pegar uma receita, tipo Get http://localhost:3000/recipes/iddareceita
      O token deve ser enviado no Header no campo Authorization(recebido no login)

<br>
<br>
      
> Requisição para login de admin, tipo Post http://localhost:3000/login
      Json que deve ser enviado no Body:
   ```      
    {
	"email": "root@email.com",
	"password": "admin"
    }
  ``` 
<br>
<br>
  
> Requisição para deletar receita, tipo Delete http://localhost:3000/recipes/iddareceita
      O token deve ser enviado no Header no campo Authorization(recebido no login)

<br>
<br>
      
> Requisição para atualizar receita, tipo Put http://localhost:3000/recipes/iddareceita
      O token deve ser enviado no Header no campo Authorization(recebido no login)
      Json que deve ser enviado no Body:
  ``` 
      
    {
	"name": "texto",
	"ingredients": "texto",
	"preparation": "texto"
    }
 ``` 

<br>
<br>
> Requisição para upload de imagem, tipo Put http://localhost:3000/recipes/iddareceita/image/
      No campo Multipart com a chave image é enviado qualquer imagem que estiver na maquina para a api. 
      
            
