import dotenv from 'dotenv';
import { readdirSync } from 'node:fs';
import { REST, Routes } from 'discord.js';

dotenv.config();

const commands = [];
const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = await import(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
	try {
		console.log(`Reloading ${commands.length} application (/) commands for guild ${process.env.GUILD_ID}`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(`Reloading ${data.length} application (/) commands for guild ${process.env.GUILD_ID}`);
	} catch (error) {
		console.error(error);
	}
})();
