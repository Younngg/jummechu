import { client } from './sanity';

const simpleProjection = `
  name,
  "id":_id,
  "updatedAt":_updatedAt
`;

export const getPartiesOfUserId = async (userId: string) => {
  return client.fetch(
    `(*[_type == "party" && _id in *[_type == "voting" && foods[].voter[]._ref match "${userId}"].party -> _id]{
      ${simpleProjection}
    }
    + *[_type == "party" && createdBy->email == "djaak3283@gmail.com"]{
      ${simpleProjection}
    }) | order(_updatedAt desc)`
  );
};

export const getParty = async (partyId: string) => {
  return client.fetch(`*[_type == "party" && _id == "${partyId}"]{
    ${simpleProjection},
    createdBy->{name, email, image, "id":_id},
    "voting": *[_type == "voting" && party._ref match "${partyId}"]{
      ${simpleProjection},
      isClosed,
      "foods":foods[]{
        name,
        "key":_key,
        voter[]->{name, image, email}
      }
    }
  }`);
};

export const createParty = async (name: string, userId: string) => {
  return client.create({
    _type: 'party',
    name,
    createdBy: { _ref: userId, _type: 'reference' },
  });
};

// *[_type == "party" && _id == "7777f038-678a-4284-94cb-0213f2c9073c"]{
//   "voting": *[_type == "voting" && party._ref match "7777f038-678a-4284-94cb-0213f2c9073c"]
// }
