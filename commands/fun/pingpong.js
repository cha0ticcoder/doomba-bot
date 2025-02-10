import {EmbedBuilder, MessageFlags, SlashCommandBuilder, userMention} from "discord.js";
import {setTimeout as wait} from "node:timers/promises";

export const command = {
    cooldown: 30,
    data: new SlashCommandBuilder()
        .setName('pingpong')
        .setDescription('Challenge another User to a game of PingPong')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('The User you want to play PingPong against.')
                .setRequired(true)
        ),


    async execute(interaction) {

        // Initializing Users and other variables

        const challengingUser = await interaction.user
        const targetUser = await interaction.options.getUser('target', true);
        let totalHits = 0;

        // Check if challengingUser and targetUser are the same

        if (challengingUser.id === targetUser.id) {
            await interaction.reply({ content: "You cant challenge yourself to a game of PingPong!", flags: MessageFlags.Ephemeral });
            return;
        }

        // Creating Game Banner

        const GameBanner = new EmbedBuilder()
            .setTitle(`PingPong - The Game is starting soon!`)
            .setDescription(userMention(challengingUser.id) + ' vs ' + userMention(targetUser.id))
            .addFields({ name: 'Total Hits:', value: totalHits.toString(), inline: true })

        interaction.reply({ embeds: [ GameBanner ] });

        await wait(1500)

        await GameBanner
            .setTitle(`PingPong - Game has started!`)


        interaction.editReply({ embeds: [ GameBanner ] });

        let opponents = [challengingUser, targetUser];

        // randomize beginning opponent

        for(let randomSwitches = Math.round(Math.random() * 5); randomSwitches > 0; randomSwitches--) {
            [opponents[0], opponents[1]] = [opponents[1], opponents[0]]
        }

        await wait(1000);

        await PingPongGameLogic()

        async function PingPongGameLogic() {
            if (totalHits === 0) {
                await GameBanner
                    .setTitle(`PingPong - ${opponents[0].globalName} hits the ball to ${opponents[1].globalName}.!`)

            } else if (totalHits >= 1) {
                await GameBanner
                    .setTitle(`PingPong - ${opponents[0].globalName} hits the ball back to ${opponents[1].globalName}!`)
            }

            interaction.editReply({ embeds: [ GameBanner ] });

            totalHits += 1;

            GameBanner
                .setFields(
                    {name: 'Total Hits:', value: totalHits.toString(), inline: true}
                )

            interaction.editReply({ embeds: [ GameBanner ] });

            await wait(1000)

            if (Math.random() < (1/6)) {
                await GameBanner
                    .setTitle(`PingPong - ${opponents[0].globalName} wins the Game!!`)

                interaction.editReply({ embeds: [ GameBanner ] });

                return opponents[0].id;

            } else {

                [opponents[0], opponents[1]] = [opponents[1], opponents[0]]

                await PingPongGameLogic();

            }
        }
    }
}
