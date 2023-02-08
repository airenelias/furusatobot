import { readdirSync } from 'node:fs';

import { REST, Routes } from 'discord.js';
import { clientId, guildId, token } from './config.json';

const commands = [];
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Reloading ${commands.length} application (/) commands globally`);

		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Reloaded ${data.length} application (/) commands globally`);
	} catch (error) {
		console.error(error);
	}
})();