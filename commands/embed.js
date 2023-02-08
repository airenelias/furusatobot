import fetch from 'node-fetch';
import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('embed')
	.setDescription('Handle discord embedded messages.')
	.addSubcommand(subcommand => subcommand
		.setName('create')
		.setDescription('Create new message with embed from JSON')
		.addStringOption(option => option
			.setName('link')
			.setDescription('Link to embed JSON')
			.setRequired(true)))
	.addSubcommand(subcommand => subcommand
		.setName('edit')
		.setDescription('Replace message with embed from JSON')
		.addStringOption(option => option
			.setName('id')
			.setDescription('Message ID')
			.setRequired(true))
		.addStringOption(option => option
			.setName('link')
			.setDescription('Link to embed JSON')
			.setRequired(true)))
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export async function execute(interaction) {
	const content = await (await fetch(interaction.options.getString('link'))
		.catch(console.error)).json()
			.catch(console.error);
	
	interaction.deferReply({ ephemeral: true })
		.catch(console.error);

	const subcommand = interaction.options.getSubcommand();
	switch(subcommand) {
		case 'create': {
			interaction.channel.send(content)
				.catch(console.error);
		}
		case 'edit': {
			const message = await interaction.channel.messages.fetch(interaction.options.getString('id'))
				.catch(console.error);
			message.edit(content)
				.catch(console.error);
		}
	}

	interaction.deleteReply()
		.catch(console.error);
}
