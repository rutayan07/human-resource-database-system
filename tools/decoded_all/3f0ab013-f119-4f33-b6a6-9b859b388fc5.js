// Minimal line icons — 18x18 viewBox, 1.6 stroke
const icon = (paths, opts = {}) => (props) => {
  const { size = 16, className = '', strokeWidth = 1.6, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {paths}
    </svg>
  );
};

const IconSearch = icon(<><circle cx="8" cy="8" r="5" /><path d="M15 15l-3-3" /></>);
const IconPlus = icon(<><path d="M9 3v12M3 9h12" /></>);
const IconUser = icon(<><circle cx="9" cy="6" r="3" /><path d="M3 15c0-3 2.7-5 6-5s6 2 6 5" /></>);
const IconUsers = icon(<><circle cx="7" cy="6" r="3" /><path d="M2 15c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5" /><path d="M12 3.5a3 3 0 0 1 0 5.5" /><path d="M16 14c0-2-1.5-3.5-3.5-4" /></>);
const IconBuilding = icon(<><rect x="3" y="3" width="12" height="12" rx="1" /><path d="M6 6.5h1M8.5 6.5h1M11 6.5h1M6 9.5h1M8.5 9.5h1M11 9.5h1M7.5 15v-2.5h3V15" /></>);
const IconLogout = icon(<><path d="M7 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h3" /><path d="M11 12l3-3-3-3" /><path d="M14 9H7" /></>);
const IconDashboard = icon(<><rect x="3" y="3" width="5.5" height="5.5" rx="0.5" /><rect x="9.5" y="3" width="5.5" height="5.5" rx="0.5" /><rect x="3" y="9.5" width="5.5" height="5.5" rx="0.5" /><rect x="9.5" y="9.5" width="5.5" height="5.5" rx="0.5" /></>);
const IconFilter = icon(<><path d="M2.5 4h13" /><path d="M5 9h8" /><path d="M7.5 14h3" /></>);
const IconSettings = icon(<><circle cx="9" cy="9" r="2.2" /><path d="M9 2v1.5M9 14.5V16M2 9h1.5M14.5 9H16M3.9 3.9l1 1M13.1 13.1l1 1M3.9 14.1l1-1M13.1 4.9l1-1" /></>);
const IconArrowRight = icon(<><path d="M3 9h12M11 5l4 4-4 4" /></>);
const IconArrowLeft = icon(<><path d="M15 9H3M7 5L3 9l4 4" /></>);
const IconX = icon(<><path d="M4 4l10 10M14 4L4 14" /></>);
const IconCheck = icon(<><path d="M3 9l4 4 8-8" /></>);
const IconEdit = icon(<><path d="M11.5 3.5l3 3L7 14H4v-3z" /></>);
const IconTrash = icon(<><path d="M3 5h12M7 5V3h4v2M5 5l1 10h6l1-10" /></>);
const IconMail = icon(<><rect x="2.5" y="4" width="13" height="10" rx="1" /><path d="M2.5 5l6.5 5 6.5-5" /></>);
const IconPhone = icon(<><path d="M3.5 4.5c0 6 4 10 10 10l1.5-2.5L12 10l-2 1c-1.5-1-2.5-2-3.5-3.5l1-2L4.5 3z" /></>);
const IconMapPin = icon(<><path d="M9 16s5-5 5-9A5 5 0 0 0 4 7c0 4 5 9 5 9z" /><circle cx="9" cy="7" r="1.8" /></>);
const IconCalendar = icon(<><rect x="3" y="4" width="12" height="11" rx="1" /><path d="M3 7h12M6 2.5v2M12 2.5v2" /></>);
const IconBriefcase = icon(<><rect x="3" y="5.5" width="12" height="8" rx="1" /><path d="M7 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5" /><path d="M3 9h12" /></>);
const IconChevronRight = icon(<><path d="M7 4l5 5-5 5" /></>);
const IconChevronDown = icon(<><path d="M4 7l5 5 5-5" /></>);
const IconEye = icon(<><path d="M1.5 9s2.8-5 7.5-5 7.5 5 7.5 5-2.8 5-7.5 5S1.5 9 1.5 9z" /><circle cx="9" cy="9" r="2" /></>);
const IconEyeOff = icon(<><path d="M3 3l12 12" /><path d="M7 4.5A7.6 7.6 0 0 1 9 4c4.7 0 7.5 5 7.5 5a13 13 0 0 1-2 2.5" /><path d="M11 13.5A7.6 7.6 0 0 1 9 14c-4.7 0-7.5-5-7.5-5a13 13 0 0 1 3-3.5" /><circle cx="9" cy="9" r="2" /></>);
const IconDownload = icon(<><path d="M9 3v9M5 8l4 4 4-4" /><path d="M3 15h12" /></>);
const IconDoor = icon(<><path d="M4 3v13h10V3z" /><circle cx="11" cy="9.5" r="0.6" fill="currentColor" /></>);
const IconLogo = (props) => {
  const { size = 24 } = props;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="1" y="1" width="22" height="22" rx="5" fill="#1A1A1A" />
      <path d="M7 9.5l5 -3 5 3v5l-5 3-5-3z" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M12 11.5v6" stroke="white" strokeWidth="1.4" />
      <path d="M7 9.5l5 2 5 -2" stroke="white" strokeWidth="1.4" />
    </svg>
  );
};

Object.assign(window, {
  IconSearch, IconPlus, IconUser, IconUsers, IconBuilding, IconLogout,
  IconDashboard, IconFilter, IconSettings, IconArrowRight, IconArrowLeft,
  IconX, IconCheck, IconEdit, IconTrash, IconMail, IconPhone, IconMapPin,
  IconCalendar, IconBriefcase, IconChevronRight, IconChevronDown, IconEye,
  IconEyeOff, IconDownload, IconDoor, IconLogo,
});
