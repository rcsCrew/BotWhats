// comandos/help.js
module.exports = {
  helpCommand: (client) => {  // Recebe o client como argumento
      client.on('message', message => {
        const permitidoPrivados = ['5542999212991@c.us', '554298028876@c.us', '554299175672@c.us', '554299971835@c.us', '554299979838@c.us']; // IDs permitidos no formato correto
        const permitidoGrupos = ['120363246461248024@g.us']; // IDs permitidos de grupos
      
        if (message.isGroupMsg) {
            // Verifica se o ID do grupo está na lista permitida
            if (permitidoGrupos.includes(message.from)) {
                if (message.body.toLowerCase() === 'r!ola') {
                    client.sendMessage(message.from, 'Olá, grupo! Tudo bem com vocês?');
                } else {
                    client.sendMessage(message.from, 'Este grupo tem permissão para falar comigo. :)');
                }
            }
        } else {
            // Verifica se o ID da conversa privada está na lista permitida
            if (permitidoPrivados.includes(message.from)) {
                if (message.body.toLowerCase() === 'r!ola') {
                    client.sendMessage(message.from, 'Olá, tudo bem?');
                } else {
                    client.sendMessage(message.from, 'Você tem permissão para falar comigo. :)');
                }
            }
        }
      });

      return 'Este é o comando de ajuda!';
  }
};
