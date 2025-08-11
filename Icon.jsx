// Icon component for NutriPlanner - Feather Icons style
export const Icon = ({ name, size = 24, className = "", ...props }) => {
  const iconProps = {
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: `inline-block ${className}`,
    ...props
  };

  const icons = {
    home: (
      <svg {...iconProps}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9,22 9,12 15,12 15,22"></polyline>
      </svg>
    ),
    calendar: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    book: (
      <svg {...iconProps}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>
    ),
    'shopping-cart': (
      <svg {...iconProps}>
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="m1 1 4 4 2 11h9l4-7H7"></path>
      </svg>
    ),
    settings: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="m12 1 1.68 2.32L16 4l.68 2.32L19 8l-.32 2.68L20 13l-2.32 1.68L16 16l-2.32.68L12 19l-1.68-2.32L8 16l-.68-2.32L5 12l.32-2.68L4 7l2.32-1.68L8 4l2.32-.68L12 1z"></path>
      </svg>
    ),
    calculator: (
      <svg {...iconProps}>
        <rect x="4" y="2" width="16" height="20" rx="2"></rect>
        <line x1="8" y1="6" x2="16" y2="6"></line>
        <line x1="8" y1="10" x2="8" y2="10"></line>
        <line x1="12" y1="10" x2="12" y2="10"></line>
        <line x1="16" y1="10" x2="16" y2="10"></line>
        <line x1="8" y1="14" x2="8" y2="14"></line>
        <line x1="12" y1="14" x2="12" y2="14"></line>
        <line x1="16" y1="14" x2="16" y2="14"></line>
        <line x1="8" y1="18" x2="16" y2="18"></line>
      </svg>
    ),
    user: (
      <svg {...iconProps}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    ),
    plus: (
      <svg {...iconProps}>
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ),
    edit: (
      <svg {...iconProps}>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    ),
    trash: (
      <svg {...iconProps}>
        <polyline points="3,6 5,6 21,6"></polyline>
        <path d="m19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    ),
    search: (
      <svg {...iconProps}>
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
    ),
    menu: (
      <svg {...iconProps}>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    ),
    x: (
      <svg {...iconProps}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ),
    check: (
      <svg {...iconProps}>
        <polyline points="20,6 9,17 4,12"></polyline>
      </svg>
    ),
    star: (
      <svg {...iconProps}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2"></polygon>
      </svg>
    ),
    clock: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12,6 12,12 16,14"></polyline>
      </svg>
    ),
    'chevron-down': (
      <svg {...iconProps}>
        <polyline points="6,9 12,15 18,9"></polyline>
      </svg>
    ),
    'chevron-up': (
      <svg {...iconProps}>
        <polyline points="18,15 12,9 6,15"></polyline>
      </svg>
    ),
    'chevron-left': (
      <svg {...iconProps}>
        <polyline points="15,18 9,12 15,6"></polyline>
      </svg>
    ),
    'chevron-right': (
      <svg {...iconProps}>
        <polyline points="9,18 15,12 9,6"></polyline>
      </svg>
    ),
    'bar-chart': (
      <svg {...iconProps}>
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
      </svg>
    ),
    'pie-chart': (
      <svg {...iconProps}>
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
        <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
      </svg>
    ),
    database: (
      <svg {...iconProps}>
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
    history: (
      <svg {...iconProps}>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
        <path d="M3 3v5h5"></path>
        <path d="M12 7v5l4 2"></path>
      </svg>
    ),
    'list-checks': (
      <svg {...iconProps}>
        <path d="m3 17 2 2 4-4"></path>
        <path d="m3 7 2 2 4-4"></path>
        <path d="M13 6h8"></path>
        <path d="M13 12h8"></path>
        <path d="M13 18h8"></path>
      </svg>
    ),
    brain: (
      <svg {...iconProps}>
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path>
        <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path>
        <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path>
        <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path>
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path>
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path>
        <path d="M19.938 10.5a4 4 0 0 1 .585.396"></path>
        <path d="M6 18a4 4 0 0 1-1.967-.516"></path>
        <path d="M19.967 17.484A4 4 0 0 1 18 18"></path>
      </svg>
    )
  };

  return icons[name] || null;
};

export default Icon;

