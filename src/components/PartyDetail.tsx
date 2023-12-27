'use client';

import { useSession } from 'next-auth/react';
import Voting from './Voting';
import VotingForm from './VotingForm';
import useVote from '@/hooks/vote';
import useParties from '@/hooks/parties';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import ModalPortal from './ui/ModalPortal';
import Modal from './ui/Modal';
import DeleteModal from './DeleteModal';
import DefaultButton from './ui/DefaultButton';
import SearchMap from './Map/SearchMap';
import { Food } from '@/types/party';

type Props = {
  partyId: string;
};

const BUTTON_STYLE = 'px-2 py-1 rounded-md bg-gray-200';

const PartyDetail = ({ partyId }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  const { deleteParty, isSuccessDelete, updateParty } = useParties();
  const { party } = useVote(partyId);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (isSuccessDelete) redirect('/');
  }, [isSuccessDelete]);

  if (!party) {
    return <></>;
  }

  const checkPresident = () => {
    const { createdBy } = party;
    if (user) {
      if (user.id === createdBy.id) return true;
    }
    return false;
  };

  const onClickVotingCloses = () =>
    updateParty({ partyId, updated: { isClosed: true } });

  const onClickDeleteParty = () => deleteParty(party.id);

  const makeVisibleVotingForm = () => {
    if (!party.isClosed) {
      if (checkPresident() || (!checkPresident && party.canBeAdded))
        return <VotingForm partyId={partyId} />;
    }
  };

  const mostVotedFood = party.foods.reduce(
    (prev, cur) => {
      return cur.voters.length > prev.voters.length ? cur : prev;
    },
    { voters: [] } as unknown as Food
  );

  return (
    <section className='px-3 py-6'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>{party.name}</h2>
        {party.isAnonymous && (
          <p className='text-sm text-gray-600 mt-1'>익명 투표</p>
        )}
      </div>
      <div className='mt-8 flex flex-col gap-3'>
        <Voting
          party={party}
          canBeDeleted={checkPresident()}
          mostVotedFood={mostVotedFood}
        />
        {makeVisibleVotingForm()}
        <div className='flex justify-center gap-2'>
          {checkPresident() && !party.isClosed ? (
            <DefaultButton
              color='gray'
              onClick={onClickVotingCloses}
              text='투표 마감'
            />
          ) : undefined}
          {checkPresident() && (
            <>
              <Link className={BUTTON_STYLE} href={`/party/update/${partyId}`}>
                수정
              </Link>
              <DefaultButton
                color='gray'
                onClick={() => setOpenModal(true)}
                text='삭제'
              />
            </>
          )}
        </div>
      </div>
      {party.isClosed && <SearchMap foodName={mostVotedFood.name} />}
      {openModal && (
        <ModalPortal>
          <Modal onClose={() => setOpenModal(false)}>
            <DeleteModal
              onClose={() => setOpenModal(false)}
              onDelete={onClickDeleteParty}
            />
          </Modal>
        </ModalPortal>
      )}
    </section>
  );
};

export default PartyDetail;
