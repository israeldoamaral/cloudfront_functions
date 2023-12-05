# AWS CloudFront Functions
![Capa](/imagens/prints/capa.png)

Bem-vindo a este pequeno exemplo de uso do CloudFront Functions.

## AWS CloudFront 

É um serviço de rede de entrega de conteúdo (CDN) que acelera a distribuição de arquivos estático e dinâmico da web, como .html, .css, .js e arquivos de imagem, para os usuários. O CloudFront distribui o conteúdo por meio de uma rede global de datacenters denominados pontos de presença. Quando um usuário solicita um conteúdo que você está disponibilizando com o CloudFront, a solicitação é roteada para o ponto de presença que fornece a menor latência (atraso), assim o conteúdo é entregue com a melhor performance possível.

- Se o conteúdo já estiver no ponto de presença com a menor latência, o CloudFront o entregará imediatamente.

- Se o conteúdo não estiver nesse ponto de presença, o CloudFront o recuperará de uma origem definida, como um bucket do Amazon S3, um canal do MediaPackage ou um servidor HTTP (por exemplo, um servidor web no EC2), que você identificou como a fonte para a versão definitiva do conteúdo.

## AWS CloudFront Functions

É um recurso nativo do CloudFront que permite aos desenvolvedores executar código JavaScript leve na borda da rede da AWS, próxima aos usuários finais. Isso possibilita a personalização do comportamento do CloudFront em tempo real, sem precisar alterar o código de origem da aplicação.

Com CloudFront Functions, você pode:

- **Manipular requests e responses:** Modifique headers, cookies, query strings e o próprio conteúdo do request e response para atender a necessidades específicas.

- **Executar autenticação e autorização básicas:** Implemente lógica de autenticação simples para restringir o acesso ao conteúdo.

- **Gerar respostas HTTP na borda:** Crie respostas HTTP personalizadas sem precisar encaminhar a solicitação para o origin server.

- **Personalizar o comportamento do cache:** Defina regras de cache customizadas com base em condições dinâmicas.

- **Integrar com outros serviços da AWS:** Utilize serviços como IAM, S3, Lambda e outros diretamente dentro de suas CloudFront Functions.

## Principais benefícios:

- **Baixa latência:** O código é executado na borda da rede, próximo aos usuários finais, resultando em tempos de resposta mais rápidos.

- **Alta escalabilidade:** CloudFront Functions é projetado para lidar com milhões de requests por segundo.

- **Segurança:** O ambiente de execução é altamente seguro e isolado.

- **Facilidade de uso:** Você pode desenvolver e implantar CloudFront Functions usando o console da AWS, o CLI da AWS ou SDKs.


## Demonstração

No nosso teste iremos utilizar o Cloudfront Functions para reescrever a URL solicitada da origem para exibir algumas imagens que iram ficar em um Bucket S3 privado(Sem acesso externo).

**Mãos a obra:**

Vamos começar criando um Bukcket S3 para subir as imagens.

**OBS:** Se quiser usar as mesmas imagens basta clonar o repositório.

Na console da AWS procure por S3.

![Captura de Tela 1](/imagens/prints/1.png)

Clique em Create bucket

![Captura de Tela 2](/imagens/prints/2.png)

Escreva um nome para o Bucket e não altere mais nada. Vá para o final da página e clique no botão Create bucketcapt.

**OBS:** Lembrando que o nome do seu bucket tem que único em toda a AWS.

![Captura de Tela 3](/imagens/prints/3.png)
![Captura de Tela 4](/imagens/prints/4.png)

Com o bucket criado, vamos acessar clicando no nome do bucket e fazer o upload das imagens.

![Captura de Tela 5](/imagens/prints/5.png)

Dentro do Bucket clique no botão upload e carregue as imagens.

![Captura de Tela 6](/imagens/prints/6.png)


Vamos agora criar uma distrubuição do Cloudfront para nosso bucket.

Na console da AWS no campo de pesquisa procure por Cloudfront.

![Captura de Tela 7](/imagens/prints/7.png)

Clique no botão create distribution.

![Captura de Tela 8](/imagens/prints/8.png)

Na tela de Create distribution, no campo “Origin domain” escolha como origem o bucker S3 que criamos.

![Captura de Tela 9](/imagens/prints/9.png)
![Captura de Tela 9.1](/imagens/prints/9.1.png)


Em “Origin access”, escolha “Origin acess control settings(recommended)”.

![Captura de Tela 10](/imagens/prints/10.png)

Clique no botão “Create control setting”.

![Captura de Tela 11](/imagens/prints/11.png)

Na tela que aparece selecione os campos:

**Name:** com o nome do origin”

**marque Sig request (recommended)**

**Origin type:** S3

clique em **“Create”**

![Captura de Tela 12](/imagens/prints/12.png)


**OBS:** Após marcar a opção “Origin access control settings (recommended)” e criar o “control setting” aparece uma caixa informando que:


- **“Você deve atualizar a política de bucket do S3. O CloudFront fornecerá a declaração de política após a criação da	 		  distribuição.”**

Vá para o final da tela e clique em “Create distribution”

![Captura de Tela 13](/imagens/prints/13.png)



**OBS:** Após finalizar a criação da Distribuição, na tela seguinte vai mostrar uma caixa de aviso com um botão para copiar a função que irá liberar acesso ao Bucket S3 para o Cloudfunction.


![Captura de Tela 14](/imagens/prints/14.png)

Vamos agora clicar no botão “Copy pollicy” e logo em seguida no link fornecido na caixa de aviso “Go to S3 bucket permissions to update pollicy”.

O link nos leva-rá para as configurações do Bucket onde devemos editar e colar a pollicy.


Na tela do bucket vá em “bucket pollicy” e clique no botão “Edit”

![Captura de Tela 15](/imagens/prints/15.png)


Em policy, cole a policy fornecida e clique no botão “Save changes”.


![Captura de Tela 16](/imagens/prints/16.png)


Feito a liberação da policy volte para a tela do CloudFront.


**vamos criar a nossa Functions.**


No menu lateral clique em “Functions”

![Captura de Tela 17](/imagens/prints/17.png)


Clique em “Create function”

Dê um nome para a function e depois clique em “Create function”


![Captura de Tela 18](/imagens/prints/18.png)


Com a function criada vá em “function code”, apague o código existente e cole o código fornecido ou crie o seu próprio.

**OBS:** O código vocẽ encontra no repositório no arquivo script.js. [clique aqui](/script.js)

Clique em “Save change”



Após salvar, temos que fazer a publicação da function.

Clique no menu **“Publish”**

![Captura de Tela 19](/imagens/prints/19.png)

e depois no botão **“publish function”**

![Captura de Tela 20](/imagens/prints/20.png)


Após publicar, baixe a tela e vamos em **“Add association”**


![Captura de Tela 21](/imagens/prints/21.png)


Na tela de associate, preencha os campos com os valores:

**Distribution:** selecione o nome da distribuição do Cloudfront que criamos

**Evente type:** Viewer request

**cache behavior:** Default


![Captura de Tela 22](/imagens/prints/22.png)


clique no botão “Add association”


Finalizado a criação da function e a associação, volte para a tela do CloudFront e clique no nome da distribuição para poder pegar a URL para testar.


![Captura de Tela 23](/imagens/prints/23.png)
![Captura de Tela 24](/imagens/prints/24.png)


Copie a url da distribuição do Cloudfront e cole no navegador.

Aplique reload no navegador e veja as fotos sendo mostradas.


## Vídeo demostrativo

[![Demonstração do Projeto](/imagens/prints/capa.png)](https://youtu.be/DjbgaPwbEQk)

---

Espero que você tenha gostado dessa simples demostração de como utilizar o CloudFront Functions.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-MEU_LINKEDIN-blue.svg)](https://www.linkedin.com/in/israeldoamaral-aws-devops)


## Artigos anteriores
[Jenkins e Docker em uma instância EC2 da AWS com Terraform e Ansible](https://www.linkedin.com/pulse/jenkins-e-docker-em-uma-inst%C3%A2ncia-ec2-da-aws-com-terraform-amaral/)

[AWS VPC Peering](https://www.linkedin.com/pulse/aws-vpc-peering-israel-amaral/)

[Acesso privado ao RDS usando Bastion Host](https://www.linkedin.com/pulse/acesso-privado-ao-rds-usando-bastion-host-israel-amaral/)
