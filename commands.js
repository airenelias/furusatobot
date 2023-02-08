export const EMBED_COMMAND = {
  name: 'embed',
  description: 'Create pretty embed from JSON',
  type: 1,
  options : [
    {
      name: 'json',
      description: 'Link to JSON file with embed',
      type: 6,
      required: true,
    }
  ],
}
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
