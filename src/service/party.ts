import { PartyDetail } from '@/types/party';
import { client } from './sanity';

const simpleProjection = `
  name,
  "id":_id,
  "updatedAt":_updatedAt
`;

export const voteForFood = async (
  partyId: string,
  foodKey: string,
  userId: string
) => {
  return client
    .patch(partyId)
    .append(`foods[]._key match ${foodKey}`, [
      { _ref: userId, _type: 'reference' },
    ]);
};

export const getPartiesOfUserId = async (userId: string) => {
  return client.fetch(
    `(*[_type == "party" && "${userId}" in foods[] -> voters[]._ref]{
      ${simpleProjection}
    } + *[_type == "party" && createdBy->_id == "${userId}"]{
      ${simpleProjection}
    }) | order(updatedAt desc)`
  );
};

export const getParty = async (partyId: string): Promise<PartyDetail> => {
  return client.fetch(`*[_type == "party" &&_id == "${partyId}"][0]{
    name,
    "id":_id,
    "updatedAt":_updatedAt,
    createdBy->{name, email, image, "id":_id},
    "foods":foods[]->{name,"id":_id, "voters":voters[]->{name,image,email}}
  }`);
};

export const createParty = async (name: string, userId: string) => {
  return client.create({
    _type: 'party',
    name,
    createdBy: { _ref: userId, _type: 'reference' },
  });
};
