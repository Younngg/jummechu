export default {
  title: 'Party',
  name: 'party',
  type: 'document',
  fields: [
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'CreatedBy',
      name: 'createdBy',
      type: 'reference',
      to: [{type: 'user'}],
    },
    {
      title: 'Foods',
      name: 'foods',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'food'}]}],
    },
    {
      title: 'IsClosed',
      name: 'isClosed',
      type: 'boolean',
    },
    {
      title: 'CanBeAdded',
      name: 'canBeAdded',
      type: 'boolean',
    },
    {
      title: 'IsAnonymous',
      name: 'isAnonymous',
      type: 'boolean',
    },
  ],
  initialValue: {
    isClosed: false,
  },
}
