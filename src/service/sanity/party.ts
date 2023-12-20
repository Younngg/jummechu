import { PartyDetail } from '@/types/party';
import { client } from './sanity';

const simpleProjection = `
  name,
  "id":_id,
  "updatedAt":_updatedAt
`;

export const deleteFood = async (foodId: string, partyId: string) => {
  return client
    .patch(partyId)
    .unset([`foods[_ref=="${foodId}"]`])
    .commit()
    .then(() => {
      return client.delete(foodId);
    });
};

export const addFood = async (partyId: string, name: string) => {
  return client
    .create(
      {
        _type: 'food',
        name,
        voters: [],
      },
      { autoGenerateArrayKeys: true }
    )
    .then((result) => {
      return client
        .patch(partyId)
        .setIfMissing({ foods: [] })
        .append('foods', [
          {
            _ref: result._id,
            _type: 'reference',
          },
        ])
        .commit({ autoGenerateArrayKeys: true });
    });
};

export const cancleVoteForFood = async (foodId: string, userId: string) => {
  return client
    .patch(foodId)
    .unset([`voters[_ref == "${userId}"]`])
    .commit();
};

export const voteForFood = async (foodId: string, userId: string) => {
  return client
    .patch(foodId)
    .setIfMissing({ voters: [] })
    .append(`voters`, [{ _ref: userId, _type: 'reference' }])
    .commit({ autoGenerateArrayKeys: true });
};

export const updatePartyClosedState = async (
  partyId: string,
  isClosed: boolean
) => {
  return client.patch(partyId).set({ isClosed }).commit();
};

export const getPartiesOfUserId = async (userId: string) => {
  return client.fetch(
    `*[_type == "party" && "${userId}" in foods[] -> voters[]._ref || _type == "party" && createdBy->_id == "${userId}"]{
      ${simpleProjection},
      createdBy->{email, "id":_id},
      isClosed
    } | order(updatedAt desc)`
  );
};

export const getParty = async (partyId: string): Promise<PartyDetail> => {
  return client.fetch(`*[_type == "party" &&_id == "${partyId}"][0]{
    name,
    "id":_id,
    "updatedAt":_updatedAt,
    createdBy->{name, email, image, "id":_id},
    "foods":foods[]->{name,"id":_id, "voters":voters[]->{"id":_id,name,image,email}}
  }`);
};

export const createParty = async (name: string, userId: string) => {
  return client.create({
    _type: 'party',
    name,
    createdBy: { _ref: userId, _type: 'reference' },
    foods: [],
  });
};
