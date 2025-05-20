export type Permission = {
  label: string;
  desc: string;
};

export type PermissionLevel = 1 | 2 | 5 | 6 | 7;

export const permissionMap: Record<PermissionLevel, Permission> = {
  7: {
    label: 'Root',
    desc: 'Full system access across all companies and data. Reserved for core developers or system administrators.',
  },
  6: {
    label: 'Admin',
    desc: 'Full access to all companies and data. Can manage users, data, settings, and exports.',
  },
  5: {
    label: 'Manager',
    desc: 'Can view and manage company data (inventory, orders, reports).',
  },
  2: {
    label: 'Worker',
    desc: 'Can edit data (e.g., add/update orders or stock). Only within the assigned company.',
  },
  1: {
    label: 'Viewer',
    desc: 'Read-only access to all relevant dashboards and data, within the assigned company.',
  },
};

export const getPermission = (permissionLevel: PermissionLevel): Permission | null => {
  return permissionMap[permissionLevel] || null;
};
