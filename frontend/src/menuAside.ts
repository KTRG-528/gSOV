import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces'

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ?? icon.mdiTable,
    permissions: 'READ_USERS'
  },
  {
    href: '/contracts/contracts-list',
    label: 'Contracts',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFileDocumentEdit' in icon ? icon['mdiFileDocumentEdit' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_CONTRACTS'
  },
  {
    href: '/dao_members/dao_members-list',
    label: 'Dao members',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiAccountGroup' in icon ? icon['mdiAccountGroup' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_DAO_MEMBERS'
  },
  {
    href: '/documents/documents-list',
    label: 'Documents',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiFileDocument' in icon ? icon['mdiFileDocument' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_DOCUMENTS'
  },
  {
    href: '/executors/executors-list',
    label: 'Executors',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiGavel' in icon ? icon['mdiGavel' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_EXECUTORS'
  },
  {
    href: '/guests/guests-list',
    label: 'Guests',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiEye' in icon ? icon['mdiEye' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_GUESTS'
  },
  {
    href: '/proposals/proposals-list',
    label: 'Proposals',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiLightbulbOutline' in icon ? icon['mdiLightbulbOutline' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_PROPOSALS'
  },
  {
    href: '/sovereign_members/sovereign_members-list',
    label: 'Sovereign members',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiAccount' in icon ? icon['mdiAccount' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_SOVEREIGN_MEMBERS'
  },
  {
    href: '/vendors/vendors-list',
    label: 'Vendors',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: 'mdiStore' in icon ? icon['mdiStore' as keyof typeof icon] : icon.mdiTable ?? icon.mdiTable,
    permissions: 'READ_VENDORS'
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

 {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS'
  },
]

export default menuAside
