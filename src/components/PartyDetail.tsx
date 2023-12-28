'use client';

import { useSession } from 'next-auth/react';
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
import Spinner from './ui/Spinner';
import LoadingDots from './ui/LoadingDots';
type Props = {
  partyId: string;
};

const BUTTON_STYLE = 'px-2 py-1 rounded-md bg-gray-200';

const PartyDetail = ({ partyId }: Props) => {
  const { data: session } = useSession();
  const user = session?.user;
  const {
    mutate: deleteParty,
    isSuccess: isSuccessDelete,
    isPending: isPendingDelete,
  } = useDeleteParty();
  const { mutate: updateParty } = useUpdateParty();
  const { data: party } = useGetPartyDetail(partyId);
  const { mutate: addFood, isPending: isPendingAddFood } = useAddFood(partyId);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (isSuccessDelete) redirect('/');
  }, [isSuccessDelete]);

  if (!party) {
    return <></>;
  }

  if (!party) {
    notFound();
  }

  const checkPresident = () => {
    const { createdBy } = party;
    if (user) {
      if (user.id === createdBy.id) return true;
    }
    return false;
  };

  const handleSubmit = (e: FormEvent, name: string) => {
    e.preventDefault();
    addFood({ name });
  };

  const onClickVotingCloses = () =>
    updateParty({ partyId, updated: { isClosed: true } });

  const onClickDeleteParty = () => deleteParty(party.id);

  const makeVisibleVotingForm = () => {
    if (!party.isClosed) {
      if (checkPresident() || (!checkPresident && party.canBeAdded))
        return <VotingForm handleSubmit={handleSubmit} />;
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
        <div>
          <ShareBar />
        </div>
        {party.isAnonymous && (
          <p className='text-sm text-gray-600 mt-1'>익명 투표</p>
        )}
      </div>
      <div className='mt-8 flex flex-col gap-3'>
        <Voting
          party={party}
          canBeDeleted={checkPresident()}
          mostVotedFood={mostVotedFood}
          isPendingAddFood={isPendingAddFood}
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
            {isPendingDelete && (
              <div className='absolute inset-0 bg-black/50 flex items-center justify-center'>
                <LoadingDots />
              </div>
            )}
          </Modal>
        </ModalPortal>
      )}
    </section>
  );
};

export default PartyDetail;
