// Importa a função de ajuda do arquivo help.js
const { helpCommand } = require('./commands/help.js');

const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

// Usa o LocalAuth para gerenciar a sessão
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('Client is ready!');

    try {
        const chats = await client.getChats();
        const grupos = chats.filter(chat => chat.isGroup);

        console.log('IDs dos grupos:');
        grupos.forEach(grupo => {
            console.log(`Grupo: ${grupo.name} - ID: ${grupo.id._serialized}`);
        });

        // Chama o comando de ajuda passando o client
        helpCommand(client);

    } catch (error) {
        console.error('Erro ao capturar chats:', error);
    }
});

client.on('auth_failure', (msg) => {
    console.error('Falha na autenticação', msg);
});

client.on('disconnected', (reason) => {
    console.log('Cliente foi desconectado', reason);
});

// Inicializa o cliente
client.initialize();
