import fetch from 'node-fetch';
import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('embed')
	.setDescription('Make a pretty embed from JSON file.')
	.addStringOption(option => option
		.setName("link")
		.setDescription("Link to JSON file with embed")
		.setRequired(true))
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export async function execute(interaction) {
	const content = await (await fetch(interaction.options.getString('link'))).json()
		.catch(console.error);
	
	interaction.deferReply({ ephemeral: true })
		.catch(console.error);

	interaction.channel.send(content)
		.catch(console.error);

	interaction.deleteReply()
		.catch(console.error);
}
