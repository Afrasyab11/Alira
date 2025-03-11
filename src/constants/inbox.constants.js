import INBOX_TRANSLATION from '../localization/inbox/InboxTranslation';
import { useSession } from '../sessionManager/SessionContext';

export const useCardConfig = () => {
  const { language } = useSession();

  return [
    {
      key: 'InternalCount',
      label: INBOX_TRANSLATION[language]?.internal,
      icon: 'fa-duotone fa-solid fa-inbox-full fa-xxl',
      itemType: 3,
    },
    {
      key: 'IncomingCount',
      label: INBOX_TRANSLATION[language]?.incoming,
      icon: 'fa-duotone fa-solid fa-inbox-in fa-xxl',
      itemType: 4,
    },
    {
      key: 'UnreadCount',
      label: INBOX_TRANSLATION[language]?.unread,
      icon: 'fa-duotone fa-solid fa-envelope fa-xxl',
      itemType: 1,
      isRed: true,
    },
    {
      key: 'Readcount',
      label: INBOX_TRANSLATION[language]?.read,
      icon: 'fa-duotone fa-solid fa-envelope-open-text fa-xxl',
      itemType: 2,
    },
    {
      key: 'OutgoingCount',
      label: INBOX_TRANSLATION[language]?.outgoing,
      icon: 'fa-duotone fa-solid fa-envelopes fa-xxl',
      itemType: 5,
    },
    {
      key: 'AllTransaction',
      label: INBOX_TRANSLATION[language]?.allCorrespondence,
      icon: 'fa-duotone fa-solid fa-books fa-xxl',
      itemType: 0,
    },
  ];
};
