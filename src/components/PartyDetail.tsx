'use client';

import { signIn, useSession } from 'next-auth/react';
import Voting from './Voting';
import VotingForm from './VotingForm';
import { FormEvent, useEffect, useState } from 'react';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import ModalPortal from './ui/ModalPortal';
import Modal from './ui/Modal';
import DeleteModal from './DeleteModal';
import DefaultButton from './ui/DefaultButton';
import SearchMap from './Map/SearchMap';
import { Food } from '@/types/party';
import ShareBar from './ShareBar';
import {
  useDeleteParty,
  useGetPartyDetail,
  useUpdateParty,
} from '@/hooks/party';
import { useAddFood } from '@/hooks/vote';
import LoadingDots from './ui/LoadingDots';
import PartyActionBar from './PartyActionBar';
type Props = {
  partyId: string;
};

const PartyDetail = ({ partyId }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  const [openModal, setOpenModal] = useState(false);
  const {
    mutate: deleteParty,
    isSuccess: isSuccessDelete,
    isPending: isPendingDelete,
  } = useDeleteParty();
  const { data: party } = useGetPartyDetail(partyId);
  const { mutate: addFood, isPending: isPendingAddFood } = useAddFood(partyId);

  useEffect(() => {
    if (isSuccessDelete) redirect('/');
  }, [isSuccessDelete]);

  if (!party) {
    return <></>;
  }

  if (!party) {
    notFound();
  }

  const handleSubmitFood = (e: FormEvent, name: string) => {
    e.preventDefault();
    addFood({ name });
  };

  const checkPresident = () => {
    const { createdBy } = party;
    if (user) {
      if (user.id === createdBy.id) return true;
    }
    return false;
  };

  const onClickDeleteParty = () => deleteParty(party.id);

  const mostVotedFood = party.foods.reduce(
    (prev, cur) => {
      return cur.voters.length > prev.voters.length ? cur : prev;
    },
    { voters: [] } as unknown as Food
  );

  return (
    <>
      <div className='text-center'>
        <h2 className='text-2xl font-bold'>{party.name}</h2>
        <div>
          <ShareBar />
        </div>
        {party.isAnonymous && (
          <p className='text-sm text-gray-600 mt-1'>익명 투표</p>
        )}
      </div>
      <div className='mt-8 flex flex-col gap-3 items-center'>
        <Voting
          party={party}
          canBeDeleted={checkPresident()}
          mostVotedFood={mostVotedFood}
          isPendingAddFood={isPendingAddFood}
        />
        <PartyActionBar
          party={party}
          isPresident={checkPresident()}
          handleSubmit={handleSubmitFood}
          openModal={() => setOpenModal(true)}
        />
        {!user && (
          <button onClick={() => signIn()} className='btn'>
            로그인 하고 투표하기
          </button>
        )}
      </div>
      {party.isClosed && <SearchMap foodName={mostVotedFood.name} />}
      {openModal && (
        <ModalPortal>
          <Modal onClose={() => setOpenModal(false)}>
            <DeleteModal
              onClose={() => setOpenModal(false)}
              onDelete={onClickDeleteParty}
            />
            {isPendingDelete && (
              <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                <LoadingDots />
              </div>
            )}
          </Modal>
        </ModalPortal>
      )}
    </>
  );
};

export default PartyDetail;
