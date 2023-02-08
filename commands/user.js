import { PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
	.setName('user')
	.setDescription('Provides information about the user.')
	.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)

export async function execute(interaction) {
	interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
}
