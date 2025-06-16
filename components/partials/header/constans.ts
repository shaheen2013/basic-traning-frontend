export const menus = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Upcoming Classes",
    href: "/course-info",
  }
];

export const courseMenus = [
  {
    id: 1,
    label: "My Course",
    href: "/my-course",
  },
  {
    id: 2,
    label: "Profile Overview",
    href: "/profile",
  },
  {
    id: 3,
    label: "Analytics",
    href: "/analytics",
  },
  {
    id: 4,
    label: "Messages",
    href: "/messages",
    items: [
      {
        id: 1,
        label: "Create Message",
        href: "/messages/create",
      },
    ],
  },
  {
    id: 5,
    label: "Settings",
    href: "/settings",
  },
];
