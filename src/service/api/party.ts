import { SimpleParty } from '@/types/party';

export const partyApi = {
  getAllParties: async (): Promise<SimpleParty[]> => {
    return fetch('/api/party', {
      method: 'GET',
    }).then((res) => res.json());
  },
  createParty: async (name: string) => {
    return fetch('/api/party', {
      method: 'POST',
      body: JSON.stringify({ name }),
    }).then((res) => res.json());
  },
  getPartyDetail: async (partyId: string) => {
    return fetch(`/api/party/${partyId}`, {
      method: 'GET',
    }).then((res) => res.json());
  },
  updateVote: async (foodId: string, vote: boolean) => {
    return fetch('/api/vote', {
      method: 'PUT',
      body: JSON.stringify({ foodId, vote }),
    }).then((res) => res.json());
  },
};
