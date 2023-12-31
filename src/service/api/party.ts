import { PartyDetail, SimpleParty, UpdatedParty } from '@/types/party';

export const partyApi = {
  getAllParties: async (): Promise<SimpleParty[]> => {
    return fetch('/api/party', {
      method: 'GET',
    }).then((res) => res.json());
  },
  createParty: async (
    name: string,
    isAnonymous: boolean,
    canBeAdded: boolean
  ) => {
    return fetch('/api/party', {
      method: 'POST',
      body: JSON.stringify({ name, isAnonymous, canBeAdded }),
    }).then((res) => res.json());
  },
  deleteParty: async (partyId: string) => {
    return fetch(`/api/party/${partyId}`, {
      method: 'DELETE',
    }).then((res) => res.json());
  },
  getPartyDetail: async (partyId: string): Promise<PartyDetail> => {
    return fetch(`/api/party/${partyId}`, {
      method: 'GET',
    }).then((res) => res.json());
  },
  updateParty: async (partyId: string, party: UpdatedParty) => {
    return fetch(`/api/party/${partyId}`, {
      method: 'PUT',
      body: JSON.stringify({ ...party }),
    }).then((res) => res.json());
  },
  addFood: async (partyId: string, name: string) => {
    return fetch(`/api/vote/${partyId}`, {
      method: 'POST',
      body: JSON.stringify({ name }),
    }).then((res) => res.json());
  },
  deleteFood: async (partyId: string, foodId: string) => {
    return fetch(`/api/vote/${partyId}`, {
      method: 'DELETE',
      body: JSON.stringify({ foodId }),
    }).then((res) => res.json());
  },
  updateVote: async (foodId: string, vote: boolean) => {
    return fetch('/api/vote', {
      method: 'PUT',
      body: JSON.stringify({ foodId, vote }),
    }).then((res) => res.json());
  },
};
