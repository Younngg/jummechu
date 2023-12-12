import { client } from './sanity';

export const getPartiesOfUserId = async (userId: string) => {
  return client.fetch(
    `(*[_type == "party" && _id in *[_type == "voting" && foods[].voter[]._ref match "${userId}"].party -> _id]{
      name, _id, _updatedAt
    }
    + *[_type == "party" && createdBy->email == "djaak3283@gmail.com"]{
      name, _id, _updatedAt
    }) | order(_updatedAt desc)`
  );
};

// export const getParty = async(partyId:string) => {

// };

export const createParty = async (name: string, userId: string) => {
  return client.create({
    _type: 'party',
    name,
    createdBy: { _ref: userId, _type: 'reference' },
  });
};

// `*[_type == "party" && createdBy->email == "${email}"]{
//   ...,
//   createdBy->{name, email, image, username, _id}
// }`

// (*[_type == "voting" && foods[].voter[] -> email match "djaak3283@gmail.com"].party -> {name, _id, _updatedAt}
// + *[_type == "party" && createdBy->email == "djaak3283@gmail.com"]{name, _id, _updatedAt}) | order(_updatedAt desc)
