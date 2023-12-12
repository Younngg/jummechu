export default {
  title: 'Voting',
  name: 'voting',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Party',
      name: 'party',
      type: 'reference',
      to: [{type: 'party'}],
    },
    {
      title: 'Foods',
      name: 'foods',
      type: 'array',
      of: [
        {
          title: 'Food',
          name: 'food',
          type: 'document',
          fields: [
            {
              title: 'Name',
              name: 'name',
              type: 'string',
            },
            {
              title: 'Voter',
              name: 'voter',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{type: 'user'}],
                },
              ],
              validation: (Rule) => Rule.unique(),
            },
          ],
        },
      ],
    },
    {
      title: 'IsClosed',
      name: 'isClosed',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'name',
      partyName: 'party.name',
    },
    prepare(selection) {
      const {title, partyName} = selection
      return {
        title,
        subtitle: `by ${partyName}`,
      }
    },
  },
}
