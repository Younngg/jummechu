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
  ],
}
